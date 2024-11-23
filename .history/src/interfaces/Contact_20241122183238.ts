export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo?: string; 
    location?: { latitude: number; longitude: number }| null;
}
  