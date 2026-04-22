import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ChevronLeft, Plus, Minus, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

const PRODUCTS: Product[] = [
  // Cócteles
  { id: 'melodita', name: 'Melodita', price: 50000, image: '/manus-storage/Melodita_url.png' },
  { id: 'mojita', name: 'Mojita', price: 50000, image: '/manus-storage/Mojita_url.png' },
  { id: 'mielita', name: 'Mielita', price: 50000, image: '/manus-storage/Mielita_url.png' },
  { id: 'berrita', name: 'Berrita', price: 50000, image: '/manus-storage/Berrita_url.png' },
  { id: 'tropica', name: 'Tropica', price: 50000, image: '/manus-storage/Tropica_url.png' },
  { id: 'nocturna', name: 'Nocturna', price: 50000, image: '/manus-storage/Nocturna_url.png' },
  { id: 'ambaria', name: 'Ambaria', price: 50000, image: '/manus-storage/Ambaria_url.png' },
  { id: 'limoncita', name: 'Limoncita', price: 50000, image: '/manus-storage/Limoncita_url.png' },
  { id: 'pinkice', name: 'Pink Ice', price: 50000, image: '/manus-storage/PinkIce_url.png' },
  { id: 'citrusita', name: 'Citrusita', price: 50000, image: '/manus-storage/Citrusita_url.png' },
  
  // Postres
  { id: 'nubesita', name: 'Nubesita', price: 55000, image: '/manus-storage/Nubesita_url.png' },
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff6ea] py-8 px-4">
      {/* Header con botón atrás */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => setLocation('/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver a la tienda
        </button>
      </div>

      {/* Contenedor principal */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Imagen izquierda */}
        <div className="flex items-center justify-center bg-white rounded-lg p-8 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>

        {/* Información derecha */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Nombre */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
          </div>

          {/* Precio */}
          <div className="text-3xl font-bold text-[#d946a6]">
            {product.price.toLocaleString('es-CO')} COP
          </div>

          {/* Descripción */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Descripción</h3>
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed">{description}</p>
            )}
          </div>

          {/* Selector de cantidad */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Cantidad:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 hover:bg-gray-100 transition"
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
              <span className="px-4 py-2 font-semibold text-gray-900">{quantity}</span>
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
            className="w-full bg-[#d946a6] hover:bg-[#c0368a] text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {addedToCart ? '¡Agregado al carrito!' : 'Agregar al carrito'}
          </Button>

          {/* Feedback visual */}
          {addedToCart && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center text-green-700">
              Producto agregado correctamente
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
