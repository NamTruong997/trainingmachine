import { faArrowDown, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { generateData, getNumber, getRange } from "untils/logic";
import Sreen, { ScreenDataType } from "../screen/Sreen";
import "./MainPage.scss";
const CHANEL_COUNT = 23;
const MODEL_COUNT = 3;
const STEPS = ["chanel", "rxLeft", "rxRight1", "rxRight2", "rxRight3", "rxRight4", "txLeft", "txRight1", "txRight2", "txRight3", "txRight4"];
const Swal = require("sweetalert2");

let chanelDef = localStorage.getItem("chanel") || "0";

const SignInPage = () => {
  const [active, setActive] = useState<boolean>(false);
  const [done, setDone] = useState<number>(-1);
  const [step, setStep] = useState<number>(0);
  const [wri, setWri] = useState<number>(0);
  const [chanel, setChanel] = useState(parseInt(chanelDef));
  const [pre, setPre] = useState<boolean>(false);
  const [data, setData] = useState<ScreenDataType>();
  // Input data
  useEffect(() => {
    let storedData = localStorage.getItem("chanels");
    let chanel = parseInt(chanelDef);
    if (storedData && !isEmpty(JSON.parse(storedData))) {
      let parsedData = JSON.parse(storedData);
      setData(parsedData[chanel]);
    } else {
      // Chua co localstore
      let data = generateData();
      let dataStore = { [chanel]: data };
      localStorage.setItem("chanels", JSON.stringify(dataStore));
      setData(data);
    }
  }, []);

  const onActive = () => {
    setActive(!active);
  };

  const onPre = () => {

    if (!pre) {
      setPre(true);
      setDone(-1)

      wri === 0 && setStep(1);
    } else {
      setPre(pre);
    }
  };

  const onArrowRight = () => {
    if (pre) {
      if (wri === 0 && step === 6) {
        setStep(2);
        return;
      }
      if (wri === 1 && step === 11) {
        setStep(7);
        return;
      }
      setStep(step + 1);
    }
  };

  const getDataByChanel = (val: any) => {
    let store = JSON.parse(localStorage.getItem("chanels")!);

    if (!isEmpty(store[val])) {
      setData(store[val]);
    } else {
      let newData: ScreenDataType = generateData();
      setData(newData);
      console.log(newData);

      localStorage.setItem("chanels", JSON.stringify({ ...store, ...{ [val]: newData } }));
    }
  };

  const onDone = () => {
    if ( wri === 2) {
      let storeData = JSON.parse(localStorage.getItem('chanels')!)
      let newStore = {...storeData, ...{[chanel]: data}}
      localStorage.setItem('chanels', JSON.stringify(newStore));
      localStorage.setItem('chanel', chanel.toString());
      setDone(0)
      setTimeout(() => {
        setDone(1);

        setTimeout(() => {
          Swal.fire("Good job!", "Updated data successfully!", "success");
          setWri(0);
          setStep(0);
          setPre(false);
        }, 1000);
      }, 1000);
    }
    
  };
  const onMode = () => {

    if (step !== 0) {
      if (!pre && step === 100) {
        if (data?.mode === MODEL_COUNT) {
         
          setData({...data!,...{mode: 0}})
        } else setData({...data!,...{mode: data?.mode! + 1}})
      }
      if (pre && step === 100) {
        setData({ ...data!, watt: !data?.watt});
        setPre(false);
      }
    }
  };

  const onDownChanel = () => {
    if (step < 2) {
      // View mode
      if (chanel === 0) {
        setChanel(CHANEL_COUNT);
        if (!pre){
          getDataByChanel(CHANEL_COUNT);
        }
      } else {
        setChanel(chanel - 1);
        if (!pre){
          getDataByChanel(chanel - 1);
        }
      }
     
    } else {
      let stepName = STEPS[step - 1];
      let range = getRange(stepName);
      let obj: any = data;
      let newData: ScreenDataType = { ...data!, ...{ [stepName]: getNumber(range.min, range.max, false, obj[stepName]) } };
      setData(newData);
    }
  };

  const onUpChanel = () => {
    if (step < 2) {
      // View mode
      if (chanel === CHANEL_COUNT) {
        setChanel(0);
        if (!pre){
          getDataByChanel(0);
        }
      } else {
        setChanel(chanel + 1);
        if (!pre){
          getDataByChanel(chanel + 1);
        }
      }
    } else {
      let stepName = STEPS[step - 1];
      let range = getRange(stepName);
      let obj: any = data;
      let newData: ScreenDataType = { ...data!, ...{ [stepName]: getNumber(range.min, range.max, true, obj[stepName]) } };
      setData(newData);
    }
  };

  const onWri = () => {
    if (pre) {
      if (wri === 0) {
        //Auto fill for Tx
        let autoTx = {
          txLeft: data!.rxLeft,
          txRight1: data!.rxRight1,
          txRight2: data!.rxRight2,
          txRight3: data!.rxRight3,
          txRight4: data!.rxRight4,
        };
        setData({ ...data!, ...autoTx });
        setWri(1);
        setStep(7);
      }
      if (wri === 1) {
        setWri(2);
        setPre(false);
        setStep(100);
      }
    }
  };

  return (
    <div className="mainpage">
      <section className="mainpage__left">
        <input type="radio" id="power1" name="direct" />
        <label htmlFor="power1" onClick={onDone}>
          TUNE
        </label>

        <input type="radio" id="power2" name="direct" />
        <label htmlFor="power2" onClick={onActive}>
          {active ? "ON" : "OFF"}
        </label>
      </section>
      <section className="mainpage__mid">
        {data  && <Sreen active={active} pre={pre}  chanel={chanel} step={step} wri={wri} data={data} done={done}/>}

        <div className="mainpage__direct">
          <input type="radio" id="direct1" name="direct" />
          <label htmlFor="direct1" onClick={onArrowRight}>
            <FontAwesomeIcon icon={faArrowRight} />
          </label>

          <input type="radio" id="direct2" name="direct" />
          <label htmlFor="direct2" onClick={onUpChanel}>
            <FontAwesomeIcon icon={faArrowUp} />
          </label>

          <input type="radio" id="direct3" name="direct" />
          <label htmlFor="direct3" onClick={onDownChanel}>
            <FontAwesomeIcon icon={faArrowDown} />
          </label>

          <input type="radio" id="direct4" name="direct" />
          <label htmlFor="direct4" onClick={onPre}>
            PRE
          </label>
        </div>
      </section>

      <section className="mainpage__right">
        <input type="radio" id="mode1" name="direct" />
        <label htmlFor="mode1" onClick={onMode}>
          MODE
        </label>

        <input type="radio" id="mode2" name="direct" />
        <label htmlFor="mode2">SCAN</label>

        <input type="radio" id="mode3" name="direct" />
        <label htmlFor="mode3">BLIT</label>

        <input type="radio" id="mode4" name="direct" />
        <label htmlFor="mode4" onClick={onWri}>
          WRI
        </label>
      </section>
    </div>
  );
};

export default SignInPage;
