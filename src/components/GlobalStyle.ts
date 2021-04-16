import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body{
    min-height: 100vh;
    font-family:'Poppins', sans-serif;
    background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
}
button{
    border: none;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    background: none;
    cursor: pointer;
}
`;

export default GlobalStyle;
