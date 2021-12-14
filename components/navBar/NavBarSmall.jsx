import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { mobile } from "../../responsive";
import { navBarData } from "../../data";
import SwitchThemeButton from "./SwitchThemeButton";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;
  ${mobile({ display: "flex" })}
`;
const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  position: fixed;
  z-index: 99;
  height: calc(100vh);
  width: 100%;
  background-color: ${(props) => props.theme.background};
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 400ms;
`;
const Underline = styled.div`
  margin-top: 3px;
  height: 1px;
  width: 0%;
  background-color: ${(props) => props.theme.color};
  transition: all 300ms;
`;
const Link = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  letter-spacing: 3px;
  margin: 5vh;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
  &:hover ${Underline} {
    width: 100%;
  }
  transform: translateY(${(props) => (props.showNav ? 0 : "15px")});
  transition: all 500ms;
`;
const Menu = styled.div`
  height: 20px;
  width: ${(props) => (props.showNav ? "19px" : "27px")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 999;
  padding: 15px;
  border-radius: 17px;
  background-color: ${(props) => props.theme.transparent};
  backdrop-filter: blur(10px);
  transition: width 400ms;
`;
const MenuComponent = styled.div`
  height: 1px;
  width: 27px;
  background-color: ${(props) => props.theme.color};
  transform: ${(props) =>
    props.showNav
      ? props.top
        ? "rotate(45deg)"
        : "rotate(-45deg)"
      : "rotate(0deg)"};
  transform-origin: left;
  transition: transform 400ms;
`;

const NavBarSmall = ({ screen, scroll }) => {
  const { theme, toggleTheme, language, toggleLanguage } =
    useContext(ThemeContext);
  const [showNav, setShowNav] = useState(false);
  const linksWrapperRef = useRef();

  const handleOpenNav = () => {
    setShowNav(!showNav);
    if (showNav) {
      linksWrapperRef.current.style.opacity = 0;
      linksWrapperRef.current.style.pointerEvents = "none";
    } else {
      linksWrapperRef.current.style.opacity = 1;
      linksWrapperRef.current.style.pointerEvents = "auto";
    }
  };
  useEffect(() => {
    if (screen.width > 900) {
      setShowNav(false);
      linksWrapperRef.current.style.opacity = 0;
      linksWrapperRef.current.style.pointerEvents = "none";
    }
  }, [screen]);

  const handleScroll = (id) => {
    handleOpenNav();
    let element = document.getElementById(id);
    window.scrollTo({
      top: element.getBoundingClientRect().top + scroll,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Wrapper theme={theme}>
      <Menu showNav={showNav} theme={theme} onClick={handleOpenNav}>
        <MenuComponent theme={theme} top showNav={showNav} />
        <MenuComponent theme={theme} showNav={showNav} />
      </Menu>
      <LinksWrapper theme={theme} ref={linksWrapperRef}>
        {navBarData[language].map((item) => (
          <Link
            key={item.id}
            showNav={showNav}
            onClick={() => handleScroll(item.id)}
            theme={theme}
          >
            {item.title}
            <Underline theme={theme} />
          </Link>
        ))}
      </LinksWrapper>
      <SwitchThemeButton />
    </Wrapper>
  );
};

export default NavBarSmall;
