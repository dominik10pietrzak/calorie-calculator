import React, { useState, useEffect, useRef } from "react";
import "./basic.styles.scss";

import { TimelineMax, Power2 } from "gsap/dist/gsap";

import workout from "../../assets/workout.jpg";

const handleAnimation = () => {
  const formContainer = document.querySelector(".basic .left");
  const form = document.querySelector(".basic .left form");
  const button = document.getElementById("basic-button");
  const titleContainer = document.querySelector(".basic .right");
  const heading = document.querySelector(".basic .right h1");
  const bg = document.querySelector(".bg-basic");
  const tl = new TimelineMax();

  let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (viewportWidth <= 1024 && viewportHeight <= 1366) {
    form.style.opacity = 0;
    button.style.opacity = 0;
    heading.style.opacity = 0;
    bg.style.opacity = 0;
  } else {
    tl.fromTo(
      formContainer,
      0.8,
      { width: "45%" },
      { width: "100%", ease: Power2.easeInOut }
    )
      .fromTo(
        form,
        0.3,
        { opacity: 1 },
        { opacity: 0, ease: Power2.easeOut },
        0
      )
      .fromTo(
        button,
        0.3,
        { opacity: 1 },
        { opacity: 0, ease: Power2.easeOut },
        0
      )
      .fromTo(
        heading,
        0.3,
        { opacity: 1 },
        { opacity: 0, ease: Power2.easeOut },
        0
      )
      .fromTo(
        titleContainer,
        0.8,
        { width: "55%" },
        { width: "0%", ease: Power2.easeInOut },
        0
      );
  }
};

const Basic = ({ setValue, handleClickNext, ifEmpty, state }) => {
  const [countdown, setCountdown] = useState(800);

  useEffect(() => {
    window.innerWidth >= 414 && window.innerHeight >= 823
      ? setCountdown(800)
      : setCountdown(300);

    ifEmpty();
  });

  return (
    <div className="basic container">
      <div className="left">
        <form>
          <label htmlFor="gender">Płeć</label>
          <select
            className="basic-data-input"
            name="gender"
            value={state.gender}
            onChange={setValue}
          >
            <option className="gender" name="woman">
              Kobieta
            </option>
            <option className="gender" name="man">
              Mężczyzna
            </option>
          </select>
          <label htmlFor="height">Wzrost</label>
          <input
            className="basic-data-input"
            type="number"
            name="height"
            value={state.height}
            onChange={setValue}
          />
          <label htmlFor="weight">Waga</label>
          <input
            className="basic-data-input"
            type="number"
            name="weight"
            value={state.weight}
            onChange={setValue}
          />
          <label htmlFor="age">Wiek</label>
          <input
            className="basic-data-input"
            type="number"
            name="age"
            value={state.age}
            onChange={setValue}
          />
        </form>
        <button
          className="button-hidden"
          id="basic-button"
          onClick={() => {
            handleAnimation();
            setTimeout(() => {
              handleClickNext("/calculator/activity");
            }, countdown);
          }}
        >
          Dalej
        </button>
      </div>
      <div className="right">
        <img src={workout} className="bg-basic" />
        <h1>Dane fizyczne</h1>
      </div>
    </div>
  );
};

export default Basic;
