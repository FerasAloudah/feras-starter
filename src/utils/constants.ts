export const __DEV__ = process.env.NODE_ENV === 'development';
export const __TEST__ = process.env.NODE_ENV === 'test';
export const __PROD__ = process.env.NODE_ENV === 'production';
export const __SERVER__ = typeof window === 'undefined';
export const __BROWSER__ = typeof window !== 'undefined';
