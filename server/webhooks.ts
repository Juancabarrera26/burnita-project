import { Request, Response } from 'express';
import { updateOrderStatus } from './_core/supabase';
import crypto from 'crypto';

/**
 * Wompi webhook signature verification
 * Wompi sends a X-Signature header with HMAC-SHA256 signature
 */
export function verifyWompiSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return hash === signature;
}

/**
 * Handle Wompi webhook events
 * Wompi sends events when transaction status changes
 */
export async function handleWompiWebhook(req: Request, res: Response) {
  try {
    // Get the raw body for signature verification
    const signature = req.headers['x-signature'] as string;
    const payload = JSON.stringify(req.body);

    // Verify signature (optional but recommended)
    // const wompiSecret = process.env.WOMPI_WEBHOOK_SECRET;
    // if (wompiSecret && !verifyWompiSignature(payload, signature, wompiSecret)) {
    //   console.warn('[Wompi Webhook] Invalid signature');
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    const event = req.body;

    // Handle different event types
    if (event.event === 'transaction.updated') {
      const transaction = event.data?.transaction || event.data;
      const reference = transaction?.reference;
      const status = transaction?.status;

      console.log(`[Wompi Webhook] Transaction ${reference} status: ${status}`);

      // Map Wompi status to our order status
      let orderStatus: 'pagado' | 'cancelado' | 'pendiente' = 'pendiente';
      
      if (status === 'APPROVED') {
        orderStatus = 'pagado';
      } else if (status === 'DECLINED' || status === 'VOIDED') {
        orderStatus = 'cancelado';
      }

      // Update order status in database
      if (reference) {
        await updateOrderStatus(reference, orderStatus);
        console.log(`[Wompi Webhook] Order ${reference} updated to ${orderStatus}`);
        
        return res.status(200).json({ 
          success: true, 
          message: `Order ${reference} updated to ${orderStatus}` 
        });
      } else {
        console.warn('[Wompi Webhook] No reference found in transaction');
        return res.status(400).json({ 
          success: false, 
          error: 'No reference found in transaction' 
        });
      }
    }

    // Unknown event type
    console.warn(`[Wompi Webhook] Unknown event type: ${event.event}`);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('[Wompi Webhook Error]', error);
    return res.status(500).json({ 
      error: 'Webhook processing failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Wompi webhook event types
 * Reference: https://docs.wompi.co/es/webhooks
 * 
 * transaction.updated - Transaction status changed
 * - status: APPROVED, DECLINED, VOIDED, PENDING
 */
