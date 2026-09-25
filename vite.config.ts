import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { execSync } from 'child_process';

// Get current git tag, fallback if git is missing (e.g. in Docker)
let gitTag = 'v0.0.0';
try {
  gitTag = execSync('git describe --tags --always').toString().trim();
} catch (e) {
  // Ignore error and use fallback or environment variable if provided
  gitTag = process.env.VITE_APP_VERSION || 'v1.0.0';
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(gitTag),
  },
});
