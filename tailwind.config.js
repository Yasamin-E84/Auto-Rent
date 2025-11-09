export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{html,js}'],
  theme: { extend: {} },
  plugins: [],
}
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'bg-[#08237D]',
    'border-[#08237D]',
    'text-[#FFB800]',
  ],
}
