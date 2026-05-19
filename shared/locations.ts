// Shipping and location data for Colombia
// Controlled coverage with specific departments and cities

export const FIXED_SHIPPING_COST = 15000; // COP

export interface Department {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  departmentId: string;
}

export const DEPARTMENTS: Department[] = [
  { id: "bogota", name: "Bogotá D.C." },
  { id: "antioquia", name: "Antioquia" },
  { id: "valle", name: "Valle del Cauca" },
  { id: "atlantico", name: "Atlántico" },
  { id: "bolivar", name: "Bolívar" },
  { id: "santander", name: "Santander" },
  { id: "risaralda", name: "Risaralda" },
  { id: "quindio", name: "Quindío" },
  { id: "caldas", name: "Caldas" },
  { id: "tolima", name: "Tolima" },
  { id: "huila", name: "Huila" },
  { id: "meta", name: "Meta" },
  { id: "magdalena", name: "Magdalena" },
  { id: "cordoba", name: "Córdoba" },
  { id: "sucre", name: "Sucre" },
  { id: "cesar", name: "Cesar" },
  { id: "boyaca", name: "Boyacá" },
  { id: "narino", name: "Nariño" },
  { id: "cauca", name: "Cauca" },
  { id: "cundinamarca", name: "Cundinamarca" },
  { id: "norte_santander", name: "Norte de Santander" },
];

