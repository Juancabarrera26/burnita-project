import emailjs from '@emailjs/browser';

// Inicializar EmailJS con tu Public Key
// Necesitarás crear una cuenta en emailjs.com y obtener tu Public Key
export const initEmailJS = () => {
  // Reemplaza 'YOUR_PUBLIC_KEY' con tu clave pública de EmailJS
  emailjs.init('YOUR_PUBLIC_KEY');
};

// Función para enviar email de suscripción
export const sendSubscriptionEmail = async (email: string) => {
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID', // Reemplaza con tu Service ID
      'subscription_template', // Reemplaza con tu Template ID
      {
        to_email: 'info@burnita.com',
        subscriber_email: email,
        subject: 'Nueva suscripción',
      }
    );
    return response;
  } catch (error) {
    console.error('Error sending subscription email:', error);
    throw error;
  }
};

// Función para enviar email de solicitud personalizada
export const sendCustomRequestEmail = async (formData: any) => {
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID', // Reemplaza con tu Service ID
      'custom_request_template', // Reemplaza con tu Template ID
      {
        to_email: 'info@burnita.com',
        // Datos del cliente
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        client_company: formData.company || 'N/A',
        client_location: formData.location,
        // Descripción
        description: formData.description,
        // Producto
        candle_type: formData.candleType,
        quantity: formData.quantity,
        // Personalización
        message: formData.message || 'N/A',
        colors: formData.colors || 'N/A',
        style: formData.style || 'N/A',
        references: formData.references || 'N/A',
        // Contexto
        event: formData.event || 'N/A',
        delivery_date: formData.deliveryDate || 'N/A',
        // Extras
        budget: formData.budget || 'N/A',
        urgency: formData.urgency || 'Normal',
        comments: formData.comments || 'N/A',
        request_type: formData.requestType,
      }
    );
    return response;
  } catch (error) {
    console.error('Error sending custom request email:', error);
    throw error;
  }
};
