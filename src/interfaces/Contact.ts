export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo?: string; // Ruta de la imagen (puede ser local o de la galería)
    address?: { latitude: number; longitude: number }| null;
}
  