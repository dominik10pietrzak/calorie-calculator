import React, { useEffect } from "react";
import "./target.styles.scss";

import jogging from "../../assets/deadlift.jpg";
import { TimelineMax, Power2 } from "gsap/gsap-core";

const handleAnimation = (sliderAnimation) => {
  const target = document.querySelector(".target");
  const slider = document.querySelector(".target .slider");
  const tl = new TimelineMax();

  tl.fromTo(target, 0.5, { opacity: 1 }, { opacity: 0, ease: Power2.easeOut });

  sliderAnimation();
};

const Target = ({
  setValue,
  handleClickNext,
  sliderAnimation,
  isChecked,
  state,
}) => {
  useEffect(() => {
    const options = document.querySelectorAll(".target-option");
    const targets = document.querySelectorAll(".target-label");

    options.forEach((option, index) => {
      if (option.value === state.target) {
        option.checked = true;
        targets[index].classList.add("active");
      } else {
        targets[index].classList.remove("active");
      }
    });

    isChecked(".button-target", "target");

    if (
      state.age === "" ||
      state.height === "" ||
      state.weight === "" ||
      state.activity === ""
    ) {
      handleClickNext("/calculator");
    }

    const targetBG = document.querySelector(".bg-target");
    setTimeout(() => {
      if (targetBG) {
        targetBG.style.opacity = 1;
      }
    }, 5);
  });

  useEffect(() => {
    const tl = new TimelineMax();
    const left = document.querySelector(".target .left");
    const right = document.querySelector(".target .right");
    const form = document.querySelector(".target .left form");
    const btn = document.querySelector(".target .left button");
    const text = document.querySelector(".target .left span");
    const heading = document.querySelector(".target .right h1");

    text.style.opacity = 1;

    tl.fromTo(
      left,
      0.8,
      { width: "100%" },
      { width: "55%", ease: Power2.easeInOut }
    )
      .fromTo(
        right,
        0.8,
        { width: "0%" },
        { width: "45%", ease: Power2.easeInOut },
        0
      )
      .fromTo(
        form,
        0.5,
        { opacity: 0 },
        { opacity: 1, ease: Power2.easeInOut },
        0.2
      )
      .fromTo(
        btn,
        0.5,
        { opacity: 0 },
        { opacity: 1, ease: Power2.easeInOut },
        0.4
      )
      .fromTo(
        heading,
        0.5,
        { opacity: 0 },
        { opacity: 1, ease: Power2.easeInOut },
        0.3
      )
      .fromTo(
        text,
        0.5,
        { opacity: 0 },
        { opacity: 1, ease: Power2.easeInOut },
        0.3
      );
  }, []);

  return (
    <div className="target container">
      <div className="slider"></div>
      <div className="left">
        <span>
          Twoje zapotrzebowanie kaloryczne zależy w dużej mierze od tego, jaki
          jest efekt, który chcesz uzyskać.
        </span>
        <form>
          <label className="target-label">
            <input
              className="target-option"
              type="radio"
              name="target"
              onClick={setValue}
              value={-500}
            />{" "}
            <h3>Redukcja</h3>{" "}
          </label>
          <label className="target-label">
            <input
              className="target-option"
              type="radio"
              name="target"
              onClick={setValue}
              value={0}
            />{" "}
            <h3>Bilans zerowy</h3>{" "}
          </label>
          <label className="target-label">
            <input
              className="target-option"
              type="radio"
              name="target"
              onClick={setValue}
              value={500}
            />{" "}
            <h3>Masa</h3>{" "}
          </label>
        </form>
        <button
          className="button-target"
          onClick={() => {
            handleAnimation(sliderAnimation);
            setTimeout(() => {
              handleClickNext("/summary");
            }, 499);
          }}
        >
          Sprawdź
        </button>
      </div>
      <div className="right">
        <img className="bg-target" src={jogging} />
        <h1>Twój cel</h1>
      </div>
    </div>
  );
};

export default Target;
