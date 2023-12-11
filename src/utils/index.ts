// Función para generar un ID único
export const generateID = (): string => {
  // Verificar si estamos en un entorno con objeto 'window' definido y con soporte para URL
  if (typeof window !== 'undefined' && window.URL && window.URL.createObjectURL) {
    // Crear un objeto URL y extraer los últimos 36 caracteres como ID
    return window.URL.createObjectURL(new Blob([])).slice(-36);
  } else {
    // Si no hay soporte, proporcionar un ID de respaldo
    return 'fallback-id';
  }
};

// Función para pausar la ejecución durante un período de tiempo dado
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
