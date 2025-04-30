module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          dark: '#182628',         // тёмный фон / текст
          primary: '#65CCB8',      // основной акцент
          secondary: '#57BA98',    // вторичный акцент
          tertiary: '#3B945E',     // дополнительный акцент
          light: '#F2F2F2',        // светлый фон
        },
      },
    },
    plugins: [
      require('flowbite/plugin'),
      require('@tailwindcss/forms')
    ],
  }