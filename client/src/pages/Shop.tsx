/**
 * Shop Page - BURNITA
 * Tienda completa con categorías y grid de productos
 * Organización: Hero + Categorías + Grid de Productos
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// Datos de productos por categoría
const categories = [
  {
    id: "cocktails",
    name: "Cócteles",
    title: "Cócteles de Velas",
    description: "Velas con forma de cócteles realistas",
    basePrice: 45000,
    products: [
      {
        id: 1,
        name: "Nube de Fresa",
        material: "Cera de Soya Natural",
        price: 28000,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/eLfUhTdnLWLCwiNF.webp",
        bgColor: "bg-lavanda/30",
      },
      {
        id: 2,
        name: "Sandía Sunset",
        material: "Cera de Soya Natural",
        price: 32000,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/rMmHBSviZqJUEakl.webp",
        bgColor: "bg-mango/20",
      },
      {
        id: 4,
        name: "Mojito Verde",
        material: "Cera de Soya Natural",
        price: 30000,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/CZamKEhNVDpNpvdU.webp",
        bgColor: "bg-guayaba/15",
      },
      {
        id: 9,
        name: "Tropical Vibes",
        material: "Cera de Soya Natural",
        price: 45000,
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-cocteles-1-XHYqBd79kqkFebMnYRDMq6.webp",
        bgColor: "bg-mint/20",
      },
    ],
  },
  {
    id: "desserts",
    name: "Postres",
    title: "Postres de Velas",
    description: "Velas con crema tipo postre (cupcakes, helados, etc)",
    basePrice: 50000,
    products: [
      {
        id: 3,
        name: "Miel Dorada",
        material: "Cera de Soya Natural",
        price: 26000,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/jKdkhnkfHJcSkDfU.webp",
        bgColor: "bg-crema",
      },
      {
        id: 5,
        name: "Frutos del Bosque",
        material: "Cera de Soya Natural",
        price: 29000,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/lsfgucvuDBbOBRtl.webp",
        bgColor: "bg-mango/30",
      },
      {
        id: 10,
        name: "Cupcake Deluxe",
        material: "Cera de Soya Natural",
        price: 50000,
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-postres-1-5p9s85mtmntxVUKM86Z5TS.webp",
        bgColor: "bg-guayaba/20",
      },
      {
        id: 11,
        name: "Helado Soñado",
        material: "Cera de Soya Natural",
        price: 48000,
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-postres-1-5p9s85mtmntxVUKM86Z5TS.webp",
        bgColor: "bg-lavanda/20",
      },
    ],
  },
  {
    id: "seasonal",
    name: "Temporada",
    title: "Velas de Temporada",
    description: "Colección especial con aromas y diseños de temporada",
    basePrice: 42000,
    products: [
      {
        id: 7,
        name: "Océano Nocturno",
        material: "Cera de Soya Natural",
        price: 31000,
        image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/cAdqkYKtZbuNJjwA.webp",
        bgColor: "bg-mint/30",
      },
      {
        id: 17,
        name: "Invierno Mágico",
        material: "Cera de Soya Natural",
        price: 42000,
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-temporada-1.webp",
        bgColor: "bg-mint/20",
      },
      {
        id: 18,
        name: "Primavera Floreciente",
        material: "Cera de Soya Natural",
        price: 40000,
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-temporada-2.webp",
        bgColor: "bg-guayaba/15",
      },
      {
        id: 19,
        name: "Verano Tropical",
        material: "Cera de Soya Natural",
        price: 44000,
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663322164465/HN47as722N9RjKfuaYrPPg/vela-temporada-3.webp",
        bgColor: "bg-mango/20",
      },
    ],
  },
];

// Componente ProductCard
function ProductCard({ product }: { product: (typeof categories[0]["products"])[0] }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className={`${product.bgColor} rounded-2xl p-6 mb-4 overflow-hidden relative h-64 flex items-center justify-center`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-lg font-bold text-charcoal">{product.name}</h3>
        <p className="font-body text-sm text-charcoal/60">{product.material}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-xl font-bold text-guayaba">
            ${product.price.toLocaleString()}
          </span>
          <button className="p-2 rounded-full bg-guayaba/10 text-guayaba hover:bg-guayaba hover:text-white transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Componente CategorySection
function CategorySection({ category }: { category: (typeof categories)[0] }) {
  return (
    <section className="py-16 md:py-20 px-4">
      <div className="container">
        {/* Título de categoría */}
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
            {category.title}
          </h2>
          <p className="font-body text-charcoal/70 text-lg">
            {category.description}
          </p>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Shop() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 md:pt-32">
        {/* Hero de la tienda */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-guayaba/5 via-white to-mint/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
                Tienda de Velas Artesanales
              </h1>
              <p className="font-body text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto">
                Descubre nuestra colección de velas hiperrealistas hechas a mano. Cada vela es una obra de arte única.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Secciones de categorías */}
        {categories.map((category, index) => (
          <div key={category.id} className={index % 2 === 0 ? "bg-white" : "bg-crema/50"}>
            <CategorySection category={category} />
          </div>
        ))}

        {/* CTA final */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-guayaba to-mint">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              ¿No encontraste lo que buscas?
            </h2>
            <p className="font-body text-white/90 text-lg mb-8">
              Contáctanos para crear una vela personalizada especialmente para ti.
            </p>
            <button className="px-8 py-3 bg-white text-guayaba font-display font-bold rounded-full hover:bg-crema transition-colors">
              Contactar
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
