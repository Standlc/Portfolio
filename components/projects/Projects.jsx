import { useContext, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import Title from "../Title";
import Project from "../projects/Project";
import { projectsData } from "../../data";

const Container = styled.div`
  z-index: 99;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.background};
  /* justify-content: flex-start; */
  align-items: center;
`;
const Projects = ({ scroll, screen }) => {
  const { theme } = useContext(ThemeContext);
  const containerRef = useRef();

  return (
    <Container id="projects" ref={containerRef} theme={theme}>
      <Title screen={screen} scroll={scroll}/>
      {projectsData.map((project) => (
        <Project
          screen={screen}
          scroll={scroll}
          key={project.title}
          project={project}
        />
      ))}
    </Container>
  );
};

export default Projects;
