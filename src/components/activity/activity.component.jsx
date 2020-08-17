import React, { useState, useEffect } from "react";
import "./activity.styles.scss";

import { withRouter, Redirect } from "react-router-dom";
import { TimelineMax, Power2 } from "gsap/all";

import surfing from "../../assets/football.jpg";
import jogging from "../../assets/jogging.jpg";

const handleAnimation = () => {
  const top = document.querySelector(".activity .top");
  const headline = document.querySelector(".activity .top h1");
  const bottom = document.querySelector(".activity .bottom");
  const tl = new TimelineMax();

  let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (viewportWidth <= 1024 && viewportHeight <= 1366) {
    tl.fromTo(
      headline,
      0.5,
      { opacity: 1 },
      { opacity: 0, ease: Power2.easeInOut },
      0
    );

    document.querySelector(".bg-activity").style.opacity = 0;
  } else {
    tl.fromTo(
      top,
      0.8,
      { height: "25%" },
      { height: "0%", ease: Power2.easeInOut }
    )
      .fromTo(
        headline,
        0.5,
        { opacity: 1 },
        { opacity: 0, ease: Power2.easeInOut },
        0
      )
      .fromTo(
        bottom,
        0.8,
        { height: "75%" },
        { height: "100%", ease: Power2.easeInOut },
        0
      );
  }

  document
    .querySelector(".activity .bottom .description")
    .classList.add("hidden-bottom");
  document.querySelector(".activity form").classList.add("hidden-bottom");
  document.querySelector(".activity button").classList.add("hidden-bottom");
};

const Activity = ({ setValue, state, isChecked, handleClickNext }) => {
  const [countdown, setCountdown] = useState(800);

  useEffect(() => {
    window.innerWidth >= 414 && window.innerHeight >= 823
      ? setCountdown(800)
      : setCountdown(300);

    const options = document.querySelectorAll(".activity-option");
    const labels = document.querySelectorAll(".activity-label");

    options.forEach((option, index) => {
      if (option.value === state.activity) {
        option.checked = true;
        labels[index].classList.add("active");
      } else {
        labels[index].classList.remove("active");
      }
    });

    isChecked(".button-activity", "activity");

    const paragraph = document.querySelector(".activity .bottom .description");
    const form = document.querySelector(".activity form");
    const button = document.querySelector(".activity button");

    if (paragraph && form && button) {
      setTimeout(() => {
        paragraph.classList.remove("hidden-bottom");
      }, 100);
      setTimeout(() => {
        form.classList.remove("hidden-bottom");
      }, 200);
      setTimeout(() => {
        button.classList.remove("hidden-bottom");
      }, 300);
    }

    if (state.age === "" || state.height === "" || state.weight === "") {
      handleClickNext("/calculator");
    }
  });

  useEffect(() => {
    const tl = new TimelineMax();
    const heading = document.querySelector(".activity .top");
    const title = document.querySelector(".activity .top h1");

    let viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    let viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    document.querySelector(".bg-activity").style.opacity = 1;

    if (viewportWidth <= 1024 && viewportHeight <= 1366) {
      title.style.opacity = 1;
    } else {
      tl.fromTo(
        heading,
        0.5,
        { height: "0%" },
        { height: "25%", ease: Power2.easeInOut }
      );
      tl.fromTo(
        title,
        0.5,
        { opacity: 0 },
        { opacity: 1, ease: Power2.easeInOut },
        0
      );
    }
  }, []);

  return (
    <div className="activity container">
      <div className="top">
        <img src={surfing} className="bg-activity" />
        <h1>Aktywność fizyczna</h1>
      </div>
      <div className="bottom">
        <p className="description hidden-bottom">
          Na codzienną aktywność składa się nie tylko trening, ale przede
          wszystkim <br /> podstawowe czynności takie jak dojście do
          szkoły/pracy, aktywność w pracy.
        </p>
        <form className="hidden-bottom">
          <label className="activity-label">
            <input
              className="activity-option"
              type="radio"
              name="activity"
              onClick={setValue}
              value={1}
            />{" "}
            <p>Praca siedząca</p> <h2> B. MAŁA</h2> <h3>Brak aktywności</h3>{" "}
          </label>
          <label className="activity-label">
            <input
              className="activity-option"
              type="radio"
              name="activity"
              onClick={setValue}
              value={1.25}
            />{" "}
            <p>Praca niefizyczna</p> <h2>UMIARKOWANA</h2>{" "}
            <h3>1 - 2 Treningi</h3>{" "}
          </label>
          <label className="activity-label">
            <input
              className="activity-option"
              type="radio"
              name="activity"
              onClick={setValue}
              value={1.5}
            />{" "}
            <p>Lekka praca</p> <h2>PRZECIĘTNA</h2> <h3>3 - 4 Treningi</h3>
          </label>
          <label className="activity-label">
            <input
              className="activity-option"
              type="radio"
              name="activity"
              onClick={setValue}
              value={1.75}
            />{" "}
            <p>Praca fizyczna</p> <h2>DUŻA</h2> <h3>5 Treningów</h3>
          </label>
          <label className="activity-label">
            <input
              className="activity-option"
              type="radio"
              name="activity"
              onClick={setValue}
              value={2}
            />{" "}
            <p>Ciężka praca</p> <h2>B. DUŻA</h2> <h3>Trening codziennie</h3>{" "}
          </label>
        </form>
        <div>
          <button
            className="button-activity hidden-bottom"
            onClick={() => {
              handleAnimation();
              setTimeout(() => {
                handleClickNext("/calculator/target");
              }, countdown);
            }}
          >
            Dalej
          </button>
        </div>
      </div>
      <div className="background-square"></div>
    </div>
  );
};

export default Activity;
