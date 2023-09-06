const { nextui } = require('@nextui-org/react')

// Configuración del tema claro

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#101F44',
        darkBlue2: '#000033',
        dark: '#10002B',
        darkPurple: '#240046',
        pink: '#e0aaff',
        pink1: '#5a189a',
        pink2: '#240046',
        black1: 'rgba(0, 0, 0, 0.8)',
        black2: '#03071e'
      }
    },
    screens: {
      xs: { max: '639px' },
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        'darkMode': {
          extend: 'dark',
          colors: {
            background: 'rgba(0, 0, 0, 0.8)',
            foreground: '#ffffff',
            primary: {
              500: '#333333',
              foreground: '#F0F0F0'
            },
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px'
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px'
            },
            lineHeight: {
              small: '20px',
              medium: '24px',
              large: '32px'
            },
          }
        }
      }
    })
  ]
}
