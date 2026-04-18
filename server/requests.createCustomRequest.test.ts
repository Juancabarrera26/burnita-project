import { describe, it, expect } from "vitest";
import { z } from "zod";

// Test the validation schema for custom requests
const customRequestSchema = z.object({
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
});

describe("Custom Request Validation", () => {
  it("should accept valid recordatorios request", () => {
    const validRequest = {
      requestType: "recordatorios" as const,
      clientName: "Juan Pérez",
      clientEmail: "juan@example.com",
      clientPhone: "+1 (555) 123-4567",
      clientLocation: "Bogotá, Colombia",
      generalDescription: "Necesito velas personalizadas para un cumpleaños especial",
      candleType: "Vela aromática",
      quantity: 5,
      urgency: "normal" as const,
    };

    const result = customRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it("should accept valid empresarial request", () => {
    const validRequest = {
      requestType: "empresarial" as const,
      clientName: "María García",
      clientEmail: "maria@company.com",
      clientPhone: "+1 (555) 987-6543",
      clientCompany: "Tech Solutions Inc",
      clientLocation: "México City, México",
      generalDescription: "Queremos velas personalizadas con nuestro logo para regalos corporativos",
      candleType: "Vela corporativa",
      quantity: 100,
      message: "Con nuestro logo",
      colors: "Azul y dorado",
      urgency: "urgente" as const,
    };

    const result = customRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it("should reject request with invalid email", () => {
    const invalidRequest = {
      requestType: "recordatorios" as const,
      clientName: "Juan Pérez",
      clientEmail: "invalid-email",
      clientPhone: "+1 (555) 123-4567",
      clientLocation: "Bogotá, Colombia",
      generalDescription: "Necesito velas personalizadas para un cumpleaños especial",
      candleType: "Vela aromática",
      quantity: 5,
    };

    const result = customRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it("should reject request with missing required fields", () => {
    const invalidRequest = {
      requestType: "recordatorios" as const,
      clientName: "Juan Pérez",
      // Missing clientEmail
      clientPhone: "+1 (555) 123-4567",
      clientLocation: "Bogotá, Colombia",
      generalDescription: "Necesito velas personalizadas para un cumpleaños especial",
      candleType: "Vela aromática",
      quantity: 5,
    };

    const result = customRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it("should reject request with short description", () => {
    const invalidRequest = {
      requestType: "recordatorios" as const,
      clientName: "Juan Pérez",
      clientEmail: "juan@example.com",
      clientPhone: "+1 (555) 123-4567",
      clientLocation: "Bogotá, Colombia",
      generalDescription: "Velas", // Too short
      candleType: "Vela aromática",
      quantity: 5,
    };

    const result = customRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it("should reject request with invalid quantity", () => {
    const invalidRequest = {
      requestType: "recordatorios" as const,
      clientName: "Juan Pérez",
      clientEmail: "juan@example.com",
      clientPhone: "+1 (555) 123-4567",
      clientLocation: "Bogotá, Colombia",
      generalDescription: "Necesito velas personalizadas para un cumpleaños especial",
      candleType: "Vela aromática",
      quantity: 0, // Invalid quantity
    };

    const result = customRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it("should accept optional fields", () => {
    const validRequest = {
      requestType: "recordatorios" as const,
      clientName: "Juan Pérez",
      clientEmail: "juan@example.com",
      clientPhone: "+1 (555) 123-4567",
      clientLocation: "Bogotá, Colombia",
      generalDescription: "Necesito velas personalizadas para un cumpleaños especial",
      candleType: "Vela aromática",
      quantity: 5,
      // Optional fields not provided
    };

    const result = customRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it("should set default urgency to normal", () => {
    const validRequest = {
      requestType: "recordatorios" as const,
      clientName: "Juan Pérez",
      clientEmail: "juan@example.com",
      clientPhone: "+1 (555) 123-4567",
      clientLocation: "Bogotá, Colombia",
      generalDescription: "Necesito velas personalizadas para un cumpleaños especial",
      candleType: "Vela aromática",
      quantity: 5,
      // urgency not provided
    };

    const result = customRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.urgency).toBe("normal");
    }
  });

  it("should accept both urgency options", () => {
    const requestNormal = {
      requestType: "recordatorios" as const,
      clientName: "Juan Pérez",
      clientEmail: "juan@example.com",
      clientPhone: "+1 (555) 123-4567",
      clientLocation: "Bogotá, Colombia",
      generalDescription: "Necesito velas personalizadas para un cumpleaños especial",
      candleType: "Vela aromática",
      quantity: 5,
      urgency: "normal" as const,
    };

    const requestUrgent = {
      ...requestNormal,
      urgency: "urgente" as const,
    };

    const resultNormal = customRequestSchema.safeParse(requestNormal);
    const resultUrgent = customRequestSchema.safeParse(requestUrgent);

    expect(resultNormal.success).toBe(true);
    expect(resultUrgent.success).toBe(true);
  });
});
