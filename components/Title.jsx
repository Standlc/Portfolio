import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";
import {useParallax } from "../hooks";
import { mid, mobile } from "../responsive";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  background-color: ${(props) => props.theme.background};
`;
const Container = styled.div`
  width: calc(100% - 80px);
  max-width: 1000px;
  padding: 40px;
  overflow: hidden;
  /* background-color: blueviolet; */
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 90px;
  transform-origin: center;
  transition: all 500ms;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color};
  opacity: 0.7;
  ${mid({ fontSize: "100px" })}
  ${mobile({ fontSize: "70px" })}
`;
const Line = styled.div`
  height: 1px;
  flex: 1;
  margin-left: 40px;
  background-color: ${(props) => props.theme.mid};
  transform-origin: left;
`;

const ProjectsTitle = ({ scroll, screen }) => {
  const { theme, language } = useContext(ThemeContext);
  const container = useRef();
  const titleRef = useRef();
  const lineRef = useRef();

  const [start, during, end, opacity] = useParallax(
    screen,
    lineRef,
    scroll,
    0,
    1,
    0.1,
    "top"
  );
  useEffect(() => {
    if (start) {
      lineRef.current.style.transform = `scale(0)`;
    } else if (during) {
      lineRef.current.style.transform = `scale(${opacity} , 1)`;
    } else {
      lineRef.current.style.transform = `scale(1)`;
    }
  }, [start, during, end, opacity]);

  // const isVisible = useElementOnScreen(screen, titleRef, scroll, 0);
  // useEffect(() => {
  //   isVisible
  //     ? (titleRef.current.style.transform = "translateY(0)")
  //     : (titleRef.current.style.transform = "translateY(100%)");
  // }, [scroll]);

  return (
    <Wrapper theme={theme}>
      <Container ref={container}>
        <Title ref={titleRef} theme={theme}>
          {language === "EN" ? "/Projects" : "/Projets"}
          <Line theme={theme} ref={lineRef} width="70vw" />
        </Title>
      </Container>
    </Wrapper>
  );
};

export default ProjectsTitle;
