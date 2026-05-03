import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

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
export async function createOrder(orderData: Omit<Order, 'id' | 'referencia' | 'fecha' | 'created_at' | 'updated_at'>) {
  const referencia = `BURNITA-${Date.now()}`;
  const fecha = new Date().toISOString();

  const { data, error } = await supabase
    .from('ordenes')
    .insert([
      {
        referencia,
        ...orderData,
        fecha,
        estado: 'pendiente',
      },
    ])
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
  const { data, error } = await supabase
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
export async function updateOrderStatus(referencia: string, estado: Order['estado']) {
  const { data, error } = await supabase
    .from('ordenes')
    .update({ estado, updated_at: new Date().toISOString() })
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
  const { data, error } = await supabase
    .from('ordenes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return data;
}
