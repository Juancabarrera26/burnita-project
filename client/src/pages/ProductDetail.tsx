import { useLocation, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ChevronLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import ImageZoom from '@/components/ImageZoom';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

// Función para generar IDs consistentemente (igual que en Shop.tsx)
const generateProductId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

// TODOS los productos de la tienda - UNIFICADO CON SHOP.TSX
const PRODUCTS: Product[] = [
  // CÓCTELES
  { id: 'melodita', name: 'Melodita', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/rMmHBSviZqJUEakl.webp' },
  { id: 'mojita', name: 'Mojita', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/CZamKEhNVDpNpvdU.webp' },
  { id: 'tropica', name: 'Tropica', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/KtCXNCkEisgWrviL.webp' },
  { id: 'ambaria', name: 'Ambaria', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/IPeSKSvvXNaAfAxq.webp' },
  { id: 'limoncita', name: 'Limoncita', price: 50000, image: '/manus-storage/Limoncita_3d1ea23f.png' },
  { id: 'pink-ice', name: 'Pink Ice', price: 50000, image: '/manus-storage/pinkice_d65d2436.png' },
  { id: 'citrusita', name: 'Citrusita', price: 50000, image: '/manus-storage/Citrusita_96447f19.png' },
  { id: 'mielita', name: 'Mielita', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/jKdkhnkfHJcSkDfU.webp' },
  { id: 'berrita', name: 'Berrita', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/lsfgucvuDBbOBRtl.webp' },
  { id: 'nocturna', name: 'Nocturna', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/cAdqkYKtZbuNJjwA.webp' },
  
  // POSTRES
  { id: 'nubesita', name: 'Nubesita', price: 55000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/eLfUhTdnLWLCwiNF.webp' },
  { id: 'berryita', name: 'Berryita', price: 55000, image: '/manus-storage/Berryita_488db945.png' },
  { id: 'blueberryta', name: 'Blueberryta', price: 55000, image: '/manus-storage/Blueberryta_cde230b4.png' },
  { id: 'bluedita', name: 'Bluedita', price: 55000, image: '/manus-storage/Bluedita_da4978fa.png' },
  { id: 'caramelita', name: 'Caramelita', price: 55000, image: '/manus-storage/Caramelita_e6e32a07.png' },
  { id: 'chococereza', name: 'Chococereza', price: 55000, image: '/manus-storage/Chococereza_0c1358b4.png' },
  { id: 'chocofresita', name: 'Chocofresita', price: 55000, image: '/manus-storage/Chocofresita_54d25d94.png' },
  { id: 'fresichoco', name: 'Fresichoco', price: 55000, image: '/manus-storage/Fresichoco_68badba4.png' },
  { id: 'pinkbliss', name: 'Pinkbliss', price: 55000, image: '/manus-storage/Pinkbliss_9b5671b3.png' },
  { id: 'pistachita', name: 'Pistachita', price: 55000, image: '/manus-storage/Pistachita_8f981d5e.png' },
  { id: 'pistatella', name: 'Pistatella', price: 55000, image: '/manus-storage/Pistatella_e821cdce.png' },
  
  // TEMPORADA - UNIFICADO CON SHOP.TSX
  { id: 'bloomita', name: 'Bloomita', price: 55000, image: '/manus-storage/Bloomita_2f71182b.png' },
  { id: 'blushita', name: 'Blushita', price: 55000, image: '/manus-storage/Blushita_cf50ab14.png' },
  { id: 'calabacita', name: 'Calabacita', price: 55000, image: '/manus-storage/Calabacita_7109f1e9.png' },
  { id: 'fallita', name: 'Fallita', price: 55000, image: '/manus-storage/Fallita_c4a5c704.png' },
  { id: 'glacielita', name: 'Glacielita', price: 55000, image: '/manus-storage/Glacielita_93ff393b.png' },
  { id: 'tropicalita', name: 'Tropicalita', price: 55000, image: '/manus-storage/tropicalita_4cce5374.png' },
  { id: 'gomiblu', name: 'Gomiblu', price: 55000, image: '/manus-storage/Gomiblu_6241f980.jpg' },
  { id: 'oceanita', name: 'Oceanita', price: 55000, image: '/manus-storage/Oceanita_6ffb6b29.jpg' },
];

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  'Melodita': 'Una sinfonía de sabores en cada llama. Melodita es una vela que combina aromas cítricos con notas dulces, perfecta para crear una atmósfera romántica y sofisticada. Ideal para regalar o disfrutar en momentos especiales.',
  'Mojita': 'Frescura tropical en tu hogar. Mojita captura la esencia del cóctel clásico con notas de menta y lima. Una vela refrescante que transforma cualquier espacio en un oasis de relajación.',
  'Mielita': 'Calidez y dulzura envueltas en luz. Mielita irradia un aroma cálido y reconfortante que evoca la miel pura. Perfecta para crear ambientes acogedores y memorables.',
  'Berrita': 'Explosión de frutos del bosque. Berrita combina aromas de frutos silvestres con toques florales. Una vela que despierta los sentidos y llena tu espacio de vitalidad.',
  'Tropica': 'Aventura tropical en cada parpadeo. Tropica mezcla aromas exóticos de frutas tropicales con notas cálidas. Transforma tu hogar en un paraíso tropical.',
  'Nocturna': 'Misterio y serenidad bajo las estrellas. Nocturna es una vela profunda con aromas oscuros y sofisticados. Ideal para noches especiales y momentos de introspección.',
  'Ambaria': 'Lujo y elegancia en forma de vela. Ambaria brilla con aromas ámbar y dorados que crean una atmósfera de lujo. Perfecta para ocasiones especiales.',
  'Limoncita': 'Energía y frescura en cada instante. Limoncita es una explosión de cítricos que ilumina cualquier espacio. Una vela revitalizante para empezar el día con optimismo.',
  'Pink Ice': 'Sofisticación fría y cautivadora. Pink Ice combina aromas frescos con toques florales rosados. Una vela moderna y elegante para espacios contemporáneos.',
  'Citrusita': 'Vibrante mezcla de cítricos. Citrusita es una vela energética que combina naranja, limón y pomelo. Perfecta para espacios que necesitan vitalidad y frescura.',
  'Nubesita': 'Dulce como una nube. Nubesita es un postre aromático que evoca algodón de azúcar y caramelo. Una vela que crea momentos dulces y memorables.',
  'Berryita': 'Frutos rojos en su máxima expresión. Berryita combina aromas de fresa, frambuesa y arándano. Una vela que despierta la alegría y la vitalidad.',
  'Blueberryta': 'Profundidad azul de arándanos. Blueberryta es una vela que evoca la dulzura del arándano silvestre. Perfecta para momentos de relajación.',
  'Bluedita': 'Frescura azulada y sofisticada. Bluedita combina notas de arándano con toques florales. Una vela moderna y elegante.',
  'Caramelita': 'Dulzura caramelizada en cada llama. Caramelita es una vela que evoca el aroma del caramelo casero. Perfecta para crear ambientes acogedores.',
  'Chococereza': 'Lujo de chocolate y cereza. Chococereza combina aromas de chocolate oscuro con notas de cereza. Una vela sofisticada y deliciosa.',
  'Chocofresita': 'Contraste perfecto de chocolate y fresa. Chocofresita es una vela que mezcla lo dulce del chocolate con la frescura de la fresa.',
  'Fresichoco': 'Fresa y chocolate en armonía. Fresichoco es una vela que celebra la combinación clásica de fresa y chocolate.',
  'Pinkbliss': 'Dicha rosa en forma de vela. Pinkbliss combina aromas florales con toques dulces. Una vela romántica y sofisticada.',
  'Pistachita': 'Sofisticación verde del pistacho. Pistachita es una vela que evoca el aroma del pistacho tostado. Perfecta para espacios elegantes.',
  'Pistatella': 'Elegancia de pistacho con toques florales. Pistatella es una vela que combina pistacho con notas delicadas.',
  'Bloomita': 'Floración de primavera en cada llama. Bloomita es una vela que captura la esencia de las flores de primavera.',
  'Blushita': 'Sonrojo de primavera. Blushita es una vela que evoca los tonos rosados de la primavera.',
  'Calabacita': 'Calidez de otoño. Calabacita es una vela que celebra la temporada de calabaza y especias cálidas.',
  'Fallita': 'Espíritu del otoño. Fallita combina aromas de hojas secas, canela y especias otoñales.',
  'Glacielita': 'Frescura invernal cristalina. Glacielita es una vela que evoca la pureza del hielo y la nieve.',
  'Tropicalita': 'Paraíso tropical en temporada. Tropicalita es una vela que trae aromas exóticos y tropicales.',
  'Gomiblu': 'Diversión azul de gominolas. Gomiblu es una vela que evoca la dulzura de los caramelos gominola.',
  'Oceanita': 'Profundidad marina. Oceanita es una vela que captura la esencia del océano y la brisa marina.',
};

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  // Buscar producto
  useEffect(() => {
    if (!id) {
      setLocation('/shop');
      return;
    }
    const foundProduct = PRODUCTS.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      const desc = PRODUCT_DESCRIPTIONS[foundProduct.name] || 
        `Descubre la magia de ${foundProduct.name}, una vela artesanal diseñada para crear momentos especiales.`;
      setDescription(desc);
      setLoading(false);
    } else {
      setLocation('/shop');
    }
  }, [id, setLocation]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-guayaba mx-auto mb-4"></div>
          <p className="text-charcoal font-body">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="text-center">
          <p className="text-charcoal font-body mb-4">Producto no encontrado</p>
          <button
            onClick={() => setLocation('/shop')}
            className="text-guayaba hover:text-guayaba/80 font-display font-bold"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema">
      {/* Botón "Volver a la tienda" - SEPARADO DEL HEADER */}
      <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
        <div className="container max-w-6xl">
          <button
            onClick={() => setLocation('/shop')}
            className="pointer-events-auto flex items-center gap-2 text-charcoal hover:text-guayaba transition-colors font-body text-base font-medium px-4 py-2 rounded-lg hover:bg-charcoal/5 active:bg-charcoal/10 focus:outline-none focus:ring-2 focus:ring-guayaba/50"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver a la tienda
          </button>
        </div>
      </div>

      {/* Contenido principal con padding superior */}
      <div className="pt-24 md:pt-28 py-8 md:py-12">
        <div className="container max-w-6xl">

        {/* Grid: Imagen + Detalles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Imagen con Zoom */}
          <div className="flex items-center justify-center">
            <ImageZoom src={product.image} alt={product.name} />
          </div>

          {/* Detalles del Producto */}
          <div className="flex flex-col justify-start">
            {/* Nombre y Precio */}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-2">
              {product.name}
            </h1>
            <p className="font-display text-3xl font-bold text-guayaba mb-6">
              ${product.price.toLocaleString()}
            </p>

            {/* Descripción */}
            <p className="font-body text-charcoal/70 text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Selector de Cantidad */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-body text-charcoal font-medium">Cantidad:</span>
              <div className="flex items-center border border-charcoal/20 rounded-full">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-crema/50 transition-colors"
                >
                  <Minus className="w-5 h-5 text-charcoal" />
                </button>
                <span className="px-6 py-2 font-body font-bold text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-crema/50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-charcoal" />
                </button>
              </div>
            </div>

            {/* Botón Agregar al Carrito */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className={`w-full mb-4 font-body font-bold rounded-full py-6 text-lg transition-all ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-guayaba text-white hover:bg-guayaba/90'
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {addedToCart ? '¡Agregado al carrito!' : 'Agregar al carrito'}
            </Button>

            {/* Mensaje de éxito */}
            {addedToCart && (
              <p className="text-center text-green-600 font-body font-medium text-sm">
                Producto agregado correctamente
              </p>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
