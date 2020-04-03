import { createGlobalStyle } from "styled-components";
import { theme } from "./themeVariables";

const GlobalStyles = createGlobalStyle`

:root {
  
  --blue: rgba(34,124,195,1);
  
}

  body {
    ${"" /* background: rgb(34,124,195); */}
     background: linear-gradient(336deg, rgba(34,124,195,1) 60%, rgba(35,58,196,1) 100%);
    color: white;
    margin:0;
    ${"" /* font-family: 'IBM Plex Sans', sans-serif; */}
    font-family: 'Baloo Da 2', cursive;   
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

ul{
  list-style: none;
margin: 0;
padding: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

h1,h2, h3, h4, h5, p {
  margin: 0;
  line-height: 1.1;
}

a, button {
  text-decoration: none;
  font-family: 'Baloo Da 2';
  color: inherit;
}



.activeNav {
    /* border-bottom: ${props => `2px solid ${props.theme.green}`}; */
    font-size: 24px;
    position: relative;    color: ${theme.green};

    a{
    color: ${theme.green};
    }
    &:after{
      content: '';
      height: 2px;
      background: ${theme.green};
      width: 110%;
      bottom: 4px;
      position: absolute;
      left: -5%;
    }
  }
`;
export default GlobalStyles;
