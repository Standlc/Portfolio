import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";
import { useParallax } from "../hooks";
import { mobile } from "../responsive";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";

const translations = {
  EN: {
    message: "Click to copy",
    title: ["Let's", "Get In", "Touch"],
  },
  FR: {
    message: "Clickez pour copier",
    title: ["Mettons", "Nous en", "Contact"],
  },
};

const Container = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 0;
`;
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Title = styled.h1`
  font-size: 100px;
  font-weight: 500;
  text-align: center;
  transition: all 100ms;
  ${mobile({ fontSize: "75px" })}
  ${mobile({ fontSize: "65px" })}
`;
const ContactItems = styled.div``;
const ButtonBg = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.color};
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  transition: transform ease-out 700ms;
`;
const Message = styled.p`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 5;
  font-size: 22px;
  opacity: 0;
  transition: all 500ms;
  color: ${(props) => props.theme.background};
  ${mobile({ fontSize: "16px" })}
`;
const ItemWrapper = styled.a`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  border-radius: 18px;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  border: 1px solid ${(props) => props.theme.color};
  background-color: ${(props) =>
    props.invert ? props.theme.color : props.theme.background};
  color: ${(props) =>
    props.invert ? props.theme.background : props.theme.color};
  &:hover ${ButtonBg} {
    transform: translateX(0);
  }
  &:hover ${Message} {
    opacity: 1;
  }
  transition: all 500ms;
  overflow: hidden;
`;
const ItemLogo = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ paddingLeft: "15px" })}
`;
const Link = styled.div`
  padding: 15px 0px;
  font-size: 22px;
  margin: 0 20px;
  ${mobile({ fontSize: "16px", margin: "0 15px" })}
`;
const RightLogo = styled.div`
  padding: 0 15px;
  background-color: ${(props) => props.theme.color};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.background};
  z-index: 5;
  ${mobile({ padding: " 0 10px" })}
`;

const Contact = ({ screen, scroll }) => {
  const { theme, language } = useContext(ThemeContext);
  const containerRef = useRef();
  const wrapperRef = useRef();

  const emailRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const line3Ref = useRef();

  const [start, during, end, opacity, scale] = useParallax(
    screen,
    containerRef,
    scroll,
    0.5,
    1,
    0.3,
    "top"
  );
  useEffect(() => {
    if (start) {
      line1Ref.current.style.transform = `translate(0px)`;
      line2Ref.current.style.transform = `translate(0px)`;
      line3Ref.current.style.transform = `translate(0px)`;
    } else if (during) {
      line1Ref.current.style.transform = `translate(${opacity * 15}%)`;
      line2Ref.current.style.transform = `translate(-${opacity * 15}%)`;
      line3Ref.current.style.transform = `translate(${opacity * 15}%)`;
    } else {
      line1Ref.current.style.transform = `translate(15%)`;
      line2Ref.current.style.transform = `translate(-15%)`;
      line3Ref.current.style.transform = `translate(15%)`;
    }
  }, [start, during, end, opacity, scale]);

  //COPY
  const handleCopy = async () => {
    // await navigator.clipboard.writeText(emailRef.current.innerText);
  };

  return (
    <Container id="contact" theme={theme} ref={containerRef}>
      <Wrapper ref={wrapperRef}>
        <Title ref={line1Ref}>{translations[language].title[0]}</Title>
        <Title ref={line2Ref}>{translations[language].title[1]}</Title>
        <Title ref={line3Ref}>{translations[language].title[2]}</Title>
        <ContactItems>
          <ItemWrapper theme={theme} onClick={handleCopy}>
            <ButtonBg theme={theme} />
            <Message theme={theme}>{translations[language].message}</Message>
            <ItemLogo>
              <EmailIcon sx={{ fontSize: 35 }} />
            </ItemLogo>
            <Link ref={emailRef}>s.delacomble@gmail.com</Link>
            <RightLogo theme={theme}>
              <ContentCopyRoundedIcon sx={{ fontSize: 35 }} />
            </RightLogo>
          </ItemWrapper>

          <ItemWrapper
            href="https://github.com/Standlc"
            target="_blank"
            invert
            theme={theme}
          >
            <ItemLogo>
              <GitHubIcon sx={{ fontSize: 35 }} />
            </ItemLogo>
            <Link>GitHub</Link>
            <RightLogo theme={theme}>
              <LinkIcon sx={{ fontSize: 35 }} />
            </RightLogo>
          </ItemWrapper>
        </ContactItems>
      </Wrapper>
    </Container>
  );
};

export default Contact;
