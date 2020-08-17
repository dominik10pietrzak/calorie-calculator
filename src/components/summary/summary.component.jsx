import React, { useState, useEffect, useLayoutEffect } from "react";
import "./summary.styles.scss";

import { Link, Redirect, useHistory } from "react-router-dom";

const Summary = ({ data }) => {
  const [score, setScore] = useState(0);
  const [yourTarget, setYourTarget] = useState("");
  const history = useHistory();

  useEffect(() => {
    let ppm;

    console.log(data);

    ppm = 10 * data.weight + 6.25 * data.height + 5 * data.age + 5;

    data.gender === "Mężczyzna" ? (ppm = ppm + 5) : (ppm = ppm - 161);

    ppm = ppm * data.activity;
    ppm = ppm + +data.target;

    setScore(ppm);

    if (!data && score === 0 && isNaN(ppm)) {
      history.push("/calculator");
    } else {
      console.log(`everything's fine`);
    }

    if (data.target === "-500") {
      setYourTarget("zmniejszyć poziom tkanki tłuszczowej");
    } else if (data.target === "0") {
      setYourTarget("utrzymać swoją wagę");
    } else if (data.target === "500") {
      setYourTarget("przybrać na masie");
    }

    const paragraph = document.querySelector(".summary .score p");
    const headline = document.querySelector(".summary .score h1");
    const button = document.querySelector(".summary .score a");

    if (paragraph && headline && button) {
      setTimeout(() => {
        paragraph.style.opacity = 1;
      }, 150);
      setTimeout(() => {
        headline.style.opacity = 1;
      }, 450);
      setTimeout(() => {
        button.style.opacity = 1;
      }, 300);
    }
  }, []);

  return (
    <div className="summary summary-hidden">
      <h1>Podsumowanie</h1>
      <div className="container">
        <div className="score">
          <p>
            Biorąc pod uwagę twoją aktywność fizyczną oraz fakt, że chcesz{" "}
            {yourTarget},{" "}
            {data.gender === "Mężczyzna" ? "powinieneś" : "powinnaś"}
            &nbsp;spożywać dziennie około
          </p>
          <h1>{Math.round(score)} kcal</h1>
          <Link to="/">Od nowa</Link>
        </div>
      </div>
    </div>
  );
};

export default Summary;
