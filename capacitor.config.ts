import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4e7b2e8274b641d6af00a8458c066486',
  appName: 'QuoteApp - Daily Inspiration',
  webDir: 'dist',
  server: {
    url: 'https://4e7b2e82-74b6-41d6-af00-a8458c066486.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e1b4b',
      showSpinner: false
    }
  }
};

export default config;