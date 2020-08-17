import React from "react";
import "./opening.styles.scss";
import { TimelineMax, Power2 } from "gsap/dist/gsap";

import { Link, Redirect, useHistory } from "react-router-dom";

const leavingAnimation = () => {
  const slider = document.querySelector(".slider");
  const tl = new TimelineMax();

  tl.fromTo(
    slider,
    0.5,
    { opacity: 0 },
    { opacity: 1, ease: Power2.easeInOut }
  );
};

const Opening = ({ goTo }) => {
  const history = useHistory();

  return (
    <div className="opening">
      <div className="slider"></div>
      <h1>KALKULATOR ZAPOTRZEBOWANIA KALORYCZNEGO</h1>
      <button
        onClick={() => {
          leavingAnimation();
          setTimeout(() => {
            history.push("/calculator");
          }, 500);
        }}
      >
        Rozpocznij
      </button>
    </div>
  );
};

export default Opening;
