export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    isConfigured: Boolean(import.meta.env.VITE_OPENAI_API_KEY && 
                         import.meta.env.VITE_OPENAI_API_KEY !== 'your_openai_api_key_here'),
  },
} as const;