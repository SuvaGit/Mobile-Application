# MeroGhar Mobile Application

A complete Expo Router mobile application with a React Native frontend and Firebase backend.

## Included features

- Login, signup, logout, and password reset
- Protected routes
- Property dashboard
- Search and Rent/Buy filters
- Property details
- Add property form
- Image picker and Firebase Storage upload
- Safe posting fallback: a listing is still saved when Storage is unavailable
- Cloud Firestore property database
- Saved/favourite properties
- User profile
- My Properties and delete function
- Six built-in example properties with photos and complete details
- Example properties remain visible with or without Firebase
- Demo mode that works before Firebase is configured

## 1. Open the correct folder

Unzip the downloaded project. In VS Code, select **File > Open Folder** and open only the `MeroGharComplete` folder.

## 2. Install packages

```bash
npm install
```

## 3. Run immediately in demo mode

```bash
npx expo start -c
```

Use the prefilled login:

- Email: `demo@meroghar.com`
- Password: `123456`

Without Firebase configuration, authentication, properties, and favourites use local demo storage. This lets you test every screen first.

## 4. Connect Firebase for the real backend

1. Open Firebase Console and create a project named **MeroGhar**.
2. Add a **Web App** inside the Firebase project.
3. In Authentication, enable **Email/Password**.
4. Create a **Cloud Firestore** database.
5. Enable **Firebase Storage**.
6. Copy `.env.example` to a new file named `.env`.
7. Paste the values from your Firebase Web App configuration into `.env`.

Example:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

Restart Expo after changing `.env`:

```bash
npx expo start -c
```

## 5. Add security rules

Copy the contents of `firestore.rules` into Firebase Console > Firestore Database > Rules.

Copy the contents of `storage.rules` into Firebase Console > Storage > Rules.

You can also deploy them using Firebase CLI after connecting the project:

```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules,storage
```

## Important

- Do not paste Firebase Admin private keys into this app.
- Firebase Web App configuration is used in `.env`.
- Do not upload `.env` publicly. It is ignored by Git.
- The project targets Expo SDK 54 so it works with the physical-device Expo Go flow used by the StickerSmash tutorial.


## Built-in property examples

The Home and Search pages always include these demonstration listings:

- 2BHK Apartment — New Baneshwor, Kathmandu — Rs. 25,000/month
- Family House — Jawalakhel, Lalitpur — Rs. 55,000/month
- Furnished Single Room — Suryabinayak, Bhaktapur — Rs. 8,000/month
- Modern House for Sale — Lakeside, Pokhara — Rs. 18,500,000
- 3BHK Family Apartment — Boudha, Kathmandu — Rs. 40,000/month
- Residential House with Parking — Bharatpur, Chitwan — Rs. 12,500,000

These examples are bundled in `constants/sample-properties.ts`. Firestore properties are displayed together with them.
