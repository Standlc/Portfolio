import { useEffect, useRef, useState } from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";
import NavBar from "../components/navBar/NavBar";
import Title from "../components/Title";
import Projects from "../components/projects/Projects";
import styled from "styled-components";
import Skills from "../components/Skills/Skills";
import Contact from "../components/Contact";
import About2 from "../components/About2";

const Container = styled.div`
  scroll-behavior: smooth;
  width: 100%;
`;

export default function Home() {
  const aboutCntnrRef = useRef();

  const [scroll, setScroll] = useState(0);
  const [screen, setScreen] = useState({
    height: undefined,
    width: undefined,
  });
  useEffect(() => {
    window.onscroll = () => {
      setScroll(window.pageYOffset);
    };

    setScreen({ height: window.innerHeight, width: window.innerWidth });
    const handleResize = () => {
      setScreen({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <NavBar screen={screen} scroll={scroll} aboutCntnrRef={aboutCntnrRef} />
      <Container>
        <HomePage
          aboutCntnrRef={aboutCntnrRef}
          screen={screen}
          scroll={scroll}
        />
        <div ref={aboutCntnrRef}>
          <About screen={screen} scroll={scroll} />
          {/* <About2  screen={screen} scroll={scroll} />  */}
        </div>
        <Projects screen={screen} scroll={scroll} />
        <Skills screen={screen} scroll={scroll} />
        <Contact screen={screen} scroll={scroll} />
      </Container>
    </>
  );
}
