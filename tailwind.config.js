/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.{html,js,php}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'], // Add Inter font
      },
      colors: {
        customPurple: '#6C63FF80',
        customPurple2: '#5850DD',
        customPurple3: '#6C63FF33',
        customBlack: '#252525',
        customWwhite: '#F7F7F7',
        customWhite2: '#ffffff80',
        customGray: '#252525',
        customGray2: '#25252580',
        svgColor: "#CDCDCD",
        customRed: "#E50000",
        phColorLht: "#C3C1E5",
        phColorDrk: "#666666"
      },
      borderWidth: {
        '0.5': '0.5px',
      }
    },
    
  },
  plugins: [],
  darkMode: 'selector',
  safelist: [
    "top-4",
    "z-50",
    "rotate-180",
    "-rotate-180",
    "opacity-10",
    "text-customRed",
    "cursor-not-allowed",
    "right-8",
    "bottom-28",
    "rotate-90",
    "min-h-6",
    "min-w-6",
    // Text & Font
    'text-xl', 'text-xs', 'text-customBlack', 'text-customPurple', 'text-customGray2',
    'text-customWhite2', 'dark:text-customWwhite', 'dark:text-customBlack',
    'dark:peer-checked:text-customWhite2', 'peer-checked:text-customGray2',
    'line-through', 'hover:text-customPurple2', 'text-svgColor',
    // Layout & Sizing
    'h-max', 'w-full', 'min-w-fit', 'min-h-8', 'gap-5', 'gap-6',
    'gap-3', 'px-4', 'ml-5', 'mt-10', 'max-w-96', 'w-2', 'w-5', 'w-96', 'h-4', 'h-5',
    // Flexbox & Grid
    'flex', 'items-center', 'justify-between', 'justify-center', 'peer', 'peer-checked',
    'peer-checked:bg-customPurple', 'grid', 'place-items-center',
    // Borders
    'border', 'border-0.5', 'border-customPurple', 'rounded-sm',
    // Transitions
    'transform', 'transition-all', 'transition', 'duration-500', 'duration-75',
    'hover:duration-75', 'rotate-45',
    // Positioning
    'absolute', 'relative', 'top-px', '-top-4', 'left-2', 'right-0',
    // Custom Utilities
    'text-customPurple2', 'text-customWwhite', 'text-customGray2',
    'dark:text-customWhite2', 'dark:text-customBlack',
    'dark:peer-checked:text-customWhite2', 'peer-checked:bg-customPurple',
    'border-customWwhite', 'border-customBlack', 'hover:text-customRed',
    "border-t-0", "border-r-2", "border-b-2", "border-l-0", "visible", "invisible",
    "scale-0", "peer-checked:scale-100", "line-through", "peer-checked:line-through",
    "border-customBlack", "dark:border-customBlack", "right-5", "md:right-10", "lg:right-16",
    "-right-3", "md:right-3", "lg:right-9", "bottom-14", "md:bottom-28", "lg:bottom-28"
  ]
}


