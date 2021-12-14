import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { mid } from "../../responsive";
import NavBarSmall from "./NavBarSmall";
import NavBarWide from "./NavBarWide";

const Container = styled.div`
  position: relative;
  width: calc(100% - 80px);
  height: 70px;
  padding: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transition: all 500ms;
  ${mid({ height: "70px" })}
`;

const NavBar = ({
  screen,
  scroll,
}) => {
  const { theme } = useContext(ThemeContext);
  const containerRef = useRef();
  // useEffect(() => {
  //   if (
  //     projectsRef.current.getBoundingClientRect().top <= 0 &&
  //     projectsRef.current.getBoundingClientRect().top >=
  //       -1 * projectsRef.current.getBoundingClientRect().height
  //   ) {
  // containerRef.current.style.backgroundColor = theme.transparent;
  // containerRef.current.style.backdropFilter = "blur(3px)";
  //   } else {
  //     containerRef.current.style.backgroundColor = "transparent";
  //     containerRef.current.style.backdropFilter = "blur(0px)";
  //   }
  // }, [scroll, theme]);

  return (
    <Container ref={containerRef} theme={theme}>
      <NavBarWide scroll={scroll} screen={screen} />
      <NavBarSmall scroll={scroll} screen={screen} />
    </Container>
  );
};

export default NavBar;
