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
- [ ] Probar envío de emails en navegador (manual testing)
