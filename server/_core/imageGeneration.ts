/**
 * Image generation helper using Replicate + FLUX.1 SCHNELL
 *
 * Example usage:
 *   const { url: imageUrl } = await generateImage({
 *     prompt: "A serene landscape with mountains"
 *   });
 */
import Replicate from "replicate";
import { storagePut } from "server/storage";
import { ENV } from "./env";

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
};

const REPLICATE_TIMEOUT_MS = 120_000;
const DOWNLOAD_TIMEOUT_MS = 30_000;
const STORAGE_TIMEOUT_MS = 60_000;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, operation: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${operation} timed out after ${Math.round(timeoutMs / 1000)} seconds`));
    }, timeoutMs);

    promise.then(
      value => {
        clearTimeout(timer);
        resolve(value);
      },
      error => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

type ImageSource = { url?: string; blob?: Blob };

async function getImageSource(output: unknown): Promise<ImageSource | undefined> {
  const firstOutput = Array.isArray(output) ? output[0] : output;

  if (typeof firstOutput === "string") return { url: firstOutput };
  if (firstOutput instanceof URL) return { url: firstOutput.toString() };
  if (typeof Blob !== "undefined" && firstOutput instanceof Blob) {
    return { blob: firstOutput };
  }

  if (firstOutput && typeof firstOutput === "object") {
    const candidate = firstOutput as {
      url?: string | URL | (() => string | URL);
      blob?: () => Promise<Blob>;
      output?: unknown;
      data?: unknown;
    };

    if (typeof candidate.url === "function") {
      const resolvedUrl = candidate.url();
      return { url: resolvedUrl instanceof URL ? resolvedUrl.toString() : resolvedUrl };
    }
    if (candidate.url instanceof URL) return { url: candidate.url.toString() };
    if (typeof candidate.url === "string") return { url: candidate.url };
    if (typeof candidate.blob === "function") return { blob: await candidate.blob() };

    const nestedOutput = await getImageSource(candidate.output ?? candidate.data);
    if (nestedOutput) return nestedOutput;

    const stringValue = String(firstOutput);
    if (stringValue.startsWith("https:") || stringValue.startsWith("data:")) {
      return { url: stringValue };
    }
  }

  return undefined;
}

export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  if (!ENV.replicateApiToken) {
    throw new Error("BURNITA_API is not configured");
  }

  const client = new Replicate({
    auth: ENV.replicateApiToken,
  });

  try {
    // Resolve the current model version first. The model alias can occasionally
    // return a null output through run(), while the explicit prediction API is stable.
    const model = await withTimeout(
      client.models.get("black-forest-labs", "flux-schnell"),
      30_000,
      "Replicate model lookup",
    );
    const version = (model as { latest_version?: { id?: string } }).latest_version?.id;
    if (!version) throw new Error("Replicate model has no active version");

    const prediction = await withTimeout(
      client.predictions.create({
        version,
        input: {
          prompt: options.prompt,
          aspect_ratio: "4:5", // Portrait orientation for product photography
          num_outputs: 1,
          output_format: "png",
          output_quality: 90,
        },
      }),
      30_000,
      "Replicate prediction creation",
    );

    const completedPrediction = await withTimeout(
      client.wait(prediction),
      REPLICATE_TIMEOUT_MS,
      "Replicate image generation",
    );

    const imageSource = await getImageSource(completedPrediction.output);
    if (!imageSource) throw new Error("Replicate returned no usable image output");

    let buffer: Buffer;
    if (imageSource.blob) {
      buffer = Buffer.from(await imageSource.blob.arrayBuffer());
    } else if (imageSource.url) {
      const downloadController = new AbortController();
      const downloadResponse = fetch(imageSource.url, { signal: downloadController.signal });
      const response = await withTimeout(downloadResponse, DOWNLOAD_TIMEOUT_MS, "Image download").catch(error => {
        downloadController.abort();
        throw error;
      });
      if (!response.ok) {
        throw new Error(`Failed to download image from Replicate: ${response.statusText}`);
      }
      buffer = Buffer.from(await response.arrayBuffer());
    } else {
      throw new Error("Replicate returned no downloadable image");
    }

    // Save to S3
    const { url } = await withTimeout(
      storagePut(`generated/${Date.now()}.png`, buffer, "image/png"),
      STORAGE_TIMEOUT_MS,
      "Image storage upload",
    );

    return {
      url,
    };
  } catch (error) {
    console.error("[Replicate Image Generation Error]", error);
    throw new Error(
      `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
