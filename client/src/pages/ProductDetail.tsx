import { useParams } from 'wouter';
import { useLocation } from 'wouter';
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

// Todos los productos de la tienda
const PRODUCTS: Product[] = [
  // Cócteles
  { id: 'melodita', name: 'Melodita', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/rMmHBSviZqJUEakl.webp' },
  { id: 'mojita', name: 'Mojita', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/CZamKEhNVDpNpvdU.webp' },
  { id: 'tropica', name: 'Tropica', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/KtCXNCkEisgWrviL.webp' },
  { id: 'ambaria', name: 'Ambaria', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/IPeSKSvvXNaAfAxq.webp' },
  { id: 'limoncita', name: 'Limoncita', price: 50000, image: '/manus-storage/Limoncita_3d1ea23f.png' },
  { id: 'pink-ice', name: 'Pink Ice', price: 50000, image: '/manus-storage/Pinklce_aa3310ee.png' },
  { id: 'citrusita', name: 'Citrusita', price: 50000, image: '/manus-storage/Citrusita_96447f19.png' },
  { id: 'mielita', name: 'Mielita', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/jKdkhnkfHJcSkDfU.webp' },
  { id: 'berrita', name: 'Berrita', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/lsfgucvuDBbOBRtl.webp' },
  { id: 'nocturna', name: 'Nocturna', price: 50000, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663322164465/cAdqkYKtZbuNJjwA.webp' },
  
  // Postres
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
  
  // Temporada
  { id: 'bloomita', name: 'Bloomita', price: 55000, image: '/manus-storage/Bloomita_2f71182b.png' },
  { id: 'blushita', name: 'Blushita', price: 55000, image: '/manus-storage/Blushita_a8c0d3e2.png' },
  { id: 'calabacita', name: 'Calabacita', price: 55000, image: '/manus-storage/Calabacita_f5e9c1b7.png' },
  { id: 'fallita', name: 'Fallita', price: 55000, image: '/manus-storage/Fallita_d2b4a9f1.png' },
  { id: 'floralita', name: 'Floralita', price: 55000, image: '/manus-storage/Floralita_c3e7f2a8.png' },
  { id: 'frostita', name: 'Frostita', price: 55000, image: '/manus-storage/Frostita_b1d6e4f9.png' },
  { id: 'holidayita', name: 'Holidayita', price: 55000, image: '/manus-storage/Holidayita_e5c2a9d3.png' },
  { id: 'winterita', name: 'Winterita', price: 55000, image: '/manus-storage/Winterita_a7f1c8e2.png' },
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
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  // Buscar producto
  useEffect(() => {
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
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff6ea] flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-guayaba"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fff6ea] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Botón atrás */}
        <button
          onClick={() => setLocation('/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver a la tienda
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen del producto con zoom */}
          <div className="flex items-center justify-center">
            <ImageZoom
              src={product.image}
              alt={product.name}
              className="w-full max-w-md"
            />
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-guayaba">
                {product.price.toLocaleString('es-CO')} COP
              </p>
            </div>

            {/* Descripción */}
            <p className="text-gray-700 leading-relaxed text-lg">
              {description}
            </p>

            {/* Selector de cantidad */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-semibold">Cantidad:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-gray-100 transition"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <span className="px-4 py-2 font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Botón agregar al carrito */}
            <Button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2 ${
                addedToCart
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-guayaba hover:bg-[#c0368a] text-white'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {addedToCart ? '✓ Agregado al carrito' : 'Agregar al carrito'}
            </Button>

            {/* Info adicional */}
            <div className="bg-white rounded-lg p-4 text-sm text-gray-600">
              <p>✓ Envío disponible a toda Colombia</p>
              <p>✓ Vela artesanal de alta calidad</p>
              <p>✓ Garantía de satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
