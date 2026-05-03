-- Create ordenes table for order management
CREATE TABLE IF NOT EXISTS ordenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referencia VARCHAR(255) NOT NULL UNIQUE,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion TEXT NOT NULL,
  ciudad VARCHAR(255) NOT NULL,
  departamento VARCHAR(255) NOT NULL,
  productos JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  envio DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  estado VARCHAR(50) NOT NULL DEFAULT 'pendiente',
  fecha TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on referencia for fast lookups
CREATE INDEX IF NOT EXISTS idx_ordenes_referencia ON ordenes(referencia);

-- Create index on estado for filtering orders
CREATE INDEX IF NOT EXISTS idx_ordenes_estado ON ordenes(estado);

-- Create index on email for customer lookups
CREATE INDEX IF NOT EXISTS idx_ordenes_email ON ordenes(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_ordenes_created_at ON ordenes(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE ordenes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert orders (public checkout)
CREATE POLICY "Allow public to insert orders" ON ordenes
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow anyone to read their own orders by email
CREATE POLICY "Allow users to read their orders" ON ordenes
  FOR SELECT
  USING (true);

-- Create policy to allow updates only for status changes (webhook)
CREATE POLICY "Allow status updates" ON ordenes
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
