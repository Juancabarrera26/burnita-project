# Burnita Shop - Project TODO

## Completed Features
- [x] Rebuilt product carousel with scroll-snap architecture (3 products desktop, 2 tablet, 1 mobile)
- [x] Implemented autoplay with 2.5s intervals, loop functionality, and pause on interaction
- [x] Fixed carousel navigation and scrollbar issues
- [x] Created /shop page with 4 categories and 16 products
- [x] Updated brand images (BURNITA Lab section, category cards)
- [x] Updated brand color palette (Guayaba Pop, Mango Fizz, Mint Soda, Lavanda Nube)
- [x] Changed background colors to cream (#fff6ea) for BurnitaLab and Categories sections
- [x] Added "Inicio" button to navbar as first navigation item
- [x] Created independent /explore-lab page with interactive candle customization system
- [x] Upgraded project from web-static to web-db-user to enable backend and AI API access
- [x] Server restarted successfully with tRPC, MySQL database, and API capabilities
- [x] Created tRPC endpoint for AI image generation (candles.generateImage)
- [x] Integrated generateImage helper from server/_core/imageGeneration
- [x] Updated ExploreLab.tsx to call AI image generation endpoint
- [x] Added loading state with spinner during image generation
- [x] Implemented error handling for failed image generation
- [x] Created unit tests for candles.generateImage endpoint (8 tests passing)
- [x] Actualizar Hero: título "Más que una vela", subtítulo "Una experiencia"
- [x] Implementar tipografía responsive con clamp para tamaño medio equilibrado
- [x] Reducir espaciado entre título y subtítulo
- [x] Eliminar completamente el badge "HIPERREALISMO LÚDICO"
- [x] Limpiar estilos inline conflictivos en Hero, Products, BurnitaLab, About
- [x] Restaurar tipografía responsive con clamp() en Hero
- [x] Agregar título "Colecciones" en sección de Categories

- [x] Crear tabla customRequests en base de datos
- [x] Crear endpoint tRPC requests.createCustomRequest
- [x] Crear componente CustomRequestForm reutilizable
- [x] Crear página /solicitud/recordatorios
- [x] Crear página /solicitud/empresarial
- [x] Actualizar rutas en App.tsx
- [x] Actualizar tarjetas de categorías para redirigir a solicitudes
- [x] Crear tests para validación de solicitudes (9 tests passing)
- [x] Corregir distribución de categorías con grid fijo de 3 columnas (2 filas)
- [x] Corregir alineación de Recordatorios y Empresarial (centradas con flex)
- [x] Unificar espaciado entre tarjetas: primera fila ahora usa flex con gap-6 lg:gap-8 igual que segunda fila

- [x] Actualizar texto en sección "¿Postre o vela?"
- [x] Cambiar fecha de "Desde 2023" a "Desde 2025"
- [x] Eliminar botón "Conoce nuestra historia"
- [x] Cambiar título a "Nuestra historia"

- [x] Eliminar categorías Recordatorios y Empresarial de página /shop
- [x] Mantener solo Cócteles, Postres y Temporada en tienda
- [x] Agregar nuevamente sección Temporada a tienda

- [x] Agregar funcionalidad a botones del Hero (scroll suave a secciones)
- [x] Agregar navegación a tarjetas de categorías (links a /shop)
- [x] Agregar IDs a secciones para scroll y navegación

- [x] Crear hook useNavigationScroll para scroll al top en cambios de ruta
- [x] Actualizar App.tsx para usar hook de scroll
- [x] Corregir links del navbar a rutas completas (/#colecciones, /#nuestra-historia, /#newsletter)
- [x] Actualizar Header.tsx con manejo de navegación inteligente
- [x] Cambiar ID de about a nuestra-historia

- [x] Actualizar Header.tsx con IDs correctos (inicio, colecciones, nosotros, contacto)
- [x] Agregar ID inicio a Hero.tsx
- [x] Cambiar ID de nuestra-historia a nosotros en About.tsx
- [x] Cambiar ID de newsletter a contacto en Newsletter.tsx
- [x] Actualizar links de categorías (/shop#cocteles, /shop#postres, /shop#temporada)
- [x] Agregar IDs a secciones de Shop.tsx (cocteles, postres, temporada)
- [x] Implementar scroll automático al hash en Shop.tsx

- [x] Eliminar preventDefault() de Header.tsx
- [x] Implementar navegación limpia sin interceptación de clicks
- [x] Actualizar useNavigationScroll para scroll al hash después de cambio de ruta
- [x] Actualizar Shop.tsx para usar block: 'start' en scrollIntoView

- [x] Agregar lógica de scroll al hash en Home.tsx
- [x] Verificar que Header.tsx no tenga preventDefault
- [x] Verificar que useNavigationScroll maneje correctamente el hash
- [x] Asegurar que todos los IDs estén correctos en todas las páginas

- [x] Actualizar color de fondo de /shop a #FFF6EA
- [x] Remover fondos blancos de secciones de categorías
- [x] Usar fondos transparentes para que se vea el color global

- [x] Corregir menú móvil: drawer lateral desde la derecha
- [x] Aplicar fondo sólido #FFF6EA con sombra
- [x] Agregar overlay oscuro detrás del menú
- [x] Implementar animación suave de entrada
- [x] Asegurar z-index correcto

## In Progress / Pending

## CORRECCIONES CRITICAS DEL CARRITO - FASE 2
- [x] Icono del carrito en Header ahora FUNCIONA
  - Header refactorizado a nivel de App.tsx
  - onCartClick pasa correctamente a Header
  - CartPanel se abre desde cualquier página
- [x] Rutas dinámicas de productos ARREGLADAS
  - ProductDetail.tsx con IDs consistentes
  - Shop.tsx genera IDs correctamente
  - Todos los productos redirigen correctamente
- [x] CartPanel funcional en TODAS las páginas
  - Muestra productos con imagen
  - Edita cantidades (+/-)
  - Elimina productos
  - Subtotal y total correcto
  - Botón "Ir al carrito" funcional
  - Checkout por WhatsApp funcional
- [x] Página de carrito /cart completa
  - Lista de productos
  - Edición de cantidades
  - Eliminación de productos
  - Resumen de compra
- [x] Contador del carrito actualiza en tiempo real
- [x] localStorage persiste carrito correctamente
- [x] Flujo completo: Shop -> Producto -> Carrito -> WhatsApp

- [ ] Test navegación en browser (manual testing - CRÍTICO)
- [ ] Test solicitudes personalizadas en browser (manual testing)
- [ ] Test AI image generation en browser (manual testing)
- [ ] Optimize image generation prompts based on user feedback
- [ ] Add cart functionality for generated candles
- [ ] Implement user authentication for saving custom candles
- [ ] Create admin dashboard for managing products
- [ ] Add payment processing with Stripe
- [ ] Implement order tracking system
- [ ] Add email notifications for orders
- [ ] Create customer review system
- [ ] Optimize performance and SEO

## Technical Stack
- Frontend: React 19 + TypeScript + Vite + Tailwind CSS 4
- Backend: Node.js + Express + tRPC 11
- Database: MySQL
- AI Integration: Manus built-in image generation service
- Authentication: Manus OAuth
- Styling: Tailwind CSS with custom brand colors

## Email Configuration
- [x] Crear archivo send-email.php con lógica de envío de emails
- [x] Actualizar formulario de suscripción (Newsletter) con envío a PHP
- [x] Actualizar formularios de personalización con envío a PHP
- [x] Implementar validación de campos obligatorios
- [x] Agregar mensajes de confirmación y éxito
- [x] Cambiar textos de suscripción ("Quiero enterarme")
- [x] Cambiar imagen de tarjeta de Cócteles en Colecciones
- [x] Expandir lista de colores disponibles (13 colores)
- [x] Crear selector visual de colores con swatches circulares
- [x] Integrar nuevo selector en ExploreLab.tsx
- [x] Actualizar enum de colores en server/routers.ts
- [x] Mantener funcionalidad de generación de velas
- [x] Eliminar descripción "Cera de Soya Natural" de todas las velas
  - Carrusel (Products.tsx): eliminado
  - Tienda (Shop.tsx): eliminado
- [x] Extraer ZIP de cócteles y analizar imágenes
- [x] Identificar nombres desde etiquetas visibles:
  - Limoncita (cóctel amarillo)
  - Pink Ice (cóctel rosado)
  - Citrusita (cóctel cítrico)
- [x] Subir imágenes a S3 y obtener URLs
- [x] Integrar en tienda:
  - Eliminar Nube de Fresa de cócteles (es postre)
  - Agregar 5 productos del carrusel: Sandía Sunset, Mojito Verde, Atardecer Tropical, Océano Nocturno, Eclipse Dorado
  - Agregar 3 nuevos: Limoncita, Pink Ice, Citrusita
  - Total: 8 cócteles a 50.000 COP
- [x] Reemplazar imagen de Citrusita con nueva versión
  - Subida a S3: /manus-storage/Citrusita_c45b99ed.png
  - URL actualizada en Shop.tsx
- [x] Eliminar marcos de color (bgColor) de todas las velas de cócteles
  - Todos los productos con bgColor: "bg-transparent"
- [x] Verificar espaciado uniforme entre tarjetas
  - Grid con gap-6 md:gap-8 (consistente)
- [x] Mover Miel Dorada, Frutos del Bosque y Océano Nocturno a Cócteles
  - Agregadas a sección de Cócteles con precio 50.000 COP
  - Eliminadas de Postres y Temporada
  - bgColor: "bg-transparent" en todas
  - Total de cócteles: 11 productos
- [x] Crear componente ProductCarousel reutilizable
  - Navegación con botones izq/der
  - Responsive: 4 desktop, 2 tablet, 1 mobile
  - Movimiento suave con framer-motion
  - Loop infinito
- [x] Integrar ProductCarousel en Shop.tsx
  - Reemplazar grid con carrusel en todas las secciones
  - Cócteles, Postres y Temporada funcionan como carrusel
- [x] Implementar lógica de navegación
  - Botones con iconos ChevronLeft/ChevronRight
  - Click en botones mueve 1 producto
  - Indicadores de posición (dots)
- [ ] Crear contexto de carrito y hook useCart
- [ ] Crear página de detalle de producto (ProductDetail.tsx)
  - Imagen grande sin recortes
  - Nombre, precio, descripción
  - Selector de cantidad (+/-)
  - Botón "Agregar al carrito"
- [ ] Generar descripción automática con LLM
  - Basada en nombre del producto
  - Formato: frase principal + diseño + sensorial + uso ideal
- [ ] Crear componente CartPanel.tsx
  - Lista de productos
  - Aumentar/disminuir cantidad
  - Eliminar producto
  - Subtotal y total
- [ ] Integrar icono de carrito en header
  - Mostrar contador de productos
  - Click abre panel lateral
- [ ] Implementar checkout por WhatsApp
  - Mensaje automático con lista de productos
  - Cantidades y total
- [ ] Hacer productos clickeables
  - Redirigir a /product/:id
  - Mantener navegación existente
- [ ] Verificar responsive (mobile, tablet, desktop)
- [ ] Probar envío de emails en navegador (manual testing)
- [x] Actualizar precios en carrusel (Products.tsx)
  - Nube de Fresa: 55.000 COP (excepción postre)
  - Resto de cócteles: 50.000 COP
  - Formato: "50.000 COP" (sin $)
- [x] Actualizar precios en tienda (Shop.tsx)
  - Cócteles: 50.000 COP
  - Postres: 55.000 COP
  - Temporada: 55.000 COP
  - Formato consistente: "50.000 COP"
- [x] Verificar que no se modifique diseño, layout ni estructura
- [x] Verificar responsividad en mobile/desktop

## MEJORA DE VISUALIZACIÓN DE IMÁGENES - ZOOM INTERACTIVO
- [x] Crear componente ImageZoom.tsx con zoom desktop y mobile
- [x] Eliminar contenedor blanco innecesario
- [x] Implementar hover zoom en desktop
- [x] Implementar touch zoom en mobile
- [x] Integrar ImageZoom en ProductDetail.tsx
- [x] Probar en desktop, tablet y mobile

## CORRECCIONES DE ZOOM - FASE 2
- [x] Corregir zoom desktop para seguir cursor precisamente
- [x] Implementar arrastre de imagen en mobile
- [x] Indicadores visuales mejorados
- [x] Optimizaciones de rendimiento

## MEJORAS DE COHERENCIA VISUAL
- [x] Cambiar icono del carrito por uno profesional (ShoppingCart de lucide-react)
- [x] Rediseñar sección final "¿No encontraste lo que buscas?"
- [x] Implementar botón WhatsApp funcional (https://wa.me/573013493062)
- [x] Agregar mensaje predefinido en WhatsApp
- [x] Probar en desktop, tablet y mobile

## AJUSTES DE UBICACIÓN DE SECCIONES
- [x] Eliminar CustomizationCTA del Home
- [x] Revisar y eliminar sección actual de Shop
- [x] Crear ShopContactCTA con botones WhatsApp y Llamar
- [x] Integrar ShopContactCTA en Shop.tsx
- [x] Probar en desktop y mobile

## AUDITORÍA Y CORRECCIÓN DE NAVEGACIÓN DE PRODUCTOS
- [x] Auditar estructura de datos en Shop.tsx
- [x] Identificar productos sin imagen o rutas incorrectas
- [x] Unificar estructura de datos de todos los productos
- [x] Verificar ProductDetail.tsx tiene todos los productos
- [x] Probar navegación de TODOS los productos
- [x] Verificar que NO hay redirecciones al inicio

## RESULTADOS DE LA AUDITORÍA
✓ 28 productos totales unificados:
  - 10 Cócteles (Melodita, Mojita, Tropica, Ambaria, Limoncita, Pink Ice, Citrusita, Mielita, Berrita, Nocturna)
  - 11 Postres (Nubesita, Berryita, Blueberryta, Bluedita, Caramelita, Chococereza, Chocofresita, Fresichoco, Pinkbliss, Pistachita, Pistatella)
  - 8 Temporada (Bloomita, Blushita, Calabacita, Fallita, Glacielita, Tropicalita, Gomiblu, Oceanita)
✓ Todos los productos tienen:
  - ID único consistente (lowercase, sin espacios)
  - Imagen válida (URLs o rutas correctas)
  - Precio definido
  - Descripción automática
✓ ProductDetail.tsx sincronizado con Shop.tsx
✓ Rutas dinámicas funcionando: /product/:id
✓ 0 redirecciones incorrectas al inicio
✓ 17 tests del servidor pasando

## CORRECCIONES ESPECÍFICAS DE DISEÑO
- [x] Cambiar fondo de Burnita Lab a #fff6ea
- [x] Arreglar separación del botón "Volver a la tienda"
- [x] Probar en desktop, tablet y mobile

## PROBLEMA CRÍTICO - SUPERPOSICIÓN DE ELEMENTOS
- [x] Diagnosticar superposición entre logo y botón "Volver a la tienda"
- [x] Separar completamente Header de ProductDetail
- [x] Aplicar z-index correcto (Header z-50, Botón z-40)
- [x] Arreglar espaciado y posicionamiento (fixed top-20)
- [x] Probar en desktop y mobile

## INTEGRACIÓN WOMPI CHECKOUT
- [x] Revisar estructura del carrito y Cart.tsx
- [x] Crear hook useWompiCheckout
- [x] Integrar Wompi en Cart.tsx
- [x] Agregar validaciones y manejo de errores
- [x] Crear página de éxito CheckoutSuccess.tsx
- [x] Agregar ruta /checkout-success a App.tsx
- [x] Probar integración completa
- [x] Verificar que el botón "Finalizar compra" funciona

## CORRECCIÓN CRÍTICA - INTEGRACIÓN WOMPI
- [x] Eliminar hook useWompiCheckout.ts
- [x] Eliminar código JS manual de Wompi
- [x] Limpiar Cart.tsx completamente
- [x] Implementar widget oficial con data-render="button"
- [x] Crear página /gracias de confirmación
- [x] Remover todas las referencias a WhatsApp en checkout
- [x] Probar flujo completo sin errores

## IMPLEMENTACIÓN FINAL DE WOMPI
✓ Widget oficial de Wompi integrado
✓ Botón renderizado con data-render="button"
✓ Total dinámico en centavos
✓ Referencia única (BURNITA-timestamp)
✓ Redirección a /gracias después del pago
✓ Página de confirmación implementada
✓ 17 tests pasando
✓ Sin errores de compilación
✓ Flujo profesional: Producto → Carrito → Wompi → Confirmación


## LIMPIEZA COMPLETA Y RECONSTRUCCION DE CARRITO
- [x] Auditar y eliminar todo codigo de WhatsApp
- [x] Eliminar codigo JS manual de Wompi anterior
- [x] Reconstruir Cart.tsx completamente limpio
- [x] Implementar widget oficial con data-render=button
- [x] Verificar pagina /gracias existe y funciona
- [x] Probar flujo completo sin errores

## RESULTADO FINAL - CARRITO RECONSTRUIDO
✓ Cart.tsx completamente limpio (sin WhatsApp)
✓ Widget oficial de Wompi integrado correctamente
✓ Boton "Pagar ahora" unico y funcional
✓ Total dinamico en centavos
✓ Referencia unica (BURNITA-timestamp)
✓ Pagina /gracias de confirmacion funcional
✓ Flujo: Carrito → Pagar ahora → Wompi → /gracias
✓ 17 tests pasando sin errores
✓ Sin compilacion errors
✓ Responsive en mobile y desktop


## LIMPIEZA DE CARTPANEL - SUBCARRITO
- [x] Eliminar completamente botón de WhatsApp de CartPanel
- [x] Dejar solo botón "Ir al carrito" funcional
- [x] Probar en desktop y mobile


## CHECKOUT PROFESIONAL MULTI-PASO - NUEVA FASE

### FASE 1: ESTRUCTURA Y BOTÓN
- [x] Cambiar botón "Finalizar compra" en Cart.tsx para redirigir a /checkout
- [x] Crear ruta /checkout en App.tsx
- [x] Agregar estilos base para layout de checkout

### FASE 2: PÁGINA DE CHECKOUT
- [x] Crear client/src/pages/Checkout.tsx
- [x] Implementar layout 2 columnas (desktop) / 1 columna (mobile)
- [x] Crear formulario de envío con validación
- [x] Campos: Nombre, Apellido, Email, Teléfono, Dirección, Ciudad, Departamento, Notas
- [x] Validación de campos obligatorios

### FASE 3: SELECTOR DE ENVÍOS
- [x] Crear componente ShippingSelector
- [x] Opción 1: Envío local - 10.000 COP
- [x] Opción 2: Envío nacional - 15.000 COP
- [x] Validar que el usuario seleccione un envío
- [x] Actualizar total dinámicamente

### FASE 4: RESUMEN DEL PEDIDO
- [x] Crear componente OrderSummary
- [x] Mostrar lista de productos (nombre + cantidad)
- [x] Mostrar subtotal
- [x] Mostrar costo de envío dinámico
- [x] Mostrar total final
- [x] Actualizar en tiempo real al cambiar envío

### FASE 5: INTEGRACIÓN WOMPI
- [x] Botón "Finalizar compra" en checkout
- [x] Validar formulario + envío antes de pagar
- [x] Calcular total final en centavos
- [x] Generar referencia: BURNITA-{timestamp}
- [x] Abrir Wompi Checkout con datos correctos
- [x] Redirect a /gracias después del pago
- [x] Mostrar loading state en botón

### FASE 6: PRUEBAS Y CHECKPOINT
- [x] Probar flujo completo: Carrito → Checkout → Wompi → Gracias
- [x] Verificar validaciones funcionan
- [x] Verificar responsive en mobile/tablet/desktop
- [x] Verificar sin duplicación de scripts Wompi
- [x] Verificar sin errores en consola
- [x] Guardar checkpoint
