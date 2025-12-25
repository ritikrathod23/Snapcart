/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   myOrange: '#e85042',
    //   myRed: '#D22B2B',
    //   myGray: '#cdcbcb'
    // },
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors:{
        mycolor: '#e09c27',
        mycolornew: '#bc9146',
      }
    },
  },
  plugins: [],
});
