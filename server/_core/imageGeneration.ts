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

export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  if (!ENV.replicateApiToken) {
    throw new Error("REPLICATE_API_TOKEN is not configured");
  }

  const client = new Replicate({
    auth: ENV.replicateApiToken,
  });

  try {
    // Call FLUX.1 SCHNELL model
    const output = await client.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: options.prompt,
          aspect_ratio: "4:5", // Portrait orientation for product photography
          num_outputs: 1,
          output_format: "png",
          output_quality: 90,
        },
      }
    );

    // Output is an array of URLs from Replicate
    if (!Array.isArray(output) || output.length === 0) {
      throw new Error("No image generated from Replicate");
    }

    const imageUrl = output[0] as string;

    // Download the image from Replicate URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image from Replicate: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // Save to S3
    const { url } = await storagePut(
      `generated/${Date.now()}.png`,
      buffer,
      "image/png"
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
