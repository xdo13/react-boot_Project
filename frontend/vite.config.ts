import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 포트번호 변경
  },
  test:{
    setupFiles: ['./src/testSetup.ts'],
    globals: true,
    environment: 'jsdom',
  }
})