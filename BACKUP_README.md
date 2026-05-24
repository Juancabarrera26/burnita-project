# Burnita - Tienda de Velas Artesanales

## Backup Completo del Proyecto

Este es un backup COMPLETO y FUNCIONAL del proyecto Burnita. Contiene todo el código fuente, configuración, assets y documentación necesaria para ejecutar, desarrollar y desplegar la aplicación.

---

## 📋 Contenido del Backup

### Frontend (React 19 + Tailwind 4 + Vite)
- ✅ Páginas: Home, Shop, Colecciones, Nosotros, Contacto, Términos y Condiciones, Política de Privacidad, FAQ
- ✅ Componentes: Header, Footer, Carruseles, Formularios, Checkout
- ✅ Burnita Lab: Sistema completo de personalización de velas
- ✅ Carrito de compras con persistencia
- ✅ Checkout con cobertura de envíos (21 departamentos)
- ✅ Responsive design completo
- ✅ Animaciones y transiciones suaves

### Backend (Express 4 + tRPC 11)
- ✅ Endpoints tRPC para todas las operaciones
- ✅ Autenticación OAuth con Manus
- ✅ Sistema de generación de imágenes (Midjourney/API)
- ✅ Lógica de Burnita Lab (personalización de velas)
- ✅ Webhooks para pagos (Wompi)
- ✅ Gestión de órdenes y carrito

### Base de Datos
- ✅ Schema Drizzle ORM completo
- ✅ Tablas: usuarios, productos, órdenes, carrito, etc.
- ✅ Migraciones preparadas

### Configuración
- ✅ Vite config con HMR
- ✅ TypeScript config
- ✅ Tailwind CSS 4 config
- ✅ Drizzle config
- ✅ ESLint y Prettier config

### Assets
- ✅ Logo Burnita
- ✅ Hero video (video rosado con vela)
- ✅ Imágenes de productos (9 velas en carrusel)
- ✅ Íconos y decoraciones
- ✅ Fondos y texturas

---

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js 22.13.0 o superior
- npm o pnpm
- MySQL/TiDB (base de datos)

### Pasos de Instalación

1. **Clonar o extraer el proyecto**
   ```bash
   cd burnita-shop
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env.local` en la raíz del proyecto con:
   
   ```
   DATABASE_URL=mysql://user:password@host:port/database
   JWT_SECRET=your_jwt_secret
   VITE_APP_ID=your_oauth_app_id
   OAUTH_SERVER_URL=https://oauth.manus.im
   VITE_OAUTH_PORTAL_URL=https://login.manus.im
   OWNER_NAME=Your Name
   OWNER_OPEN_ID=your_open_id
   BUILT_IN_FORGE_API_URL=https://api.manus.im
   BUILT_IN_FORGE_API_KEY=your_api_key
   VITE_FRONTEND_FORGE_API_KEY=your_frontend_key
   VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
   VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
   VITE_ANALYTICS_WEBSITE_ID=your_website_id
   VITE_APP_TITLE=Burnita - Tienda de Velas Artesanales
   VITE_APP_LOGO=https://your-cdn.com/logo.png
   ```

4. **Configurar base de datos**
   ```bash
   pnpm db:push
   ```

5. **Ejecutar en desarrollo**
   ```bash
   pnpm dev
   ```
   
   La aplicación estará disponible en `http://localhost:3000`

---

## 🏗️ Estructura del Proyecto

```
burnita-shop/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── pages/                  # Páginas principales
│   │   │   ├── Home.tsx            # Página de inicio
│   │   │   ├── Shop.tsx            # Tienda de productos
│   │   │   ├── Checkout.tsx        # Checkout y finalizar compra
│   │   │   ├── ExploreLab.tsx      # Burnita Lab (personalización)
│   │   │   ├── TerminosYCondiciones.tsx
│   │   │   ├── PoliticaPrivacidad.tsx
│   │   │   └── FAQ.tsx
│   │   ├── components/             # Componentes reutilizables
│   │   │   ├── Header.tsx          # Navbar con scroll behavior
│   │   │   ├── Footer.tsx
│   │   │   ├── Products.tsx        # Carrusel de velas
│   │   │   ├── BurnitaLab.tsx      # Sección del Lab
│   │   │   ├── Categories.tsx      # Colecciones
│   │   │   ├── About.tsx           # Sección Nosotros
│   │   │   └── ...otros componentes
│   │   ├── lib/
│   │   │   └── trpc.ts            # Cliente tRPC
│   │   ├── _core/
│   │   │   └── hooks/
│   │   │       └── useAuth.ts     # Hook de autenticación
│   │   ├── App.tsx                # Router principal
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Estilos globales
│   ├── public/                     # Assets estáticos
│   │   ├── favicon.ico
│   │   └── robots.txt
│   └── index.html
│
├── server/                         # Backend Express + tRPC
│   ├── routers.ts                 # Procedimientos tRPC
│   ├── db.ts                      # Helpers de base de datos
│   ├── storage.ts                 # Funciones S3
│   ├── _core/
│   │   ├── context.ts             # Contexto tRPC
│   │   ├── oauth.ts               # Autenticación OAuth
│   │   ├── imageGeneration.ts     # Generación de imágenes
│   │   ├── llm.ts                 # Integración LLM
│   │   ├── notification.ts        # Notificaciones
│   │   ├── map.ts                 # Integración Google Maps
│   │   └── index.ts               # Servidor Express
│   └── auth.logout.test.ts        # Tests de ejemplo
│
├── drizzle/                       # Base de datos
│   ├── schema.ts                  # Definición de tablas
│   ├── relations.ts               # Relaciones entre tablas
│   └── migrations/                # Migraciones
│
├── shared/                        # Código compartido
│   ├── types.ts                   # Tipos TypeScript
│   ├── locations.ts               # Cobertura de envíos
│   └── const.ts                   # Constantes
│
├── package.json                   # Dependencias
├── vite.config.ts                 # Configuración Vite
├── tsconfig.json                  # Configuración TypeScript
├── tailwind.config.ts             # Configuración Tailwind
├── drizzle.config.ts              # Configuración Drizzle
└── vitest.config.ts               # Configuración tests
```

