// Environment configuration

// Base API URL - defaults to local development but can be overridden in production
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Authentication configs
export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_STORAGE_KEY = 'user';

// Other environment variables
export const isProd = import.meta.env.PROD;
export const isDev = import.meta.env.DEV;

// App version
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Optional: Analytics ID
export const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID;
