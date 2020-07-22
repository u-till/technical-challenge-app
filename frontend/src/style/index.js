import { createGlobalStyle } from "styled-components";
import { rem } from "polished";

export const GlobalStyle = createGlobalStyle`

    * {
    margin: 0;
    padding: 0;
    font-size: ${rem("16px")};
    /* font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;      */
    font-family: Roboto, sans-serif;
    box-sizing: border-box;
    }
    button:focus {
    outline: 0;
    }
    body {
        background-color: #f2f2f2;
    }
    /* The emerging W3C standard
   that is currently Firefox-only */
* {
  scrollbar-width: thin;
  scrollbar-color: #bdbdbd #fff;
  }

/* Works on Chrome/Edge/Safari */
  *::-webkit-scrollbar {
  width: 10px;
}
*::-webkit-scrollbar-track {
  background: rgba(0,0,0,0);;
}
*::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
  //border-radius: 5px;
  border: 0px solid #ffffff ;
}
`;

export const theme = {};
