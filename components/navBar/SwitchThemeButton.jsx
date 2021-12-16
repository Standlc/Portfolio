import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/themeContext";
import styled from "styled-components";

const Container = styled.div`
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  background-color: ${(props) => props.theme.transparent};
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 999;
`;
const SwitchWrapper = styled.div`
  cursor: pointer;
  padding: 2px;
  width: 22px;
  position: relative;
  height: 22px;
  background-color: ${(props) =>
    props.theme.name === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)"};
  border-radius: 50px;
  transform: ${(props) => (props.switched ? "rotate(180deg)" : "")};
  transition: transform cubic-bezier(0.4, 0, 0, 1) 700ms, background-color cubic-bezier(0.4, 0, 0, 1) 700ms;
`;
const Switch = styled.div`
  height: 22px;
  position: absolute;
  right: 2px;
  width: 11px;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
  background-color: ${(props) =>
    props.theme.name === "dark" ? "rgba(0,0,0,0.9)" : " rgba(255,255,255,0.9)"};
  transition: background-color cubic-bezier(0.4, 0, 0, 1) 700ms;
`;

// const SwitchWrapper = styled.div`
//   cursor: pointer;
//   padding: 3px;
//   width: 42px;
//   height: 23px;
//   z-index: 999;
//   background-color: ${(props) =>
//     props.theme.name === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
//   backdrop-filter: blur(10px);
//   box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.4);
//   border-radius: 50px;
//   border: 1px solid gray;
// `;
// const Switch = styled.div`
//   height: 23px;
//   width: 23px;
//   border-radius: 50%;
//   background-color: ${(props) =>
//     props.theme.name === "dark" ? "rgba(0,0,0,0.6)" : " rgba(255,255,255,0.7)"};
//   transition: all 400ms;
//   box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.4),
//     -1px -1px 2px 0px rgba(255, 255, 255, 0.2);
//   transform: ${(props) =>
//     props.switched ? "translateX(18px)" : "translateX(0)"};
// `;

const SwitchThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [switched, setSwitched] = useState(false);

  const handleSwitch = () => {
    setSwitched(!switched);
    toggleTheme();
  };

  return (
    <Container theme={theme}>
      <SwitchWrapper switched={switched} theme={theme} onClick={handleSwitch}>
        <Switch theme={theme} switched={switched} />
      </SwitchWrapper>
    </Container>
  );
};

export default SwitchThemeButton;
