import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/themeContext";
import styled from "styled-components";

const SwitchContainer = styled.div`
  cursor: pointer;
  padding: 3px;
  width: 42px;
  height: 23px;
  z-index: 999;
  background-color: ${(props) =>
    props.theme.name === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"};
  backdrop-filter: blur(10px);
  border-radius: 50px;
`;
const Switch = styled.div`
  height: 23px;
  width: 23px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.background};
  transition: all 400ms;
  transform: ${(props) =>
    props.switched ? "translateX(18px)" : "translateX(0)"};
`;

const SwitchThemeButton = () => {
  const { theme, toggleTheme, language, toggleLanguage } =
    useContext(ThemeContext);
  const [switched, setSwitched] = useState(false);

  const handleSwitch = () => {
    setSwitched(!switched);
    toggleTheme();
  };

  return (
    <SwitchContainer switched={switched} theme={theme} onClick={handleSwitch}>
    <Switch theme={theme} switched={switched} />
  </SwitchContainer>
  );
};

export default SwitchThemeButton;
