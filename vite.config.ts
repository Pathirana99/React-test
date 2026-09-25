import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { execSync } from 'child_process';

// Get current git tag, fallback to 'v0.0.0' if no tags exist
const gitTag = execSync('git describe --tags --always').toString().trim();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(gitTag),
  }
});
