# Guía de Configuración - Sistema de Órdenes con Supabase

## Paso 1: Crear Proyecto Supabase

1. Ve a https://supabase.com
2. Click en "Start your project"
3. Regístrate con GitHub o email
4. Crea una organización (si no la tienes)
5. Click en "New project"
6. Completa los datos:
   - **Name**: `burnita-shop`
   - **Database Password**: Guarda esta contraseña (la necesitarás)
   - **Region**: Elige la más cercana (ej: us-east-1)
7. Click "Create new project"
8. Espera 2-3 minutos a que se cree el proyecto

## Paso 2: Obtener Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** → **API** (en el menú izquierdo)
2. Copia estos valores:
   - **Project URL** (ej: `https://xxxxx.supabase.co`)
   - **anon public** key (bajo "Project API keys")

## Paso 3: Crear la Tabla de Órdenes

1. Ve a **SQL Editor** (en el menú izquierdo)
2. Click en "New query"
3. Copia y pega el contenido de `server/migrations/001_create_ordenes_table.sql`
4. Click "Run"

La tabla `ordenes` se creará automáticamente con:
- Campos: id, referencia, nombre, apellido, email, telefono, direccion, ciudad, departamento, productos, subtotal, envio, total, estado, fecha
- Índices para búsquedas rápidas
- Row Level Security (RLS) habilitado

## Paso 4: Configurar Credenciales en el Proyecto

Proporciona estas credenciales para que se configuren automáticamente:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
```

## Paso 5: Probar los Endpoints

### Crear una Orden

```bash
curl -X POST http://localhost:3000/api/trpc/orders.crearOrden \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "telefono": "3001234567",
    "direccion": "Calle 123 #45",
    "ciudad": "Medellín",
    "departamento": "Antioquia",
    "productos": [
      {
        "id": "melodita",
        "nombre": "Melodita",
        "precio": 50000,
        "cantidad": 2
      }
    ],
    "subtotal": 100000,
    "envio": 10000,
    "total": 110000
  }'
```

### Webhook de Wompi

El webhook está disponible en:
```
POST /api/webhooks/wompi
```

Wompi enviará eventos a este endpoint cuando el estado de la transacción cambie.

## Estructura de la Orden

```typescript
{
  id: string;                    // UUID generado automáticamente
  referencia: string;            // BURNITA-{timestamp}
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
  fecha: string;                 // ISO timestamp
  created_at: string;            // Automático
  updated_at: string;            // Automático
}
```

## Próximos Pasos

1. ✅ Backend de órdenes configurado
2. ⏳ Conectar frontend Checkout con endpoint `/crear-orden`
3. ⏳ Integrar Wompi Checkout con referencia de orden
4. ⏳ Crear dashboard de órdenes para admin

## Soporte

Si tienes problemas:
- Verifica que las credenciales sean correctas
- Revisa los logs del servidor (`/api/trpc/orders.crearOrden`)
- Asegúrate de que la tabla `ordenes` existe en Supabase
