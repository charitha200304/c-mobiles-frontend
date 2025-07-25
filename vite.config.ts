import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';

type ViteEnv = {
  VITE_API_URL?: string;
  VITE_APP_ENV?: string;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '') as ViteEnv;

  // Only expose specific environment variables that start with VITE_
  const processEnv = Object.entries(env).reduce((acc, [key, val]) => {
    if (key.startsWith('VITE_')) {
      acc[`import.meta.env.${key}`] = JSON.stringify(val);
    }
    return acc;
  }, {} as Record<string, any>);

  processEnv['process.env.NODE_ENV'] = JSON.stringify(mode);

  return {
    define: processEnv,
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@view': path.resolve(__dirname, 'src/view'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    server: {
      port: 5173,
      strictPort: false,
      open: true,
      host: true,
      hmr: {
        clientPort: 5173,
        protocol: 'ws',
        host: 'localhost',
        path: '/ws',
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: mode !== 'production',
    },
  };
});