---

## 🎨 Características Principales

### 1. **Tienda de Velas**
- Catálogo de 9 velas artesanales
- Carrusel interactivo con scroll infinito
- Filtrado por colecciones (Cócteles, Postres, Temporada, Recordatorios, Corporativo)
- Carrito de compras persistente

### 2. **Burnita Lab - Personalización**
- Selector de tipo de vela (Cóctel, Postre, Temporada, Recordatorio, Corporativo)
- Multi-selección de colores
- Selección de aroma
- Selección de decoración
- Generación de imagen AI en tiempo real
- Precios dinámicos según tipo

### 3. **Checkout y Compra**
- Formulario de envío con validación
- Selector dinámico de departamento → ciudad (21 departamentos)
- Sistema de cobertura de envíos
- Integración con Wompi para pagos
- Resumen del pedido en tiempo real

### 4. **Autenticación**
- OAuth con Manus
- Gestión de sesiones
- Protección de rutas

### 5. **Diseño Premium**
- Navbar transparente en hero, sólido al scroll
- Responsive design completo
- Animaciones suaves
- Paleta de colores Burnita (rosa, beige, colores vibrantes)

---

## 🔧 Comandos Disponibles

```bash
# Desarrollo
pnpm dev                    # Inicia servidor de desarrollo

# Build
pnpm build                  # Compila para producción

# Base de datos
pnpm db:push               # Sincroniza schema con BD

# Testing
pnpm test                  # Ejecuta tests con Vitest

# Formateo
pnpm format                # Formatea código con Prettier

# Linting
pnpm lint                  # Ejecuta ESLint
```

---

## 🖼️ Generación de Imágenes (Burnita Lab)

### Ubicación del Código
- **Frontend**: `client/src/pages/ExploreLab.tsx`
- **Backend**: `server/routers.ts` (procedimiento `candle.generate`)
- **Generador**: `server/_core/imageGeneration.ts`

### Cómo Funciona
1. Usuario selecciona: tipo, colores, aroma, decoración
2. Frontend envía datos al servidor
3. Servidor construye prompt personalizado
4. API de generación crea imagen
5. Imagen se muestra en el frontend

### Editar Prompts
El prompt se construye en `server/routers.ts` en la función `candle.generate`:

```typescript
const prompt = `Ultra realistic handcrafted Burnita candle inspired by ${type}...`
```

Modificar este texto para cambiar el estilo de generación.

---

## 💳 Integración de Pagos (Wompi)

### Webhooks
- Endpoint: `/api/webhooks/wompi`
- Recibe eventos de transacciones
- Actualiza estado de órdenes

### Configuración
- API Key: Variable de entorno `WOMPI_API_KEY`
- Merchant Code: Variable de entorno `WOMPI_MERCHANT_CODE`

---

## 📊 Base de Datos

### Tablas Principales
- **users**: Usuarios registrados
- **products**: Catálogo de velas
- **orders**: Órdenes completadas
- **cart_items**: Carrito de compras
- **sessions**: Sesiones de usuario

### Migraciones
```bash
pnpm db:push    # Aplica cambios de schema
```

---

## 🌐 Despliegue

### En Manus (Recomendado)
1. Crear proyecto en Manus
2. Conectar repositorio GitHub
3. Configurar variables de entorno
4. Manus despliega automáticamente

### En Otros Servidores
1. Hacer build: `pnpm build`
2. Subir carpeta `dist/` a servidor
3. Configurar variables de entorno
4. Ejecutar: `node dist/index.js`

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
- Ejecutar: `pnpm install`
- Verificar imports en archivos

### Error: "Database connection failed"
- Verificar `DATABASE_URL` en `.env.local`
- Asegurar que la BD está corriendo

### Error: "Image generation failed"
- Verificar `BUILT_IN_FORGE_API_KEY`
- Verificar cuota de generación disponible

### Navbar duplicado
- Ya está corregido en esta versión
- Header global en `App.tsx`
- No hay Headers duplicados en páginas internas

---

## 📝 Notas Importantes

- **Assets**: Imágenes de productos se cargan desde CDN (no locales)
- **Estilos**: Tailwind 4 con OKLCH colors
- **Autenticación**: OAuth con Manus (no usuario/contraseña)
- **Precios**: Fijos por tipo de vela
- **Envíos**: Cobertura limitada a 21 departamentos colombianos

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisar logs en `.manus-logs/`
2. Verificar console del navegador (F12)
3. Revisar variables de entorno
4. Contactar a soporte de Manus

---

## 📄 Licencia

Proyecto privado de Burnita. Todos los derechos reservados.

---

**Versión del Backup**: 2026-05-20
**Última Actualización**: 2026-05-20
**Estado**: ✅ Funcional y Completo
