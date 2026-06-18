import { describe, it, expect, beforeAll } from "vitest";
import Replicate from "replicate";

describe("Replicate API Integration", () => {
  let replicate: Replicate;

  beforeAll(() => {
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
      throw new Error("REPLICATE_API_TOKEN is not set");
    }
    replicate = new Replicate({ auth: token });
  });

  it("should validate Replicate API token is valid", async () => {
    try {
      // Test API connection by fetching account info
      const response = await fetch("https://api.replicate.com/v1/account", {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty("username");
      console.log("✅ Replicate API token is valid");
      console.log(`Account: ${data.username}`);
    } catch (error) {
      throw new Error(`Failed to validate Replicate API token: ${error}`);
    }
  });

  it("should be able to list available models", async () => {
    try {
      const response = await fetch(
        "https://api.replicate.com/v1/models?query=flux",
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data.results)).toBe(true);
      console.log("✅ Can access Replicate models");
    } catch (error) {
      throw new Error(`Failed to list models: ${error}`);
    }
  });
});
