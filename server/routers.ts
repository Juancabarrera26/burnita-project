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

        // Aroma-specific descriptors for premium aesthetic
        const aromaDescriptors: Record<string, string> = {
          "Frutal": "fresh fruit-inspired",
          "Dulce": "sweet dessert-inspired",
          "Cítrico": "bright citrus-inspired",
          "Especiado": "warm spice-inspired",
        };

        // Decoration-specific details for premium aesthetic
        const decorationDetails: Record<string, string> = {
          "Frutas": "artfully topped with fresh fruit pieces (strawberries, mango slices, berries) as delicate premium garnish",
          "Crema": "crowned with luxurious whipped cream-like wax texture, smooth and elegantly layered",
          "Especias": "delicately garnished with dried spice elements (cinnamon sticks, star anise, vanilla pods) as artisanal details",
          "Minimalista": "with clean, sophisticated minimalist aesthetic, no extra decorations, pure elegance",
        };

        // Type-specific descriptions for Burnita catalog
        const typeDescriptions: Record<string, string> = {
          "Cóctel": "cocktail-inspired with realistic layered drink appearance, ice cubes, fruit garnish, premium beverage aesthetic similar to Mojita, Citrujito, Melodita",
          "Postre": "dessert-inspired with whipped cream texture, toppings, candy elements, sweet indulgent appearance similar to Nubecita",
          "Temporada": "seasonal fresh-inspired with matcha, spirulina, jamaica or seasonal fruit layers, refreshing premium look",
          "Recordatorio": "delicate artisanal design with personalized elegant aesthetic, subtle sophisticated details",
          "Corporativo": "professional sophisticated design with clean minimalist luxury, corporate premium appearance",
        };

        // Build color description
        const colorDescriptions = input.colors.map(c => colorTranslations[c]).join(", ");
        const colorLayering = input.colors.length > 1 
          ? `layered wax colors: ${colorDescriptions}`
          : `primary color: ${colorDescriptions}`;

        const prompt = `Ultra realistic handcrafted Burnita-inspired candle in transparent glass, ${typeDescriptions[input.type]}, photorealistic artisanal soy wax candle, vertical premium product photography, realistic drink-inspired candle design, elegant layered wax composition using ${colorLayering}, ${aromaDescriptors[input.aroma]}, decorative elements of ${decorationDetails[input.decoration]}, clean premium studio lighting, luxury handcrafted aesthetic, vibrant but elegant colors, realistic textures, hyperreal playful realism, premium catalog photography, similar to artisanal cocktail candles, realistic glass proportions, no text, no branding, no logo, no watermark, realistic handcrafted details, Burnita catalog aesthetic, must look like a real candle from Burnita shop.

CRITICAL REQUIREMENTS:
- VERTICAL premium product photography (4:5 aspect ratio or taller)
- ALWAYS transparent glass container (cylindrical beverage-style glass, realistic proportions)
- Realistic wax textures with proper light refraction and depth
- Professional studio photography with clean lighting
- Premium, elegant, artisanal appearance matching Burnita catalog
- Hyperrealistic playful aesthetic (hiperrealismo ludico)
- NO fantasy elements, NO unusual shapes, NO generic AI renders
- NO text, NO branding, NO "Burnita" text inside glass
- NO watermarks or logos
- Realistic and fabricable design that could exist in real catalog
- Must match Burnita's real candle aesthetic and style`;

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
