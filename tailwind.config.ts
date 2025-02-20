/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#ed5323",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'highlight': 'slideUnderline 2s ease-in-out infinite',
        'highlight-delay': 'slideUnderline 2s ease-in-out 1s infinite',
        'bounce-1': 'bounce 3s infinite',
        'bounce-2': 'bounce 3s infinite 1.5s',
      },
      keyframes: {
        'blob-bounce': {
          '0%': {
            transform: 'translate(-100%, -100%) translate3d(0, 0, 0)',
          },
          '25%': {
            transform: 'translate(-100%, -100%) translate3d(100%, 0, 0)',
          },
          '50%': {
            transform: 'translate(-100%, -100%) translate3d(100%, 100%, 0)',
          },
          '75%': {
            transform: 'translate(-100%, -100%) translate3d(0, 100%, 0)',
          },
          '100%': {
            transform: 'translate(-100%, -100%) translate3d(0, 0, 0)',
          },
        },
        slideUnderline: {
          '0%': {
            transform: 'scaleX(0)',
            transformOrigin: 'left',
          },
          '50%': {
            transform: 'scaleX(1)',
            transformOrigin: 'left',
          },
          '50.1%': {
            transform: 'scaleX(1)',
            transformOrigin: 'right',
          },
          '100%': {
            transform: 'scaleX(0)',
            transformOrigin: 'right',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
