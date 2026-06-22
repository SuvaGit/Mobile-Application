import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '@/services/firebase';

export async function uploadPropertyImage(ownerId: string, imageUri: string): Promise<string> {
  if (!storage) return imageUri;

  const response = await fetch(imageUri);
  const blob = await response.blob();
  const extension = imageUri.split('.').pop()?.split('?')[0] || 'jpg';
  const imageRef = ref(storage, `property-images/${ownerId}/${Date.now()}.${extension}`);
  await uploadBytes(imageRef, blob, { contentType: blob.type || 'image/jpeg' });
  return getDownloadURL(imageRef);
}
