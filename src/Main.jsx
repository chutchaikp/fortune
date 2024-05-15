import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import _ from "lodash";
import data from "./data.json"; // assert {type: 'json'};

import "./main.scss";
import toast, { Toaster } from "react-hot-toast";

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
  const saveSettings = () =>
    new Promise((resolve) => setTimeout(resolve, 120 * 1000));
  const handleStartTimer = () => {
    if (isRunning === true) {
      handleStopTimer();

      // toast.success("Successfully created!");

      // toast.promise(saveSettings(), {
      //   loading: "Saving...",
      //   success: <b>Settings saved!</b>,
      //   error: <b>Could not save.</b>,
      // });

      toast("Hello Darkness!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

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

  //   const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
  // toast.promise(
  //     resolveAfter3Sec,
  //     {
  //       pending: 'Promise is pending',
  //       success: 'Promise resolved 👌',
  //       error: 'Promise rejected 🤯'
  //     }
  // )

  // const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
  // toast.promise(
  //     functionThatReturnPromise,
  //     {
  //       pending: 'Promise is pending',
  //       success: 'Promise resolved 👌',
  //       error: 'Promise rejected 🤯'
  //     }
  // )

  // How to Promise
  // const saveSettings = () =>
  //   new Promise((resolve) => setTimeout(resolve, 120 * 1000));

  // TODO
  // https://marcuscode.com/lang/javascript/promise
  function evenPromise(number) {
    return new Promise((resolve, reject) => {
      if (number % 2 == 0) {
        resolve(`${number} is an even number`);
      } else {
        reject(new Error(`${number} is not an even number`));
      }
    });
  }
  evenPromise(2)
    .then((value) => {
      console.log(value);
    })
    .catch((err) => {
      console.log(err.toString());
    });

  evenPromise(3)
    .then((value) => {
      console.log(value);
    })
    .catch((err) => {
      console.log(err.toString());
    });

  // xxxxxxxxxxxxxxxxxxxx
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  toast.promise(
    resolveAfter3Sec,
    {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    },
    {
      position: toast.POSITION.BOTTOM_CENTER,
      icon,
    }
  );

  const functionThatReturnPromise = () =>
    new Promise((resolve, reject) => setTimeout(reject, 3000));
  toast.promise(
    functionThatReturnPromise,
    {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    },
    {
      position: toast.POSITION.BOTTOM_CENTER,
    }
  );

  return (
    <div className="main">
      <div className="wrapper">
        <div className="pre">
          {/* TODO: toast wirh promise */}
          {/* TODO: how to capture clicking outside the button */}
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

      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
    </div>
  );
};
export default Main;
