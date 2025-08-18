module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        darkGreen: '#03624c',
        darkMain: '#030f0f',
        darkAccent: '#00df82',
        // Light mode colors
        lightTan: '#d2b48c', // tan
        lightMain: '#ffffff',
        lightGold: '#ffd700',
        // For text
        textLight: '#1e293b',
        textDark: '#f1f5f9',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}; 