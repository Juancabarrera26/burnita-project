<?php
// Configuración
$recipient_email = 'info@burnita.com';
$response = array('success' => false, 'message' => '');

// Verificar que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    $response['message'] = 'Método no permitido';
    echo json_encode($response);
    exit;
}

// Obtener tipo de formulario
$form_type = isset($_POST['form_type']) ? sanitize_input($_POST['form_type']) : '';

if ($form_type === 'subscription') {
    handle_subscription();
} elseif ($form_type === 'custom_request') {
    handle_custom_request();
} else {
    http_response_code(400);
    $response['message'] = 'Tipo de formulario inválido';
    echo json_encode($response);
    exit;
}

// Función para sanitizar inputs
function sanitize_input($input) {
    return htmlspecialchars(stripslashes(trim($input)), ENT_QUOTES, 'UTF-8');
}

// Manejar suscripción
function handle_subscription() {
    global $recipient_email, $response;
    
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    
    // Validar email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $response['message'] = 'Email inválido';
        echo json_encode($response);
        exit;
    }
    
    // Construir mensaje
    $subject = 'Nueva suscripción - Burnita';
    $message = "Nueva suscripción recibida\n\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Fecha: " . date('Y-m-d H:i:s') . "\n";
    
    // Headers
    $headers = "From: noreply@burnita.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Enviar correo
    if (mail($recipient_email, $subject, $message, $headers)) {
        $response['success'] = true;
        $response['message'] = 'Gracias, pronto te contactaremos con novedades.';
    } else {
        http_response_code(500);
        $response['message'] = 'Error al enviar el correo';
    }
    
    echo json_encode($response);
}

// Manejar solicitud personalizada
function handle_custom_request() {
    global $recipient_email, $response;
    
    // Validar campos obligatorios
    $required_fields = array('name', 'email', 'phone', 'location', 'description', 'candle_type', 'quantity', 'request_type');
    
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            http_response_code(400);
            $response['message'] = 'Todos los campos obligatorios deben completarse';
            echo json_encode($response);
            exit;
        }
    }
    
    // Sanitizar inputs
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $phone = sanitize_input($_POST['phone']);
    $company = isset($_POST['company']) ? sanitize_input($_POST['company']) : 'N/A';
    $location = sanitize_input($_POST['location']);
    $description = sanitize_input($_POST['description']);
    $candle_type = sanitize_input($_POST['candle_type']);
    $quantity = sanitize_input($_POST['quantity']);
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : 'N/A';
    $colors = isset($_POST['colors']) ? sanitize_input($_POST['colors']) : 'N/A';
    $style = isset($_POST['style']) ? sanitize_input($_POST['style']) : 'N/A';
    $references = isset($_POST['references']) ? sanitize_input($_POST['references']) : 'N/A';
    $event = isset($_POST['event']) ? sanitize_input($_POST['event']) : 'N/A';
    $delivery_date = isset($_POST['delivery_date']) ? sanitize_input($_POST['delivery_date']) : 'N/A';
    $budget = isset($_POST['budget']) ? sanitize_input($_POST['budget']) : 'N/A';
    $urgency = isset($_POST['urgency']) ? sanitize_input($_POST['urgency']) : 'Normal';
    $comments = isset($_POST['comments']) ? sanitize_input($_POST['comments']) : 'N/A';
    $request_type = sanitize_input($_POST['request_type']);
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $response['message'] = 'Email inválido';
        echo json_encode($response);
        exit;
    }
    
    // Construir mensaje
    $subject = 'Nuevo pedido personalizado - Burnita';
    $message = "NUEVO PEDIDO PERSONALIZADO\n";
    $message .= "=" . str_repeat("=", 50) . "\n\n";
    
    $message .= "DATOS DEL CLIENTE\n";
    $message .= "-" . str_repeat("-", 50) . "\n";
    $message .= "Nombre: " . $name . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Teléfono: " . $phone . "\n";
    $message .= "Empresa: " . $company . "\n";
    $message .= "Ubicación: " . $location . "\n\n";
    
    $message .= "IDEA GENERAL\n";
    $message .= "-" . str_repeat("-", 50) . "\n";
    $message .= "Descripción: " . $description . "\n\n";
    
    $message .= "PRODUCTO\n";
    $message .= "-" . str_repeat("-", 50) . "\n";
    $message .= "Tipo de vela: " . $candle_type . "\n";
    $message .= "Cantidad: " . $quantity . "\n\n";
    
    $message .= "PERSONALIZACIÓN\n";
    $message .= "-" . str_repeat("-", 50) . "\n";
    $message .= "Mensaje: " . $message . "\n";
    $message .= "Colores: " . $colors . "\n";
    $message .= "Estilo: " . $style . "\n";
    $message .= "Referencias: " . $references . "\n\n";
    
    $message .= "CONTEXTO\n";
    $message .= "-" . str_repeat("-", 50) . "\n";
    $message .= "Evento: " . $event . "\n";
    $message .= "Fecha de entrega: " . $delivery_date . "\n\n";
    
    $message .= "DETALLES\n";
    $message .= "-" . str_repeat("-", 50) . "\n";
    $message .= "Presupuesto: " . $budget . "\n";
    $message .= "Urgencia: " . $urgency . "\n";
    $message .= "Comentarios: " . $comments . "\n\n";
    
    $message .= "Tipo de solicitud: " . $request_type . "\n";
    $message .= "Fecha de solicitud: " . date('Y-m-d H:i:s') . "\n";
    
    // Headers
    $headers = "From: noreply@burnita.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Enviar correo
    if (mail($recipient_email, $subject, $message, $headers)) {
        $response['success'] = true;
        $response['message'] = 'Tu solicitud fue enviada correctamente. Te responderemos pronto.';
    } else {
        http_response_code(500);
        $response['message'] = 'Error al enviar el correo';
    }
    
    echo json_encode($response);
}
?>
