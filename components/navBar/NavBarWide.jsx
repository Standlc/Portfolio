import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { mobile } from "../../responsive";
import { navBarData } from "../../data";
import SwitchThemeButton from "./SwitchThemeButton";

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.color};
  ${mobile({ display: "none" })}
`;
const Underline = styled.div`
  margin-top: 2px;
  height: 1px;
  width: 0%;
  background-color: ${(props) => props.theme.color};
  transition: width 300ms;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Language = styled.div`
  cursor: pointer;
  font-size: 15px;
  padding: 0px 15px;
  height: 40px;
  border-radius: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.transparent};
  backdrop-filter: blur(10px);
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const LinksWrapper = styled.div`
  height: 40px;
  background-color: ${(props) => props.theme.transparent};
  backdrop-filter: blur(10px);
  border-radius: 17px;
  display: flex;
  color: ${(props) => props.theme.color};
  margin-right: 20px;
`;
const Link = styled.div`
  margin: 0px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  transition: all 200ms;
  &:hover ${Underline} {
    width: 100%;
  }
`;

const NavBarWide = ({ scroll }) => {
  const { theme, toggleTheme, language, toggleLanguage } =
    useContext(ThemeContext);
  const [switched, setSwitched] = useState(false);
  const linksWrapperRef = useRef();

  const handleLanguage = () => {
    toggleLanguage();
  };
  const handleScroll = (id) => {
    let element = document.getElementById(id);
    window.scrollTo({
      top: element.getBoundingClientRect().top + scroll,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container theme={theme}>
      <Left>
        <Language theme={theme} onClick={handleLanguage}>
          {language}
        </Language>
      </Left>
      <Right ref={linksWrapperRef}>
        <LinksWrapper theme={theme}>
          {navBarData[language].map((item) => (
            <Link key={item.id} onClick={() => handleScroll(item.id)}>
              {item.title}
              <Underline theme={theme} />
            </Link>
          ))}
        </LinksWrapper>
        <SwitchThemeButton />
      </Right>
    </Container>
  );
};

export default NavBarWide;
