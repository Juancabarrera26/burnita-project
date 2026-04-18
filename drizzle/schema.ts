import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here
// Tabla para solicitudes personalizadas de velas
export const customRequests = mysqlTable("customRequests", {
  id: int("id").autoincrement().primaryKey(),
  requestType: mysqlEnum("requestType", ["recordatorios", "empresarial"]).notNull(),
  
  // Datos del cliente
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 20 }).notNull(),
  clientCompany: varchar("clientCompany", { length: 255 }),
  clientLocation: varchar("clientLocation", { length: 255 }).notNull(),
  
  // Descripción general
  generalDescription: text("generalDescription").notNull(),
  
  // Producto
  candleType: varchar("candleType", { length: 255 }).notNull(),
  quantity: int("quantity").notNull(),
  
  // Personalización
  message: text("message"),
  colors: text("colors"),
  style: varchar("style", { length: 255 }),
  references: text("references"),
  
  // Contexto
  event: varchar("event", { length: 255 }),
  deliveryDate: varchar("deliveryDate", { length: 255 }),
  
  // Presupuesto y urgencia
  budget: varchar("budget", { length: 255 }),
  urgency: mysqlEnum("urgency", ["normal", "urgente"]).default("normal").notNull(),
  
  // Comentarios adicionales
  additionalComments: text("additionalComments"),
  
  // Metadata
  status: mysqlEnum("status", ["pendiente", "revisada", "completada", "cancelada"]).default("pendiente").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomRequest = typeof customRequests.$inferSelect;
export type InsertCustomRequest = typeof customRequests.$inferInsert;
