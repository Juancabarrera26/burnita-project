import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "@shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { generateImage } from "./_core/imageGeneration";
import { createCustomRequest } from "./db";
import { createOrder, updateOrderStatus, Order } from "./_core/supabase";
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

  requests: router({
    createCustomRequest: publicProcedure
      .input(
        z.object({
          requestType: z.enum(["recordatorios", "empresarial"]),
          clientName: z.string().min(1, "El nombre es requerido"),
          clientEmail: z.string().email("Email inválido"),
          clientPhone: z.string().min(1, "El teléfono es requerido"),
          clientCompany: z.string().optional(),
          clientLocation: z.string().min(1, "La ubicación es requerida"),
          generalDescription: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
          candleType: z.string().min(1, "El tipo de vela es requerido"),
          quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
          message: z.string().optional(),
          colors: z.string().optional(),
          style: z.string().optional(),
          references: z.string().optional(),
          event: z.string().optional(),
          deliveryDate: z.string().optional(),
          budget: z.string().optional(),
          urgency: z.enum(["normal", "urgente"]).default("normal"),
          additionalComments: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await createCustomRequest({
            requestType: input.requestType,
            clientName: input.clientName,
            clientEmail: input.clientEmail,
            clientPhone: input.clientPhone,
            clientCompany: input.clientCompany || null,
            clientLocation: input.clientLocation,
            generalDescription: input.generalDescription,
            candleType: input.candleType,
            quantity: input.quantity,
            message: input.message || null,
            colors: input.colors || null,
            style: input.style || null,
            references: input.references || null,
            event: input.event || null,
            deliveryDate: input.deliveryDate || null,
            budget: input.budget || null,
            urgency: input.urgency,
            additionalComments: input.additionalComments || null,
            status: "pendiente",
          });
          return {
            success: true,
            message: "Tu solicitud fue enviada correctamente. Nos pondremos en contacto pronto.",
          };
        } catch (error) {
          console.error("[Custom Request Error]", error);
          throw new Error("No pudimos procesar tu solicitud. Por favor intenta de nuevo.");
        }
      }),
  }),

  orders: router({
    crearOrden: publicProcedure
      .input(
        z.object({
          nombre: z.string().min(1, "Nombre requerido"),
          apellido: z.string().min(1, "Apellido requerido"),
          email: z.string().email("Email inválido"),
          telefono: z.string().min(1, "Teléfono requerido"),
          direccion: z.string().min(1, "Dirección requerida"),
          ciudad: z.string().min(1, "Ciudad requerida"),
          departamento: z.string().min(1, "Departamento requerido"),
          productos: z.array(
            z.object({
              id: z.string(),
              nombre: z.string(),
              precio: z.number().positive(),
              cantidad: z.number().positive(),
              imagen: z.string().optional(),
            })
          ).min(1, "Al menos un producto es requerido"),
          subtotal: z.number().positive(),
          envio: z.number().nonnegative(),
          total: z.number().positive(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Validate all required fields
          if (!input.nombre?.trim()) throw new Error("Nombre es requerido");
          if (!input.apellido?.trim()) throw new Error("Apellido es requerido");
          if (!input.email?.trim()) throw new Error("Email es requerido");
          if (!input.telefono?.trim()) throw new Error("Teléfono es requerido");
          if (!input.direccion?.trim()) throw new Error("Dirección es requerida");
          if (!input.ciudad?.trim()) throw new Error("Ciudad es requerida");
          if (!input.departamento?.trim()) throw new Error("Departamento es requerido");
          if (!input.productos || input.productos.length === 0) throw new Error("Carrito vacío");
          if (input.envio < 0) throw new Error("Envío inválido");

          const orderData = {
            nombre: input.nombre.trim(),
            apellido: input.apellido.trim(),
            email: input.email.trim(),
            telefono: input.telefono.trim(),
            direccion: input.direccion.trim(),
            ciudad: input.ciudad.trim(),
            departamento: input.departamento.trim(),
            productos: input.productos,
            subtotal: input.subtotal,
            envio: input.envio,
            total: input.total,
            estado: "pendiente" as const,
          };

          const order = await createOrder(orderData);

          return {
            success: true,
            referencia: order.referencia,
            total: order.total,
            message: "Orden creada exitosamente",
          };
        } catch (error) {
          console.error("[Order Creation Error]", error);
          throw new Error(
            error instanceof Error ? error.message : "Error al crear la orden"
          );
        }
      }),
  }),

  candles: router({
    generateImage: publicProcedure
      .input(
        z.object({
          type: z.enum(["Cóctel", "Postre", "Elegante", "Corporativa"]),
          aroma: z.enum(["Frutal", "Dulce", "Cítrico", "Especiado"]),
          color: z.enum(["Rojo", "Azul", "Amarillo", "Verde", "Naranja", "Morado", "Rosado", "Negro", "Blanco", "Cafe", "Beige", "Dorado", "Plateado"]),
          decoration: z.enum(["Frutas", "Crema", "Especias", "Minimalista"]),
        })
      )
      .mutation(async ({ input }) => {
        // Aroma-specific color hints for visual consistency
        const aromaColorHints: Record<string, string> = {
          "Frutal": "with fresh fruit tones",
          "Dulce": "with warm dessert-inspired hues",
          "Cítrico": "with bright citrus accents",
          "Especiado": "with warm spice tones",
        };

        // Decoration-specific details
        const decorationDetails: Record<string, string> = {
          "Frutas": "topped with fresh fruit pieces (strawberries, mango, or berries) as subtle decoration",
          "Crema": "with whipped cream-like texture on top, smooth and elegant",
          "Especias": "with dried spice elements (cinnamon sticks, star anise) as delicate garnish",
          "Minimalista": "with clean, minimalist aesthetic, no decorations",
        };

        // Type-specific layer descriptions
        const typeLayerDescription: Record<string, string> = {
          "Cóctel": "3-4 distinct colored layers like a cocktail drink",
          "Postre": "2-3 layers with dessert-inspired color combinations",
          "Elegante": "2 sophisticated layers with elegant color gradient",
          "Corporativa": "single solid color with professional minimalist design",
        };

        const prompt = `A realistic layered candle in a transparent glass, drink-style candle, soft studio lighting, clean minimal background, product photography, consistent glass shape, elegant and modern aesthetic.

Specifications:
- Container: Transparent glass, cylindrical shape like a beverage glass (ALWAYS maintain this shape)
- Layers: ${typeLayerDescription[input.type]}
- Primary Color: ${input.color} ${aromaColorHints[input.aroma]}
- Decoration: ${decorationDetails[input.decoration]}
- Style: Professional product photography, studio lighting, neutral background
- CRITICAL: ALWAYS maintain the same transparent glass container shape and realistic beverage-style candle format
- Ensure the candle looks like a variation of the same product line, not a different product
- No fantasy styles, no unusual shapes, no sculptural forms
- Realistic and fabricable design
- The candle must look like it belongs to the same product family`;

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
