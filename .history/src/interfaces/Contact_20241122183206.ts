export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo?: string; 
    address?: { latitude: number; longitude: number }| null;
}
  