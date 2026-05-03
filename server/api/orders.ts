import { Router, Request, Response } from 'express';
import { createOrder, updateOrderStatus, getOrderByReference } from '../_core/supabase';
import { z } from 'zod';

const router = Router();

/**
 * Validation schema for order creation
 */
const CreateOrderSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  apellido: z.string().min(1, 'Apellido requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(1, 'Teléfono requerido'),
  direccion: z.string().min(1, 'Dirección requerida'),
  ciudad: z.string().min(1, 'Ciudad requerida'),
  departamento: z.string().min(1, 'Departamento requerido'),
  productos: z.array(
    z.object({
      id: z.string(),
      nombre: z.string(),
      precio: z.number().positive(),
      cantidad: z.number().positive(),
      imagen: z.string().optional(),
    })
  ).min(1, 'Al menos un producto es requerido'),
  subtotal: z.number().positive(),
  envio: z.number().nonnegative(),
  total: z.number().positive(),
});

type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

/**
 * POST /api/orders/crear
 * Create a new order
 */
router.post('/crear', async (req: Request, res: Response) => {
  try {
    const input = CreateOrderSchema.parse(req.body);

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
    };

    const order = await createOrder(orderData);

    return res.status(201).json({
      success: true,
      referencia: order.referencia,
      total: order.total,
      message: 'Orden creada exitosamente',
      order,
    });
  } catch (error) {
    console.error('[Order Creation Error]', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validación fallida',
        details: (error as any).errors,
      });
    }

    const message = error instanceof Error ? error.message : 'Error al crear la orden';
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
});

/**
 * GET /api/orders/:referencia
 * Get order by reference
 */
router.get('/:referencia', async (req: Request, res: Response) => {
  try {
    const { referencia } = req.params;

    if (!referencia) {
      return res.status(400).json({
        success: false,
        error: 'Referencia requerida',
      });
    }

    const order = await getOrderByReference(referencia);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('[Get Order Error]', error);

    const message = error instanceof Error ? error.message : 'Error al obtener la orden';
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
});

/**
 * POST /api/orders/:referencia/actualizar-estado
 * Update order status (for webhooks)
 */
router.post('/:referencia/actualizar-estado', async (req: Request, res: Response) => {
  try {
    const { referencia } = req.params;
    const { estado } = req.body;

    if (!referencia) {
      return res.status(400).json({
        success: false,
        error: 'Referencia requerida',
      });
    }

    if (!estado || !['pendiente', 'pagado', 'cancelado', 'entregado'].includes(estado)) {
      return res.status(400).json({
        success: false,
        error: 'Estado inválido. Debe ser: pendiente, pagado, cancelado o entregado',
      });
    }

    const order = await updateOrderStatus(referencia, estado);

    return res.status(200).json({
      success: true,
      message: `Orden actualizada a estado: ${estado}`,
      order,
    });
  } catch (error) {
    console.error('[Update Order Status Error]', error);

    const message = error instanceof Error ? error.message : 'Error al actualizar la orden';
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
});

export default router;
