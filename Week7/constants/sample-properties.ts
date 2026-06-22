import { Property } from '@/types';

/**
 * Built-in example listings shown on the Home and Search screens.
 * These stay visible even when Firebase is connected, so the app never opens
 * with an empty property dashboard during a demonstration.
 */
export const sampleProperties: Property[] = [
  {
    id: 'sample-kathmandu-apartment',
    ownerId: 'sample-owner-1',
    ownerName: 'MeroGhar Verified Owner',
    title: '2BHK Apartment',
    description:
      'Bright and clean 2BHK apartment suitable for a small family. It includes a spacious living room, modular kitchen, balcony, reliable water supply, and easy access to public transport, schools, hospitals, and grocery stores.',
    location: 'New Baneshwor, Kathmandu',
    city: 'Kathmandu',
    price: 25000,
    listingType: 'Rent',
    category: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    phone: '9800000001',
    imageUrl:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fit=crop&w=1200&q=80&fm=jpg',
    createdAtMillis: Date.now() - 1000,
  },
  {
    id: 'sample-lalitpur-house',
    ownerId: 'sample-owner-2',
    ownerName: 'MeroGhar Verified Owner',
    title: 'Family House',
    description:
      'Spacious family house in a peaceful residential area. The property offers four bedrooms, three bathrooms, private parking, a balcony, a small garden, and convenient access to the Ring Road, schools, and shopping areas.',
    location: 'Jawalakhel, Lalitpur',
    city: 'Lalitpur',
    price: 55000,
    listingType: 'Rent',
    category: 'House',
    bedrooms: 4,
    bathrooms: 3,
    phone: '9800000002',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=1200&q=80&fm=jpg',
    createdAtMillis: Date.now() - 2000,
  },
  {
    id: 'sample-bhaktapur-room',
    ownerId: 'sample-owner-3',
    ownerName: 'MeroGhar Verified Owner',
    title: 'Furnished Single Room',
    description:
      'Affordable furnished room ideal for a student or working professional. The room has a bed, cupboard, study table, internet access, regular water supply, and a quiet neighbourhood.',
    location: 'Suryabinayak, Bhaktapur',
    city: 'Bhaktapur',
    price: 8000,
    listingType: 'Rent',
    category: 'Room',
    bedrooms: 1,
    bathrooms: 1,
    phone: '9800000003',
    imageUrl:
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?fit=crop&w=1200&q=80&fm=jpg',
    createdAtMillis: Date.now() - 3000,
  },
  {
    id: 'sample-pokhara-house',
    ownerId: 'sample-owner-4',
    ownerName: 'MeroGhar Verified Owner',
    title: 'Modern House for Sale',
    description:
      'Modern two-storey house with mountain views, a private garden, parking space, open kitchen, large living area, and five bedrooms. The property is located close to Lakeside while remaining in a quiet neighbourhood.',
    location: 'Lakeside, Pokhara',
    city: 'Pokhara',
    price: 18500000,
    listingType: 'Buy',
    category: 'House',
    bedrooms: 5,
    bathrooms: 4,
    phone: '9800000004',
    imageUrl:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?fit=crop&w=1200&q=80&fm=jpg',
    createdAtMillis: Date.now() - 4000,
  },
  {
    id: 'sample-boudha-apartment',
    ownerId: 'sample-owner-5',
    ownerName: 'MeroGhar Verified Owner',
    title: '3BHK Family Apartment',
    description:
      'Comfortable 3BHK apartment with two bathrooms, a sunny balcony, lift access, security, and reserved parking. It is suitable for a family looking for a convenient location near Boudha and Chabahil.',
    location: 'Boudha, Kathmandu',
    city: 'Kathmandu',
    price: 40000,
    listingType: 'Rent',
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    phone: '9800000005',
    imageUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?fit=crop&w=1200&q=80&fm=jpg',
    createdAtMillis: Date.now() - 5000,
  },
  {
    id: 'sample-bharatpur-house',
    ownerId: 'sample-owner-6',
    ownerName: 'MeroGhar Verified Owner',
    title: 'Residential House with Parking',
    description:
      'Well-maintained residential house with three bedrooms, two bathrooms, a large kitchen, terrace, and parking for one car. The property is close to the highway, hospital, and local market.',
    location: 'Bharatpur-10, Chitwan',
    city: 'Bharatpur',
    price: 12500000,
    listingType: 'Buy',
    category: 'House',
    bedrooms: 3,
    bathrooms: 2,
    phone: '9800000006',
    imageUrl:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?fit=crop&w=1200&q=80&fm=jpg',
    createdAtMillis: Date.now() - 6000,
  },
];
