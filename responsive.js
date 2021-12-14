import { css } from "styled-components";

export const mid = (props) => {
  return css`
    @media only screen and (max-width: 900px) {
      ${props}
    } ;
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 700px) {
      ${props}
    } ;
  `;
};
