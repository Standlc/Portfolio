import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";
import { useElementOnScreen } from "../hooks";
import { mid, mobile } from "../responsive";

const Container = styled.div`
  position: relative;
  z-index: 99;
  height: 200vh;
  width: 100%;
  background-color: ${(props) => props.theme.color};
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
const DescriptionContainer = styled.div`
  max-width: 700px;
  width: 80%;
  padding: 30px;
  color: ${(props) => props.theme.color};
  transform: translateY(${(props) => (props.isVisible ? "0px" : "100px")});
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: transform 500ms, opacity 500ms;
`;
const Description = styled.p`
  font-size: 30px;
  font-weight: 400;
  line-height: 1.5;
  ${mid({ fontSize: "28px" })}
  ${mobile({ fontSize: "26px" })}
`;

const About = ({ scroll, screen }) => {
  const { theme, language } = useContext(ThemeContext);
  const containerRef = useRef();
  const backgroundRef = useRef();
  const descriptionContainer = useRef();
  const title = useRef();
  //ANIMATION HOOK
  const isVisible = useElementOnScreen(screen, descriptionContainer, scroll, 0);

  useEffect(() => {
    title.current.style.transform = `translateX(${scroll * 0.2 - 280}px)`;
  }, [scroll]);


  return (
    <Container ref={containerRef} theme={theme}>
      <Background theme={theme} ref={backgroundRef}>
        <Title ref={title} theme={theme}>
        {language === "EN"
              ? "ABOUT ME"
              : "QUI JE SUIS"}
        </Title>
        <DescriptionContainer
          isVisible={isVisible}
          ref={descriptionContainer}
          theme={theme}
        >
          <Description theme={theme}>
            {language === "EN"
              ? "Self taught web developer passionate about computer science and innovation, I began my atypical path learning to code by myself. Here are some of my projects."
              : "Développeur web passionné pour l'informatique et l'innovation, j'ai débuté mon parcours atypique en apprenant le code par moi-même. Voici quelques un de mes projets."}
          </Description>
        </DescriptionContainer>
      </Background>
    </Container>
  );
};

export default About;
