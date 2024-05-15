import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import _ from "lodash";
import data from "./data.json"; // assert {type: 'json'};

import "./main.scss";

// GENERATE 1 NUMBER EXCEPT PREV NUMBER FROM JSON

// eslint-disable-next-line no-extend-native
String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

let timer = null;

const Main = () => {
  const [prevs, setPrevs] = useState([]);
  const [win, setWin] = useState(0);
  const [fails, setFails] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    console.log(data);

    return () => {
      timer = null;
    };
  }, []);

  const runFirework = () => {
    try {
      var duration = 2 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    } catch (error) {}
  };

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  const gen = () => {
    try {
      if (_.isEmpty(prevs)) {
        setWin(-1);
        return;
      }

      let _fails = [];
      let _num = -3;

      do {
        _num = _.random(1, 99);

        _fails.push(_num);

        if (prevs.includes(_num) === true) {
          // setFails((p) => {
          //   return [_num, ...p];
          // });

          // _fails.push(_num);

          if (_fails.length > 20) {
            break;
          }
        }
      } while (prevs.includes(_num) === true);

      setWin(_num);
      setFails(_fails);

      runFirework();
    } catch (error) {
      console.log(error);
    }
  };

  const loadJson = () => {
    try {
      let nums = [];

      // console.log("mode is " + process.env.NODE_ENV);     // if debug
      // nums = _.range(1, 90); // => [1, 2, 3, 4]
      // setPrevs(nums);
      // setWin(888888);
      // return;

      debugger;

      data.forEach((ele) => {
        debugger;
        let win1 = String(ele.win1).reverse().substring(0, 2);
        let win2 = String(ele.win2).reverse().substring(0, 2);

        // let win1 = reverseString(ele.win1).substring(0, 2);
        // let win2 = reverseString(ele.win2).substring(0, 2);
        nums.push(parseInt(reverseString(win1)));
        nums.push(parseInt(reverseString(win2)));
      });
      console.dir(nums);
      setPrevs(nums);
      setWin(999999);
    } catch (error) {
      setWin(-2);
    }
  };

  // timer utility
  const handleStartTimer = () => {
    if (isRunning === true) {
      handleStopTimer();
      return;
    }

    setIsRunning(true);

    timer = setInterval(() => {
      let num = _.random(0, 9);
      setFirst(num);
      num = _.random(0, 9);
      setSecond(num);
    }, 30);
  };

  const handleStopTimer = () => {
    if (isRunning === false) return;
    setIsRunning(false);

    clearInterval(timer);
    timer = null;
  };

  return (
    <div className="main">
      <div className="wrapper">
        <div className="pre">
          <button onClick={handleStartTimer}>start/stop testing</button>
          <div>
            <span>{first}</span>
            <span>{second}</span>
          </div>
        </div>

        <button onClick={loadJson}>READ JSON</button>
        <button onClick={gen}>GENERATE RANDOM NUMBER</button>

        <span className="win">{_.padStart(win, 2, "0")}</span>
        <span className="fails">{fails.join(", ")}</span>
        <span className="prevs">{prevs.join(", ")}</span>
      </div>

      {/* <h1> main </h1>

      <span>Lorem ipsum dolor sit amet.</span>

      <span className="link">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum,
        aperiam
      </span>

      <div className="lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        asperiores voluptates, tempora molestias totam aspernatur fugit iure
        velit, veniam dicta illum, corrupti eius suscipit laboriosam itaque quia
        magnam nesciunt assumenda?
      </div> */}
    </div>
  );
};
export default Main;
