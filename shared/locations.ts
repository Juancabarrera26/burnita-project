// Shipping and location data for Colombia

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
  { id: "cundinamarca", name: "Cundinamarca" },
  { id: "santander", name: "Santander" },
];

export const CITIES: City[] = [
  // Bogotá D.C.
  { id: "bogota-city", name: "Bogotá", departmentId: "bogota" },

  // Antioquia
  { id: "medellin", name: "Medellín", departmentId: "antioquia" },
  { id: "envigado", name: "Envigado", departmentId: "antioquia" },
  { id: "bello", name: "Bello", departmentId: "antioquia" },

  // Valle del Cauca
  { id: "cali", name: "Cali", departmentId: "valle" },
  { id: "palmira", name: "Palmira", departmentId: "valle" },

  // Atlántico
  { id: "barranquilla", name: "Barranquilla", departmentId: "atlantico" },
  { id: "soledad", name: "Soledad", departmentId: "atlantico" },

  // Cundinamarca
  { id: "soacha", name: "Soacha", departmentId: "cundinamarca" },
  { id: "chia", name: "Chía", departmentId: "cundinamarca" },

  // Santander
  { id: "bucaramanga", name: "Bucaramanga", departmentId: "santander" },
  { id: "floridablanca", name: "Floridablanca", departmentId: "santander" },
];

export function getCitiesByDepartment(departmentId: string): City[] {
  return CITIES.filter((city) => city.departmentId === departmentId);
}
