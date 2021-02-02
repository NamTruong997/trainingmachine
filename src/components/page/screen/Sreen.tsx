import React from "react";
import "./Sreen.scss";

const Sreen = () => {
  return (
    <div className="sreen">
      <section className="sreen__header">
        <div className="sreen__header--ch">CH<span className="flicker">10</span></div>
        <div className="sreen__header--status">
          <div className="sreen__header--statusOff">FAIL</div>
          {/* <div className="sreen__header--statusOn">TUNELING</div> */}
        </div>
      </section>
      <section className="sreen__body">
        <div className="sreen__body--left">
          <span>RX</span>
          {/* <span>TX</span> */}
        </div>
        <div className="sreen__body--mid">
          <span className="sreen__body--big">15</span>.<span className="sreen__body--big">4500</span>
        </div>
        <div className="sreen__body--right">
          <div>MHz</div>
          <div>
            <span className="sreen__body--watt">20</span><span>w</span>
          </div>
        </div>
      </section>
      <section className="sreen__footer">
        <div className="sreen__footer--mode">
          <span>CW1</span>
          <span>CW2</span>
          <span>CW3</span>
          <span>CW4</span>
        </div>
        <div>14.8v</div>
      </section>
    </div>
  );
};

export default Sreen;
