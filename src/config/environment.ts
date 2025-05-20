// Environment configuration

// Base API URL - defaults to local development but can be overridden in production
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Authentication configs
export const AUTH_TOKEN_KEY = 'sb-kbzfhuaofkdndgwlvagv-auth-token';
export const USER_STORAGE_KEY = 'sb-kbzfhuaofkdndgwlvagv-user';

// Supabase config - Use environment variables if available, otherwise fallback to development values
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://kbzfhuaofkdndgwlvagv.supabase.co";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiemZodWFvZmtkbmRnd2x2YWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjM5MTMsImV4cCI6MjA2MzIzOTkxM30.KIiABuxLuvKRF46njW7lLC9Ee7hzUJi-9A2-14LSIw8";

// Other environment variables
export const isProd = import.meta.env.PROD;
export const isDev = import.meta.env.DEV;

// App version
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Optional: Analytics ID
export const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID;
