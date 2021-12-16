import { useContext, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import SkillsComponent from "../Skills/SkillsComponent";
import { frontSkillsData, backSkillsData } from "../../data";
import { mid, mobile } from "../../responsive";

const translations = {
  EN: {
    title: "/Skills & /Technologies",
  },
  FR: {
    title: "/Compétences & /Technologies",
  },
};

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  position: relative;
  z-index: 99;
  width: 100%;
`;
const Container = styled.div`
  max-width: 1000px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 200px 40px;
  color: ${(props) => props.theme.color};
  ${mid({ flexDirection: "column" })};
  ${mobile({ padding: "100px 30px" })}
`;
const TitleWrapper = styled.div`
  padding-bottom: 150px;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 90px;
  opacity: 0.7;
  ${mid({ fontSize: "80px" })}
  ${mobile({ fontSize: "50px" })}
`;
const BottomContainer = styled.div``;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ paddingBottom: "40px" })}
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${mid({ width: "100%" })}
`;

const Skills = ({ screen, scroll }) => {
  const { theme, language } = useContext(ThemeContext);
  const containerRef = useRef();

  return (
    <Wrapper id="skills" theme={theme}>
      <Container theme={theme} ref={containerRef}>
        <TitleWrapper>
          <Title>{translations[language].title}</Title>
        </TitleWrapper>
        <BottomContainer>
          <Top>
            <SkillsComponent
              title="Front-end"
              flexEnd={true}
              data={frontSkillsData}
              screen={screen}
              scroll={scroll}
            />
          </Top>
          <Bottom>
            <SkillsComponent
              title="Back-end"
              flexEnd={false}
              data={backSkillsData}
              screen={screen}
              scroll={scroll}
            />
          </Bottom>
        </BottomContainer>
      </Container>
    </Wrapper>
  );
};

export default Skills;
