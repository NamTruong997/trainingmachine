import classNames from "classnames";
import React from "react";
import "./Sreen.scss";
export interface ScreenProps {
  active: boolean;
  done:number;
  pre: boolean;
  chanel: number;
  step: number;
  wri: number;
  data: ScreenDataType;
}
export type ScreenDataType = {
  rxLeft: number;
  rxRight1: number;
  rxRight2: number;
  rxRight3: number;
  rxRight4: number;
  txLeft: number;
  txRight1: number;
  txRight2: number;
  txRight3: number;
  txRight4: number;
  mode: number;
  watt: boolean;
};

const MODE = ["USB", "LSB", "CW", "NCW"];

const Sreen: React.FC<ScreenProps> = (props) => {
  const { active, pre, chanel, step, wri, data, done } = props;
  return (
    <div className="sreen">
      <section className="sreen__header">
        <div className="sreen__header--ch">
          CH
          <span className={classNames({ flicker: step === 1 })}>{chanel < 9 ? `0${chanel + 1}` : chanel + 1}</span>
          {pre ? <span style={{ marginLeft: 15 }}>PRE</span> : <span></span>}
        </div>
        <div className="sreen__header--status">

          {done === -1 && <div className="sreen__header">FAIL</div>}
          {done === 0 && <div className="sreen__header">TUNING</div>}
          {done === 1 && <div className="sreen__header">OK</div>}
        </div>
      </section>
      <section className="sreen__body">
        <div className="sreen__body--left">
          <span>{wri !== 1 ? "RX" : "TX"}</span>
        </div>
        {wri === 0 || wri === 2 ? (
          <div className="sreen__body--mid">
            <span className={classNames("sreen__body--big", { flicker: step === 2 })}>{data.rxLeft}</span>.
            <span className={classNames("sreen__body--big", { flicker: step === 3 })}>{data.rxRight1}</span>
            <span className={classNames("sreen__body--big", { flicker: step === 4 })}>{data.rxRight2}</span>
            <span className={classNames("sreen__body--big", { flicker: step === 5 })}>{data.rxRight3}</span>
            <span className={classNames("sreen__body--big", { flicker: step === 6 })}>{data.rxRight4}</span>
          </div>
        ) : (
          <div className="sreen__body--mid">
            <span className={classNames("sreen__body--big", { flicker: step === 7 })}>{data.txLeft}</span>.
            <span className={classNames("sreen__body--big", { flicker: step === 8 })}>{data.txRight1}</span>
            <span className={classNames("sreen__body--big", { flicker: step === 9 })}>{data.txRight2}</span>
            <span className={classNames("sreen__body--big", { flicker: step === 10 })}>{data.txRight3}</span>
            <span className={classNames("sreen__body--big", { flicker: step === 11 })}>{data.txRight4}</span>
          </div>
        )}

        <div className="sreen__body--right">
          <div>MHz</div>
          <div>
            <span className="sreen__body--watt">{data.watt ? "5" : "20"}</span>
            <span>w</span>
          </div>
        </div>
      </section>
      <section className="sreen__footer">
        <div className="sreen__footer--mode">
          {MODE.map((item, index) => (
            <span key={index} className={classNames({ active: data.mode !== index })}>
              {item}
            </span>
          ))}
        </div>
        <div>14.8v</div>
      </section>
      <div className={classNames("sreen__mask", { active: active })} />
    </div>
  );
};

export default Sreen;
