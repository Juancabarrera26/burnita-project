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

## In Progress / Pending
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
