import { faArrowDown, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Sreen from "../screen/Sreen";
import "./MainPage.scss";

const SignInPage = () => {
  return (
    <div className="mainpage">
      <section className="mainpage__left">
        <input type="radio" id="power1" name="direct" />
        <label htmlFor="power1">TUNE</label>

        <input type="radio" id="power2" name="direct" />
        <label htmlFor="power2">OFF</label>
      </section>
      <section className="mainpage__mid">
        <h2>HF TRANSCEIVER VRU611</h2>
        <Sreen />
        <div className="mainpage__direct">
          <input type="radio" id="direct1" name="direct" />
          <label htmlFor="direct1">
            <FontAwesomeIcon icon={faArrowRight} />
          </label>

          <input type="radio" id="direct2" name="direct" />
          <label htmlFor="direct2">
            <FontAwesomeIcon icon={faArrowUp} />
          </label>

          <input type="radio" id="direct3" name="direct" />
          <label htmlFor="direct3">
            <FontAwesomeIcon icon={faArrowDown} />
          </label>

          <input type="radio" id="direct4" name="direct" />
          <label htmlFor="direct4">PRE</label>
        </div>
      </section>

      <section className="mainpage__right">
        <input type="radio" id="mode1" name="direct" />
        <label htmlFor="mode1">MODE</label>

        <input type="radio" id="mode2" name="direct" />
        <label htmlFor="mode2">SCAN</label>

        <input type="radio" id="mode3" name="direct" />
        <label htmlFor="mode3">BLIT</label>

        <input type="radio" id="mode4" name="direct" />
        <label htmlFor="mode4">WRI</label>
      </section>
    </div>
  );
};

export default SignInPage;
