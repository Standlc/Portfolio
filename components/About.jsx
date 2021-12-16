import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";
import { mid, mobile } from "../responsive";

const Container = styled.div`
  position: relative;
  z-index: 99;
  height: 270vh;
  width: 100%;
  background-color: ${(props) => props.theme.background};
`;
const Background = styled.div`
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: calc(100vh);
  width: calc(100%);
  background-color: ${(props) => props.theme.background};
  transform-origin: bottom;
`;
const Title = styled.h1`
  white-space: nowrap;
  position: absolute;
  top: 37%;
  font-weight: 700;
  font-size: 160px;
  opacity: 0.15;
  color: ${(props) => props.theme.color};
  ${mid({ fontSize: "150px" })}
  ${mobile({ fontSize: "100px" })}
`;
const Description = styled.p`
  font-size: 30px;
  padding: 30px;
  position: absolute;
  text-align: center;
  max-width: 800px;
  font-weight: 400;
  opacity: 0;
  transform: translateY(150px);
  color: ${(props) => props.theme.color};
  line-height: 1.5;
  ${mid({ fontSize: "28px" })}
  ${mobile({ fontSize: "26px" })}
  transition: transform cubic-bezier(0.2, 0, 0, 1) 800ms, opacity 500ms;
`;

const About = ({ scroll }) => {
  const { theme, language } = useContext(ThemeContext);
  const containerRef = useRef();
  const backgroundRef = useRef();
  const firstParagraphRef = useRef(null);
  const secondParagraphRef = useRef(null);
  const title = useRef();

  useEffect(() => {
    title.current.style.transform = `translateX(${scroll * 0.2 - 280}px)`;
  }, [scroll]);

  useEffect(() => {
    if (
      containerRef.current.getBoundingClientRect().top <= 0 &&
      -containerRef.current.getBoundingClientRect().top <
        containerRef.current.getBoundingClientRect().height / 3
    ) {
      firstParagraphRef.current.style.opacity = 1;
      secondParagraphRef.current.style.opacity = 0;
      firstParagraphRef.current.style.transform = "translateY(0px)";
      secondParagraphRef.current.style.transform = "translateY(150px)";
    }
    if (
      -containerRef.current.getBoundingClientRect().top >=
      containerRef.current.getBoundingClientRect().height / 3
    ) {
      firstParagraphRef.current.style.opacity = 0;
      firstParagraphRef.current.style.transform = "translateY(-150px)";

      secondParagraphRef.current.style.opacity = 1;
      secondParagraphRef.current.style.transform = "translateY(0)";
    }
  }, [scroll]);

  return (
    <Container ref={containerRef} theme={theme}>
      <Background theme={theme} ref={backgroundRef}>
        <Title ref={title} theme={theme}>
          {language === "EN" ? "ABOUT ME" : "QUI JE SUIS"}
        </Title>
        <Description ref={firstParagraphRef} theme={theme}>
          {language === "EN"
            ? "Self taught web developer passionate about computer science and innovation."
            : "Développeur web passionné par la technologie et l'innovation, j'ai débuté mon parcours informatique en apprenant le code par moi-même."}
        </Description>
        <Description
          style={{
            fontSize: "35px",
          }}
          ref={secondParagraphRef}
          theme={theme}
        >
          {language === "EN"
            ? "Here are some of my projects."
            : "Voici quelques uns de mes projets."}
        </Description>
      </Background>
    </Container>
  );
};

export default About;