export const CITIES: City[] = [
  // Bogotá D.C.
  { id: "bogota-city", name: "Bogotá", departmentId: "bogota" },

  // Antioquia
  { id: "medellin", name: "Medellín", departmentId: "antioquia" },
  { id: "envigado", name: "Envigado", departmentId: "antioquia" },
  { id: "bello", name: "Bello", departmentId: "antioquia" },
  { id: "itagui", name: "Itagüí", departmentId: "antioquia" },
  { id: "sabaneta", name: "Sabaneta", departmentId: "antioquia" },
  { id: "rionegro", name: "Rionegro", departmentId: "antioquia" },

  // Valle del Cauca
  { id: "cali", name: "Cali", departmentId: "valle" },
  { id: "palmira", name: "Palmira", departmentId: "valle" },
  { id: "jamundi", name: "Jamundí", departmentId: "valle" },
  { id: "tulua", name: "Tuluá", departmentId: "valle" },

  // Atlántico
  { id: "barranquilla", name: "Barranquilla", departmentId: "atlantico" },
  { id: "soledad", name: "Soledad", departmentId: "atlantico" },
  { id: "puerto_colombia", name: "Puerto Colombia", departmentId: "atlantico" },
  { id: "malambo", name: "Malambo", departmentId: "atlantico" },

  // Bolívar
  { id: "cartagena", name: "Cartagena", departmentId: "bolivar" },
  { id: "turbaco", name: "Turbaco", departmentId: "bolivar" },
  { id: "arjona", name: "Arjona", departmentId: "bolivar" },
  { id: "magangue", name: "Magangué", departmentId: "bolivar" },

  // Santander
  { id: "bucaramanga", name: "Bucaramanga", departmentId: "santander" },
  { id: "floridablanca", name: "Floridablanca", departmentId: "santander" },
  { id: "giron", name: "Girón", departmentId: "santander" },
  { id: "piedecuesta", name: "Piedecuesta", departmentId: "santander" },

  // Risaralda
  { id: "pereira", name: "Pereira", departmentId: "risaralda" },
  { id: "dosquebradas", name: "Dosquebradas", departmentId: "risaralda" },
  { id: "santa_rosa_cabal", name: "Santa Rosa de Cabal", departmentId: "risaralda" },

  // Quindío
  { id: "armenia", name: "Armenia", departmentId: "quindio" },
  { id: "calarca", name: "Calarcá", departmentId: "quindio" },
  { id: "la_tebaida", name: "La Tebaida", departmentId: "quindio" },
  { id: "montenegro", name: "Montenegro", departmentId: "quindio" },

  // Caldas
  { id: "manizales", name: "Manizales", departmentId: "caldas" },
  { id: "chinchina", name: "Chinchiná", departmentId: "caldas" },
  { id: "villamaria", name: "Villamaría", departmentId: "caldas" },
  { id: "la_dorada", name: "La Dorada", departmentId: "caldas" },

  // Tolima
  { id: "ibague", name: "Ibagué", departmentId: "tolima" },
  { id: "espinal", name: "Espinal", departmentId: "tolima" },
  { id: "melgar", name: "Melgar", departmentId: "tolima" },
  { id: "honda", name: "Honda", departmentId: "tolima" },

  // Huila
  { id: "neiva", name: "Neiva", departmentId: "huila" },
  { id: "pitalito", name: "Pitalito", departmentId: "huila" },
  { id: "garzon", name: "Garzón", departmentId: "huila" },
  { id: "la_plata", name: "La Plata", departmentId: "huila" },

  // Meta
  { id: "villavicencio", name: "Villavicencio", departmentId: "meta" },
  { id: "acacias", name: "Acacías", departmentId: "meta" },
  { id: "granada", name: "Granada", departmentId: "meta" },
  { id: "restrepo", name: "Restrepo", departmentId: "meta" },

  // Magdalena
  { id: "santa_marta", name: "Santa Marta", departmentId: "magdalena" },
  { id: "cienaga", name: "Ciénaga", departmentId: "magdalena" },
  { id: "fundacion", name: "Fundación", departmentId: "magdalena" },
  { id: "el_banco", name: "El Banco", departmentId: "magdalena" },

  // Córdoba
  { id: "monteria", name: "Montería", departmentId: "cordoba" },
  { id: "cerete", name: "Cereté", departmentId: "cordoba" },
  { id: "lorica", name: "Lorica", departmentId: "cordoba" },
  { id: "sahagun", name: "Sahagún", departmentId: "cordoba" },

  // Sucre
  { id: "sincelejo", name: "Sincelejo", departmentId: "sucre" },
  { id: "corozal", name: "Corozal", departmentId: "sucre" },
  { id: "sampues", name: "Sampués", departmentId: "sucre" },
  { id: "tolu", name: "Tolú", departmentId: "sucre" },

  // Cesar
  { id: "valledupar", name: "Valledupar", departmentId: "cesar" },
  { id: "aguachica", name: "Aguachica", departmentId: "cesar" },
  { id: "bosconia", name: "Bosconia", departmentId: "cesar" },
  { id: "codazzi", name: "Codazzi", departmentId: "cesar" },

  // Boyacá
  { id: "tunja", name: "Tunja", departmentId: "boyaca" },
  { id: "duitama", name: "Duitama", departmentId: "boyaca" },
  { id: "sogamoso", name: "Sogamoso", departmentId: "boyaca" },
  { id: "paipa", name: "Paipa", departmentId: "boyaca" },

  // Nariño
  { id: "pasto", name: "Pasto", departmentId: "narino" },
  { id: "ipiales", name: "Ipiales", departmentId: "narino" },
  { id: "tuquerres", name: "Túquerres", departmentId: "narino" },
  { id: "la_union", name: "La Unión", departmentId: "narino" },

  // Cauca
  { id: "popayan", name: "Popayán", departmentId: "cauca" },
  { id: "santander_quilichao", name: "Santander de Quilichao", departmentId: "cauca" },
  { id: "puerto_tejada", name: "Puerto Tejada", departmentId: "cauca" },
  { id: "piendamo", name: "Piendamó", departmentId: "cauca" },

  // Cundinamarca
  { id: "soacha", name: "Soacha", departmentId: "cundinamarca" },
  { id: "chia", name: "Chía", departmentId: "cundinamarca" },
  { id: "zipaquira", name: "Zipaquirá", departmentId: "cundinamarca" },
  { id: "mosquera", name: "Mosquera", departmentId: "cundinamarca" },
  { id: "madrid", name: "Madrid", departmentId: "cundinamarca" },
  { id: "funza", name: "Funza", departmentId: "cundinamarca" },
  { id: "facatativa", name: "Facatativá", departmentId: "cundinamarca" },
  { id: "fusagasuga", name: "Fusagasugá", departmentId: "cundinamarca" },

  // Norte de Santander
  { id: "cucuta", name: "Cúcuta", departmentId: "norte_santander" },
  { id: "villa_rosario", name: "Villa del Rosario", departmentId: "norte_santander" },
  { id: "los_patios", name: "Los Patios", departmentId: "norte_santander" },
  { id: "ocana", name: "Ocaña", departmentId: "norte_santander" },
];

export function getCitiesByDepartment(departmentId: string): City[] {
  return CITIES.filter((city) => city.departmentId === departmentId);
}
