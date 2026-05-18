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
          type: z.enum(["Cóctel", "Postre", "Temporada", "Recordatorio", "Corporativo"]),
          aroma: z.enum(["Frutal", "Dulce", "Cítrico", "Especiado"]),
          colors: z.array(z.enum(["Rojo", "Azul", "Amarillo", "Verde", "Naranja", "Morado", "Rosado", "Negro", "Blanco", "Cafe", "Beige", "Dorado", "Plateado"])).min(1),
          decoration: z.enum(["Frutas", "Crema", "Especias", "Minimalista"]),
        })
      )
      .mutation(async ({ input }) => {
        // Color to English translation for better AI understanding
        const colorTranslations: Record<string, string> = {
          "Rojo": "vibrant red",
          "Azul": "sky blue",
          "Amarillo": "golden yellow",
          "Verde": "emerald green",
          "Naranja": "bright orange",
          "Morado": "deep purple",
          "Rosado": "pastel pink",
          "Negro": "charcoal black",
          "Blanco": "pure white",
          "Cafe": "rich coffee brown",
          "Beige": "warm beige",
          "Dorado": "luxurious gold",
          "Plateado": "silver",
        };

        // Aroma is informative only - NOT used in visual generation
        // It's stored for order/checkout purposes but doesn't affect image

        // Decoration-specific details for premium aesthetic
        const decorationDetails: Record<string, string> = {
          "Frutas": "artfully topped with fresh fruit pieces (strawberries, mango slices, berries) as delicate premium garnish",
          "Crema": "crowned with luxurious whipped cream-like wax texture, smooth and elegantly layered",
          "Especias": "delicately garnished with dried spice elements (cinnamon sticks, star anise, vanilla pods) as artisanal details",
          "Minimalista": "with clean, sophisticated minimalist aesthetic, no extra decorations, pure elegance",
        };

        // Type-specific descriptions for Burnita catalog - matching real products
        const typeDescriptions: Record<string, string> = {
          "Cóctel": "realistic cocktail candle with layered liquid appearance, ice cubes, citrus slices, mint leaves, realistic drink aesthetic matching Mojita and Melodita candles",
          "Postre": "premium dessert candle with whipped cream-like wax, realistic toppings, candy decorations, sweet elegant appearance matching Nubecita and Tropica candles",
          "Temporada": "seasonal specialty candle with matcha green, spirulina blue, jamaica red, or fresh fruit layers, vibrant refreshing aesthetic",
          "Recordatorio": "elegant personalized candle with delicate artisanal design, subtle sophisticated details, refined emotional aesthetic",
          "Corporativo": "professional luxury candle with clean minimalist design, sophisticated premium appearance, elegant gift-worthy aesthetic",
        };

        // Build color description
        const colorDescriptions = input.colors.map(c => colorTranslations[c]).join(", ");
        const colorLayering = input.colors.length > 1 
          ? `layered wax colors: ${colorDescriptions}`
          : `primary color: ${colorDescriptions}`;

        const prompt = `ULTRA REALISTIC product photography of a handcrafted Burnita candle. ${typeDescriptions[input.type]}, ${decorationDetails[input.decoration]}, elegant layered wax composition using ${colorLayering}. CRITICAL REQUIREMENTS: (1) VERTICAL composition (4:5 aspect ratio minimum, portrait oriented). (2) TRANSPARENT GLASS CONTAINER - standard cylindrical beverage-style glass, consistent size and proportions with all Burnita candles (NOT tall, NOT thin, NOT oversized). (3) Photorealistic studio product photography with professional clean lighting. (4) Realistic wax textures with proper light refraction, depth, and artisanal details. (5) Premium elegant aesthetic matching Burnita's real catalog (Mojita, Melodita, Nubecita, Tropica style). (6) Hyperrealistic playful aesthetic (hiperrealismo ludico). (7) ABSOLUTELY NO text, NO branding, NO "Burnita" text, NO logos, NO watermarks inside or on the glass. (8) NO fantasy elements, NO unusual shapes, NO generic AI renders, NO 3D renders. (9) Must look like a REAL product that could be placed immediately in Burnita shop next to existing candles. (10) Realistic and fabricable design with artisanal handcrafted appearance.`;

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
