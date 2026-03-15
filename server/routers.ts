import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { generateImage } from "./_core/imageGeneration";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  candles: router({
    generateImage: publicProcedure
      .input(
        z.object({
          type: z.enum(["Cóctel", "Postre", "Elegante", "Corporativa"]),
          aroma: z.enum(["Frutal", "Dulce", "Cítrico", "Especiado"]),
          color: z.enum(["Rosado", "Amarillo", "Rojo", "Blanco"]),
          decoration: z.enum(["Frutas", "Crema", "Especias", "Minimalista"]),
        })
      )
      .mutation(async ({ input }) => {
        const prompt = `Create a hyper-realistic artisanal handmade candle with the following characteristics:
- Type: ${input.type} candle
- Aroma: ${input.aroma} scent
- Color: ${input.color}
- Decoration: ${input.decoration} style

The candle should look premium, handcrafted, and visually stunning. Professional product photography style with beautiful lighting.`;

        try {
          const result = await generateImage({ prompt });
          return {
            success: true,
            imageUrl: result.url,
            prompt,
          };
        } catch (error) {
          console.error("[Image Generation Error]", error);
          throw new Error("Failed to generate candle image. Please try again.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
