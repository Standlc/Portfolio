import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { useParallax } from "../../hooks";
import { mid, mobile } from "../../responsive";

const Container = styled.div`
  display: flex;
  ${(props) => props.side === "right" && "flex-direction: row-reverse;"};
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  ${mid({ flexDirection: "column" })}
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0px;
  height: 100vh;
  flex: 1;
  width: 50px;
  color: ${(props) => props.theme.color};
  ${mid({ width: "100%", flex: "none" })}
`;
const Left = styled.div`
  max-width: 500px;
  padding: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: start;
  ${mobile({ padding: "30px" })}
`;
const TitleContainer = styled.div`
  overflow: hidden;
`;
const Title = styled.h1`
  font-size: 80px;
  font-weight: 500;
  transition: transform 500ms;
  ${mobile({ fontSize: "65px" })}
`;
const Category = styled.p`
  font-size: 20px;
  font-weight: 500;
  opacity: 0.7;
  ${mobile({ fontSize: "18px" })}
`;
const DescritpionContainer = styled.div`
  margin: 60px 0;
  position: relative;
  overflow: hidden;
`;
const Description = styled.p`
  line-height: 2;
  font-size: 22px;
  font-weight: 400;
  transition: transform 500ms;
  transition-delay: 0ms;
  ${mobile({ fontSize: "20px" })}
`;
const Arrow = styled.div`
  height: 20px;
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  transform: scale(0.7);
  transition: width 400ms;
  margin-left: 5px;
`;
const Button = styled.a`
  margin-top: 15px;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 17px;
  text-decoration: none;
  color: inherit;
  &:hover ${Arrow} {
    width: 90px;
  }
`;
const ArrowComponent = styled.div`
  height: 1px;
  width: ${(props) => props.width};
  transform: translateX(4px) rotate(${(props) => props.rotate}deg);
  transform-origin: left;
  background-color: ${(props) => props.theme.color};
  ${(props) =>
    props.absolute && "position:absolute; top:50%; transform:translateY(-50%);"}
`;
const Technologies = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const Technology = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => props.theme.color};
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ fontSize: "15px" })}
`;
const Logo = styled.img`
  height: 30px;
  object-fit: cover;
  margin-left: 10px;
`;
const Right = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  transition: transform 100ms;
  z-index: 99;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: 15px;
`;
const Project = ({ scroll, screen, project }) => {
  const { theme, language } = useContext(ThemeContext);
  const containerRef = useRef();
  const imgRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    if (containerRef.current.getBoundingClientRect().top - 70 <= 0) {
      descriptionRef.current.style.transform = `translateY(0)`;
      titleRef.current.style.transform = `translateY(0)`;
      buttonRef.current.style.opacity = 1;
    } else {
      descriptionRef.current.style.transform = `translateY(100%)`;
      titleRef.current.style.transform = `translateY(100%)`;
      buttonRef.current.style.opacity = 0;
    }
  }, [scroll]);

  // IMG FADE IN/OUT
  const [start, during, end, opacity, scale] = useParallax(
    screen,
    imgRef,
    scroll,
    0,
    1,
    0.15,
    "top"
  );
  const [
    startFadeOut,
    duringFadeOut,
    endFadeOut,
    opacityFadeOut,
    scaleFadeOut,
  ] = useParallax(screen, imgRef, scroll, 0, 0.9, 0.05, "bottom");
  useEffect(() => {
    if (start) {
      imgRef.current.style.opacity = 1;
      imgRef.current.style.transform = `scale(0.85)`;
    } else if (during) {
      imgRef.current.style.transform = `scale(${scale})`;
    } else if (end && startFadeOut) {
      imgRef.current.style.opacity = 1;
      imgRef.current.style.transform = `scale(1)`;
    } else if (duringFadeOut) {
      imgRef.current.style.transform = `scale(${scaleFadeOut})`;
    } else if (endFadeOut) {
      imgRef.current.style.transform = `scale(0.95)`;
      imgRef.current.style.opacity = 1;
    }
  }, [
    start,
    during,
    end,
    opacity,
    scale,
    startFadeOut,
    duringFadeOut,
    endFadeOut,
    opacityFadeOut,
    scaleFadeOut,
  ]);

  return (
    <Container side={project.side} theme={theme} ref={containerRef}>
      <LeftContainer containerRef={containerRef} theme={theme}>
        <Left side={project.side}>
          <TitleContainer>
            <Title ref={titleRef} theme={theme}>
              {project.title}
              <Category>{project.category[language]}</Category>
            </Title>
          </TitleContainer>
          <DescritpionContainer>
            <Description ref={descriptionRef} theme={theme}>
              {project.description[language]}
              <Technologies>
                {project.technologies.map((item) => (
                  <Technology theme={theme}>
                    {item.name}
                    <Logo src={item.logo} />
                  </Technology>
                ))}
              </Technologies>
            </Description>
          </DescritpionContainer>
          <div style={{ transition: "all 500ms" }} ref={buttonRef}>
            <Button href={project.link} target="_blank">
              {language === "EN" ? "See GitHub" : "Voir GitHub"}
              <Arrow>
                <ArrowComponent theme={theme} width="14px" rotate="45" />
                <ArrowComponent
                  theme={theme}
                  absolute
                  width="100%"
                  rotate="0"
                />
                <ArrowComponent theme={theme} width="14px" rotate="-45" />
              </Arrow>
            </Button>
            {project.webSiteLink && (
              <Button href={project.webSiteLink} target="_blank">
                {language === "EN" ? "Link to Website" : "Lien vers le site"}
                <Arrow>
                  <ArrowComponent theme={theme} width="14px" rotate="45" />
                  <ArrowComponent
                    theme={theme}
                    absolute
                    width="100%"
                    rotate="0"
                  />
                  <ArrowComponent theme={theme} width="14px" rotate="-45" />
                </Arrow>
              </Button>
            )}
          </div>
        </Left>
      </LeftContainer>
      <Right theme={theme} ref={imgRef}>
        {project.images.map((image) => (
          <Img key={image} src={image} />
        ))}
      </Right>
    </Container>
  );
};

export default Project;
