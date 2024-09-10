import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

type ManifestForPluginType = {
  registerType: "prompt"
}

const manifestForPlugin: Partial<any> = {
  registerType: 'prompt',
  includeAssets: ['favicon.io', 'apple-touc-icon.png', 'masked-icon.png'],
  manifest: {
    name: "Khel InApp",
    short_name: "Khel",
    description: "An App for sports in InApp",
    icons: [
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon'
      },
    ],
    theme_color: '#181818',
    background_color: '#e0cc3b',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)]
})

