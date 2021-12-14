import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";
import { useParallax } from "../hooks";
import { mid, mobile } from "../responsive";

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 99;
  scroll-behavior: smooth;
`;
const Left = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const TitleContainer = styled.div`
  opacity: 0;
  transform: translateY(100px);
  transition: all 700ms;
  color: ${(props) => props.theme.color};
  text-align: center;
`;
const Greeting = styled.p`
  margin-bottom: 15px;
  font-size: 35px;
  font-weight: 300;
`;
const Title = styled.div`
  margin-bottom: 20px;
  font-size: 90px;
  font-weight: 500;
  background: linear-gradient(45deg, rgb(76, 0, 255), rgb(0, 255, 115));
  -webkit-background-clip: text;
  color: transparent;
  ${mid({ fontSize: "75px" })}
  ${mobile({ fontSize: "60px" })}
`;
const Down = styled.img`
  cursor: pointer;
  z-index: 555;
  position: fixed;
  opacity: 0;
  left: 0;
  right: 0;
  top: 90vh;
  margin: auto;
  filter: ${(props) => props.theme.name === "dark" && "invert(100%)"};
  height: 50px;
  width: 50px;
  object-fit: contain;
  transition: all 300ms;
  animation-duration: 3s;
  animation-name: bounce;
  animation-iteration-count: infinite;
  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }
    10% {
      transform: translateY(10px);
    }
    20% {
      transform: translateY(0px);
    }
    30% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const HomePage = ({ scroll, screen, aboutCntnrRef }) => {
  const { theme, language } = useContext(ThemeContext);
  const container = useRef();
  const downRef = useRef();
  const introContainer = useRef();

  const handleSroll = () => {
    window.scrollTo({
      top: aboutCntnrRef.current.getBoundingClientRect().top + scroll,
      left: 0,
      behavior: "smooth",
    });
  };

  //AFTER PAGE LOAD ANIMATION
  useEffect(() => {
    setTimeout(() => {
      introContainer.current.style.transform = "translateY(0px)";
      introContainer.current.style.opacity = 1;
      downRef.current.style.opacity = 1;
    }, 500);
  }, []);

  //DOWN FADE OUT
  const [startDown, duringDown, endDown, opacityDown] = useParallax(
    screen,
    aboutCntnrRef,
    scroll,
    0,
    0.2,
    0.1,
    "top"
  );
  useEffect(() => {
    if (startDown) {
      downRef.current.style.opacity = 1;
      downRef.current.style.visibility = "visible";
    } else if (duringDown) {
      downRef.current.style.opacity = 1 - opacityDown;
      downRef.current.style.visibility = "visible";
    } else {
      downRef.current.style.opacity = 0;
      downRef.current.style.visibility = "hidden";
    }
  }, [startDown, duringDown, opacityDown]);

  // PARALLAX
  // const [start, during, end, opacity] = useParallax(
  //   screen,
  //   aboutCntnrRef,
  //   scroll,
  //   0,
  //   1,
  //   0.1,
  //   "top"
  // );
  // useEffect(() => {
  //   if (start) {
  //     container.current.style.transform = `translateY(0px)`;
  //   } else if (during) {
  //     container.current.style.transform = `translateY(${scroll * -1}px)`;
  //   }
  // }, [start, during, opacity, scroll]);

  return (
    <>
      <Container id="home" ref={container} theme={theme}>
        <Left theme={theme}>
          <TitleContainer ref={introContainer} theme={theme}>
            <Greeting>
              {language === "EN"
                ? "Hello 👋, I'm Stan"
                : "Salut 👋, je suis Stan"}
            </Greeting>
            <Title>
              {language === "EN"
                ? " Full-Stack Web Developer."
                : "Développeur Web Full Stack."}
            </Title>
          </TitleContainer>
        </Left>
      </Container>
      <Down onClick={handleSroll} theme={theme} ref={downRef} src="/down.png" />
    </>
  );
};

export default HomePage;
