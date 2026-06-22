export function friendlyFirebaseError(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: string }).code)
      : '';

  const messages: Record<string, string> = {
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/missing-password': 'Enter your password.',
    'auth/weak-password': 'Password must contain at least 6 characters.',
    'auth/email-already-in-use': 'An account already exists with this email.',
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/user-not-found': 'No account was found with this email.',
    'auth/wrong-password': 'The email or password is incorrect.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
    'auth/network-request-failed': 'Check your internet connection and try again.',
    'permission-denied': 'Firebase rules blocked this action. Check your Firestore or Storage rules.',
    'storage/unauthorized': 'Firebase Storage rules blocked the image upload.',
    'storage/retry-limit-exceeded': 'The image upload timed out. Please try again.',
  };

  return messages[code] ?? (error instanceof Error ? error.message : 'Something went wrong. Please try again.');
}
