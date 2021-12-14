import { useEffect, useState } from "react";

export const useElementOnScreen = (screen, ref, scroll, entryRatio) => {
  const [isVisible, setIsVisible] = useState(false);
  const refBoundings = ref.current?.getBoundingClientRect();
  useEffect(() => {
    if (
      refBoundings?.top + refBoundings?.height + screen.height * entryRatio <=
      screen.height
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scroll]);

  return isVisible;
};

export const useParallax = (
  screen,
  ref,
  scroll,
  startRatio,
  endRatio,
  scaleRatio,
  top
) => {
  const [start, setStart] = useState(true);
  const [during, setDuring] = useState(false);
  const [end, setEnd] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.75);

  // const [scroll, setScroll] = useState(0);
  // const [screen, setScreen] = useState({
  //   height: undefined,
  //   width: undefined,
  // });
  // useEffect(() => {
  //   window.onscroll = () => {
  //     setScroll(window.pageYOffset);
  //   };

  //   setScreen({ height: window.innerHeight, width: window.innerWidth });
  //   const handleResize = () => {
  //     setScreen({
  //       height: window.innerHeight,
  //       width: window.innerWidth,
  //     });
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const refBoundingsTop =
    top === "top"
      ? ref.current?.getBoundingClientRect().top
      : ref.current?.getBoundingClientRect().top +
        ref.current?.getBoundingClientRect().height;
  useEffect(() => {
    if (
      refBoundingsTop > screen?.height * (1 - endRatio) &&
      refBoundingsTop < screen?.height * (1 - startRatio)
    ) {
      setDuring(true),
        setStart(false),
        setEnd(false),
        setOpacity(
          top === "top"
            ? (screen?.height * (1 - startRatio) - refBoundingsTop) /
                (screen?.height * (endRatio - startRatio))
            : 1 -
                (screen?.height * (1 - startRatio) - refBoundingsTop) /
                  (screen?.height * (endRatio - startRatio))
        ),
        setScale(
          top === "top"
            ? ((screen?.height * (1 - startRatio) - refBoundingsTop) /
                (screen?.height * (endRatio - startRatio))) *
                scaleRatio +
                (1 - scaleRatio)
            : 1 +
                (1 - scaleRatio) -
                (((screen?.height * (1 - startRatio) - refBoundingsTop) /
                  (screen?.height * (endRatio - startRatio))) *
                  scaleRatio +
                  (1 - scaleRatio))
        );
    } else if (refBoundingsTop < screen?.height * (1 - startRatio)) {
      setDuring(false), setStart(false), setEnd(true);
    } else {
      setDuring(false), setStart(true), setEnd(false);
    }
  }, [scroll]);
  return [start, during, end, opacity, scale];
};
