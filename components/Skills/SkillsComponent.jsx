import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { useParallax } from "../../hooks";
import { mid, mobile } from "../../responsive";

const CatContainer = styled.div``;
const TitleWrapper = styled.div`
  overflow: hidden;
`;
const CatTitle = styled.h1`
  font-size: 26px;
  font-weight: 400;
  text-transform: uppercase;
  transition: transform 500ms;
  text-align: ${(props) => props.flexEnd && "end"};
  ${mid({ fontSize: "24px" })}
  ${mobile({ fontSize: "22px" })}
`;
const UnderLine = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.color};
  margin-top: 15px;
  opacity: 0.5;
  transform-origin: ${(props) => (props.flexEnd ? "right" : "left")};
  transition: all 100ms;
`;
const SkillsContainer = styled.div`
  background: linear-gradient(45deg, rgb(0, 255, 157), rgb(140, 0, 255));
  -webkit-background-clip: text;
  color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 30px;
  transition: all 100ms;
`;
const SkillWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: all 400ms;
  justify-content: ${(props) => props.flexEnd && "flex-end"};
  margin-bottom: 30px;
`;
const SubTitle = styled.p`
  font-size: 75px;
  font-weight: 500;
  margin-right: 20px;
  ${mobile({ fontSize: "50px" })}
`;
const Logo = styled.img`
  height: 60px;
  width: 60px;
  object-fit: contain;
`;

const SkillsComponent = ({ flexEnd, title, data, screen, scroll }) => {
  const { theme } = useContext(ThemeContext);
  const SkillsRef = useRef();
  const TitleRef = useRef();
  const underlineRef = useRef();

  //LINE SCALE
  const [startLine, duringLine, endLine, opacityLine] = useParallax(
    screen,
    underlineRef,
    scroll,
    0,
    1,
    0.1,
    "top"
  );
  useEffect(() => {
    if (startLine) {
      underlineRef.current.style.transform = `scale(0)`;
    } else if (duringLine) {
      underlineRef.current.style.transform = `scale(${opacityLine} , 1)`;
    } else {
      underlineRef.current.style.transform = `scale(1)`;
    }
  }, [startLine, duringLine, endLine, opacityLine]);

  //FADE IN
  const [start, during, end, opacity] = useParallax(
    screen,
    SkillsRef,
    scroll,
    0.05,
    0.7,
    0.15,
    "top"
  );
  useEffect(() => {
    if (start) {
      SkillsRef.current.style.opacity = 0;
      SkillsRef.current.style.transform = "translateY(100px)";
    } else if (during) {
      SkillsRef.current.style.opacity = opacity * 2;
      SkillsRef.current.style.transform = `translateY(${
        100 - 100 * opacity
      }px)`;
    } else {
      SkillsRef.current.style.opacity = 1;
      SkillsRef.current.style.transform = "translateY(0px)";
    }
  }, [start, during, end, opacity]);

  return (
    <CatContainer>
      <TitleWrapper ref={TitleRef}>
        <CatTitle flexEnd={flexEnd}>{title}</CatTitle>
        <UnderLine theme={theme} flexEnd={flexEnd} ref={underlineRef} />
      </TitleWrapper>
      <SkillsContainer ref={SkillsRef}>
        {data.map((skill) => (
          <SkillWrapper flexEnd={flexEnd}>
            <SubTitle>{skill.name}</SubTitle>
            {skill.logo && <Logo src={skill.logo} />}
          </SkillWrapper>
        ))}
      </SkillsContainer>
    </CatContainer>
  );
};

export default SkillsComponent;
