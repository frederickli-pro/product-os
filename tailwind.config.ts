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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Vista Primary Blues - Deep, Professional Navy Spectrum
        'vista-navy': {
          DEFAULT: '#0D2847',
          50: '#E8F0FA',
          100: '#C5D8EF',
          200: '#9FBFE3',
          300: '#6A9CD3',
          400: '#3D7AC2',
          500: '#1E3A5F',
          600: '#172B4D',
          700: '#0D2847',
          800: '#091B33',
          900: '#050E1A',
        },
        // Vista Blue - Primary Action Color
        'vista-blue': {
          DEFAULT: '#0052CC',
          50: '#E6F0FF',
          100: '#B3D4FF',
          200: '#80B8FF',
          300: '#4D9CFF',
          400: '#1A80FF',
          500: '#0052CC',
          600: '#0047B3',
          700: '#003D99',
          800: '#003380',
          900: '#002966',
        },
        // Vista Teal - Accent & Highlights
        'vista-teal': {
          DEFAULT: '#00B8D9',
          50: '#E6FBFF',
          100: '#B3F3FF',
          200: '#80EBFF',
          300: '#4DE3FF',
          400: '#1ADBFF',
          500: '#00B8D9',
          600: '#00A3C2',
          700: '#008EAA',
          800: '#007993',
          900: '#00647B',
        },
        // Vista Green - Success States
        'vista-green': {
          DEFAULT: '#36B37E',
          50: '#E9F9F2',
          100: '#C7F0DC',
          200: '#A3E7C6',
          300: '#7FDEAF',
          400: '#5BD599',
          500: '#36B37E',
          600: '#2E9A6C',
          700: '#268159',
          800: '#1E6847',
          900: '#164F35',
        },
        // Vista Yellow - Warning States (WCAG AA compliant)
        'vista-yellow': {
          DEFAULT: '#B38600',
          50: '#FFF8E6',
          100: '#FFEBB3',
          200: '#FFDE80',
          300: '#FFD14D',
          400: '#FFC41A',
          500: '#D99E00',
          600: '#C28D00',
          700: '#8C6600',
          800: '#704F00',
          900: '#4D3600',
        },
        // Vista Red - Error States
        'vista-red': {
          DEFAULT: '#FF5630',
          50: '#FFF0EC',
          100: '#FFD6CC',
          200: '#FFBCAB',
          300: '#FFA28B',
          400: '#FF886A',
          500: '#FF5630',
          600: '#E64D2A',
          700: '#CC4425',
          800: '#B33B1F',
          900: '#99321A',
        },
        // Vista Slate - Neutral Text & Backgrounds
        'vista-slate': {
          DEFAULT: '#7A869A',
          50: '#FAFBFC',
          100: '#F4F5F7',
          200: '#EBECF0',
          300: '#DFE1E6',
          400: '#C1C7D0',
          500: '#7A869A',
          600: '#6B778C',
          700: '#5E6C84',
          800: '#505F79',
          900: '#42526E',
        },
        // Semantic colors using CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // Vista uses a refined sans-serif system
        sans: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Fira Code',
          'monospace',
        ],
      },
      fontSize: {
        // Vista typography scale
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.005em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.005em' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em' }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'vista': '0.625rem',
      },
      boxShadow: {
        'vista-sm': '0 1px 2px 0 rgba(13, 40, 71, 0.05)',
        'vista': '0 1px 3px 0 rgba(13, 40, 71, 0.08), 0 1px 2px -1px rgba(13, 40, 71, 0.08)',
        'vista-md': '0 4px 6px -1px rgba(13, 40, 71, 0.08), 0 2px 4px -2px rgba(13, 40, 71, 0.08)',
        'vista-lg': '0 10px 15px -3px rgba(13, 40, 71, 0.08), 0 4px 6px -4px rgba(13, 40, 71, 0.08)',
        'vista-xl': '0 20px 25px -5px rgba(13, 40, 71, 0.1), 0 8px 10px -6px rgba(13, 40, 71, 0.08)',
        'vista-glow': '0 0 20px rgba(0, 184, 217, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backgroundImage: {
        'vista-gradient': 'linear-gradient(135deg, #0D2847 0%, #1E3A5F 50%, #2B5A8A 100%)',
        'vista-gradient-light': 'linear-gradient(135deg, #E8F0FA 0%, #F4F5F7 100%)',
        'vista-accent-gradient': 'linear-gradient(90deg, #00B8D9 0%, #36B37E 100%)',
        'vista-mesh': 'radial-gradient(at 40% 20%, rgba(0, 184, 217, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(54, 179, 126, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0, 82, 204, 0.06) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};
export default config;
