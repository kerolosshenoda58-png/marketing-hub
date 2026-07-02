import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params'; // If this file fails on non-base44 environments

// Ensure it doesn't crash your build if appParams are missing on Vercel/Netlify
const appId = import.meta.env.VITE_BASE44_APP_ID || appParams?.appId;
const appBaseUrl = import.meta.env.VITE_BASE44_APP_BASE_URL || appParams?.appBaseUrl;

export const base44 = createClient({
  appId,
  token: import.meta.env.VITE_BASE44_TOKEN || appParams?.token,
  functionsVersion: appParams?.functionsVersion || 'v1',
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});