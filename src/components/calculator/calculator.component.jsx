import React, { Component } from "react";
import "./calculator.styles.scss";

import { TimelineMax, Power2 } from "gsap/all";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import Basic from "../basic/basic.component";
import Activity from "../activity/activity.component";
import Target from "../target/target.component";

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: "",
      height: "",
      weight: "",
      age: "",
      activity: "",
      target: "",
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      document.querySelector(".calculator").classList.remove("calc-hidden");
    }, 5);
  };

  componentWillUnmount = () => {
    this.props.getState(this.state);
  };

  checkIfEmpty = () => {
    const btn = document.getElementById("basic-button");
    const elements = document.querySelectorAll(".basic-data-input");

    if (
      elements[1].value !== "" &&
      elements[2].value !== "" &&
      elements[3].value !== ""
    ) {
      btn.classList.remove("button-hidden");
    } else {
      btn.classList.add("button-hidden");
    }
  };

  isChecked = (buttonID, tab) => {
    const btn = document.querySelector(buttonID);

    if (this.state[tab] !== "") {
      btn.classList.remove("button-hidden");
    } else {
      btn.classList.add("button-hidden");
    }
  };

  setValue = (e) => {
    const { name, value } = e.target;
    e.stopPropagation();
    this.setState({
      [name]: value,
    });
  };

  goTo = (path) => {
    this.props.history.push(path);
  };

  sliderAnimation = () => {
    const tl = new TimelineMax();
    const slider = document.querySelector(".calculator .slider");

    tl.fromTo(
      slider,
      0.5,
      { opacity: 0 },
      { opacity: 1, ease: Power2.easeInOut }
    );
  };

  render() {
    return (
      <div className="calculator calc-hidden">
        <div className="slider"></div>
        {/* <Progress currentTab={this.currentTab}/> */}
        <Switch>
          <Route
            exact
            path="/calculator"
            render={() => (
              <Basic
                setValue={this.setValue}
                handleClickNext={this.goTo}
                ifEmpty={this.checkIfEmpty}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/calculator/activity"
            render={() => (
              <Activity
                setValue={this.setValue}
                handleClickNext={this.goTo}
                isChecked={this.isChecked}
                state={this.state}
              />
            )}
          />
          <Route
            exact
            path="/calculator/target"
            render={() => (
              <Target
                setValue={this.setValue}
                handleClickNext={this.goTo}
                sliderAnimation={this.sliderAnimation}
                isChecked={this.isChecked}
                state={this.state}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Calculator);
