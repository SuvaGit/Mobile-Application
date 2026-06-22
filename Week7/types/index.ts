export type ListingType = 'Rent' | 'Buy';
export type PropertyCategory = 'Room' | 'Apartment' | 'House';

export type AppUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  isDemo?: boolean;
};

export type Property = {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  description: string;
  location: string;
  city: string;
  price: number;
  listingType: ListingType;
  category: PropertyCategory;
  bedrooms: number;
  bathrooms: number;
  phone: string;
  imageUrl?: string | null;
  createdAtMillis: number;
};

export type NewPropertyInput = Omit<Property, 'id' | 'ownerId' | 'ownerName' | 'imageUrl' | 'createdAtMillis'>;
