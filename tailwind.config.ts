import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Atheryon Brand System (canonical colours)
        // Token Authority: This is the single source of truth for colours
        'warm': {
          50: '#F7F6F3',   // Background Off-White (canonical)
          100: '#F7F6F3',  // Background Off-White
          200: '#E6E9ED',  // Warm Grey Light (canonical)
          300: '#E6E9ED',  // Warm Grey Light
          400: '#A7B0B8',  // Warm Grey Mid (canonical)
        },
        // Atheryon brand colors
        'brand': {
          orange: '#FF9900',       // Atheryon Orange (canonical)
          'orange-light': '#FFB833',
          blue: '#0A84FF',         // Atheryon Blue (canonical)
          'blue-light': '#4BC0FF',
          dark: '#0A1A2F',         // Deep Navy (canonical)
        },
        'navy': {
          900: '#0A1A2F',  // Deep Navy (canonical)
          800: '#1B2942',
        },
        'atheryon': {
          blue: '#0A84FF',         // Atheryon Blue (canonical)
          'blue-light': '#4BC0FF',
        },
        // Neutral text colors (mapped to brand)
        'neutral': {
          900: '#0A1A2F',  // Deep Navy - headlines
          800: '#0A1A2F',  // Deep Navy - body text
          700: '#0A1A2F',  // Deep Navy
          600: '#6B7280',  // Warm Grey Mid - secondary text
          500: '#A7B0B8',  // Warm Grey Mid - captions
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Social Grow typography scale
        'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-lg': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subheading': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.7', letterSpacing: '0.02em', fontWeight: '400' }],
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'wide': '0.02em',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      animation: {
        'slide-up-fade': 'slideUpFade 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        // Atheryon warm gradients (using canonical colours)
        'gradient-warm': 'linear-gradient(180deg, #F7F6F3 0%, #E6E9ED 100%)',
        'gradient-warm-reverse': 'linear-gradient(180deg, #E6E9ED 0%, #F7F6F3 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(247,246,243,0.8) 0%, rgba(230,233,237,0.9) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'soft': '0 2px 4px rgba(0,0,0,0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 14px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 6px 20px rgba(0, 0, 0, 0.15)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
export default config
