import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";
import { useParallax } from "../hooks";

const Container = styled.div`
  height: 50vh;
  width: 100%;
  background-color: ${(props) => props.theme.mid};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.background};
`;
const Wrapper = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  max-width: 1000px;
  padding: 40px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.color};
  font-weight: 500;
  font-size: 90px;
  opacity: 0.7;
  display: flex;
  align-items: center;
`;
const Line = styled.div`
  height: 1px;
  flex: 1;
  margin-right: 40px;
  background-color: ${(props) => props.theme.mid};
  transform-origin: right;
`;

const About2 = ({ screen, scroll }) => {
  const { theme } = useContext(ThemeContext);
  const containerRef = useRef();
  const lineRef = useRef();
  const bgRef = useRef();

  //BACKGROUND
  const [startBg, duringBg, endBg, opacityBg] = useParallax(
    screen,
    containerRef,
    scroll,
    0,
    0.8,
    0.1,
    "top"
  );
  useEffect(() => {
    if (startBg) {
      bgRef.current.style.transform = `scale(0.8)`;
      bgRef.current.style.borderRadius = `100px`;
    } else if (duringBg) {
      bgRef.current.style.transform = `scale(${opacityBg / 5 + 0.8})`;
      bgRef.current.style.borderRadius = 100 - opacityBg * 100 + "px";
    } else {
      bgRef.current.style.transform = `scale(1)`;
      bgRef.current.style.borderRadius = `0px`;
    }
  }, [startBg, duringBg, endBg, opacityBg]);

  //LINE
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

  return (
    <Container theme={theme} ref={containerRef}>
      <Background theme={theme} ref={bgRef} />
      <Wrapper>
        <Title theme={theme}>
          <Line theme={theme} ref={lineRef} />
          /About me
        </Title>
      </Wrapper>
    </Container>
  );
};

export default About2;
