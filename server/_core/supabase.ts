import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('[Supabase] Connected successfully');
} else {
  console.warn('[Supabase] Credentials not configured. Order operations will fail until SUPABASE_URL and SUPABASE_ANON_KEY are set.');
}

/**
 * Type definitions for Supabase tables
 */
export interface Order {
  id: string;
  referencia: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  productos: Array<{
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    imagen?: string;
  }>;
  subtotal: number;
  envio: number;
  total: number;
  estado: 'pendiente' | 'pagado' | 'cancelado' | 'entregado';
  fecha: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Create a new order in Supabase
 */
export async function createOrder(orderData: any) {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  }

  const referencia = `BURNITA-${Date.now()}`;
  const fecha = new Date().toISOString();

  const orderRecord = {
    referencia,
    nombre: orderData.nombre,
    apellido: orderData.apellido,
    email: orderData.email,
    telefono: orderData.telefono,
    direccion: orderData.direccion,
    ciudad: orderData.ciudad,
    departamento: orderData.departamento,
    productos: orderData.productos,
    subtotal: orderData.subtotal,
    envio: orderData.envio,
    total: orderData.total,
    fecha,
    estado: 'pendiente',
  };

  const { data, error } = await (supabase as any)
    .from('ordenes')
    .insert([orderRecord])
    .select();

  if (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }

  return { referencia, ...data?.[0] };
}

/**
 * Get order by reference
 */
export async function getOrderByReference(referencia: string) {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await (supabase as any)
    .from('ordenes')
    .select('*')
    .eq('referencia', referencia)
    .single();

  if (error) {
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return data;
}

/**
 * Update order status
 */
export async function updateOrderStatus(referencia: string, estado: string) {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  }

  const updateData = { estado, updated_at: new Date().toISOString() };

  const { data, error } = await (supabase as any)
    .from('ordenes')
    .update(updateData)
    .eq('referencia', referencia)
    .select();

  if (error) {
    throw new Error(`Failed to update order: ${error.message}`);
  }

  return data?.[0];
}

/**
 * Get all orders (for admin dashboard)
 */
export async function getAllOrders() {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await (supabase as any)
    .from('ordenes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return data;
}
