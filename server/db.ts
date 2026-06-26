import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, customRequests, InsertCustomRequest, ordenes, InsertOrden } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createCustomRequest(request: InsertCustomRequest) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create custom request: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(customRequests).values(request);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create custom request:", error);
    throw error;
  }
}

export async function createOrder(orderData: any) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const referencia = `BURNITA-${Date.now()}`;
    const fecha = new Date().toISOString();

    const insertData: InsertOrden = {
      referencia,
      nombre: orderData.nombre,
      apellido: orderData.apellido,
      email: orderData.email,
      telefono: orderData.telefono,
      direccion: orderData.direccion,
      ciudad: orderData.ciudad,
      departamento: orderData.departamento,
      productos: JSON.stringify(orderData.productos),
      subtotal: orderData.subtotal,
      envio: orderData.envio,
      total: orderData.total,
      estado: "pendiente",
      fecha,
    };

    await db.insert(ordenes).values(insertData);
    console.log('[Database] Order created successfully:', referencia);
    
    return {
      referencia,
      ...orderData,
      estado: "pendiente",
      fecha,
    };
  } catch (error) {
    console.error("[Database] Failed to create order:", error);
    throw error;
  }
}

export async function getOrderByReference(referencia: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .select()
      .from(ordenes)
      .where(eq(ordenes.referencia, referencia))
      .limit(1);

    if (result.length === 0) {
      throw new Error("Order not found");
    }

    const order = result[0];
    return {
      ...order,
      productos: typeof order.productos === 'string' ? JSON.parse(order.productos) : order.productos,
    };
  } catch (error) {
    console.error("[Database] Failed to get order:", error);
    throw error;
  }
}

export async function updateOrderStatus(referencia: string, estado: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db
      .update(ordenes)
      .set({ estado: estado as any, updatedAt: new Date() })
      .where(eq(ordenes.referencia, referencia));

    console.log('[Database] Order status updated:', referencia, estado);
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to update order status:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.
