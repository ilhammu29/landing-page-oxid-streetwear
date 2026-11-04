import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        matte: {
          black: "#0a0a0c",
          dark: "#121214",
          card: "#18181b",
          elevated: "#202024",
          border: "#27272a",
        },
        milk: {
          DEFAULT: "#f5f5f0",
          white: "#faf9f6",
          muted: "#a1a1aa",
          faint: "#52525b",
        },
        neon: {
          DEFAULT: "#00ff66",
          bright: "#10ff70",
          glow: "rgba(0, 255, 102, 0.4)",
          dark: "#00b347",
        },
      },
      fontFamily: {
        display: [
          'Syne',
          'Space Grotesk',
          'Inter',
          '-apple-system',
          'sans-serif',
        ],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        tech: [
          'Space Grotesk',
          'Inter',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'monospace',
        ],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 102, 0.35)',
        'neon-strong': '0 0 35px rgba(0, 255, 102, 0.65)',
        'matte': '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        neonPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(0,255,102,0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(0,255,102,0.8))' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        neonPulse: 'neonPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
