// theme colors // C:\Users\wit\AppData\Local\Programs\Microsoft VS Code\resources\app\extensions\theme-defaults\themes

import { useEffect, useState, useRef } from 'react';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

import data from './data.json'; // assert {type: 'json'};

import './main5.scss';

// eslint-disable-next-line no-extend-native
String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

const Main5 = () => {
  console.log('Main4 - render...');
  return (
    <div className="main5">
      <div className="wrapper">
        {/* memo working */}
        <JsxComponent />
      </div>
    </div>
  );
};

export default Main5;

let weight1 = [];
let weight2 = [];

const JsxComponent = () => {
  // console.log('JsxComponent - render...');

  const interval = useRef();

  const [prevs1, setPrevs1] = useState([]);
  const [prevs2, setPrevs2] = useState([]);

  const [winWeight1, setWinWeight1] = useState(0);
  const [weight1Counter, setWeight1Counter] = useState(0);

  const [winWeight2, setWinWeight2] = useState(0);
  const [weight2Counter, setWeight2Counter] = useState(0);

  const stop = () => {
    toast('OK', { icon: '👏👏👏' });
    clearInterval(interval.current);
  };

  useEffect(() => {
    console.log(`Weight counter: ${weight1Counter}`);
    if (weight1Counter > 188) {
      stop();
      setWeight1Counter(0);
    }
  }, [weight1Counter]);

  useEffect(() => {
    console.log(`Weight2 counter: ${weight2Counter}`);
    if (weight2Counter > 188) {
      stop();
      setWeight2Counter(0);
    }
  }, [weight2Counter]);

  useEffect(() => {
    let nums = [];
    data.forEach((ele) => {
      let win1 = ele.win1.reverse().substring(0, 2);
      let win2 = ele.win2.reverse().substring(0, 2);

      nums.push(win1.reverse());
      nums.push(win2.reverse());
    });

    // 1 digit
    const firsts = nums.map((str) => str.substring(0, 1));
    setPrevs1(firsts);
    // const seconds = nums.map((str) => str.substring(1, 1) )
    // setPrevs1(seconds);

    const counts = {};
    // const sampleArray = ['a', 'a', 'b', 'c'];
    firsts.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    console.log(counts);

    let max = 0;
    [...Array(10).keys()].forEach((x, idx) => {
      if (counts[idx] > max) {
        max = counts[idx];
      }
    });

    console.log(`Max is ${max}`);

    // let weight1 = [];
    [...Array(10).keys()].forEach((x, idx) => {
      try {
        const n = counts[idx] === undefined ? max : max - counts[idx];
        for (let index = 0; index < n; index++) {
          weight1.push(idx);
        }
      } catch (error) {
        console.log(error);
      }
    });

    // random number in weight
    var item = weight1[Math.floor(Math.random() * weight1.length)];
    console.log(item);
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    let nums = [];
    data.forEach((ele) => {
      let win1 = ele.win1.reverse().substring(0, 2);
      let win2 = ele.win2.reverse().substring(0, 2);

      nums.push(win1.reverse());
      nums.push(win2.reverse());
    });

    // first digit
    // const firsts = nums.map((str) => str.substring(0, 1));
    // setPrevs1(firsts);
    // second digit
    const seconds = nums.map((str) => str[1]);
    setPrevs2(seconds);

    // group by & count
    const counts = {};
    seconds.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    console.log(counts);

    // find max
    let max = 0;
    [...Array(10).keys()].forEach((x, idx) => {
      if (counts[idx] && counts[idx] > max) {
        max = counts[idx];
      }
    });

    console.log(`Max is ${max}`);

    // let weight1 = [];
    [...Array(10).keys()].forEach((x, idx) => {
      try {
        const n = counts[idx] === undefined ? max : max - counts[idx];
        for (let index = 0; index < n; index++) {
          weight2.push(idx);
        }
      } catch (error) {
        console.log(error);
      }
    });

    // random number in weight
    var item = weight1[Math.floor(Math.random() * weight1.length)];
    console.log(item);
    return () => {
      stop();
    };
  }, []);

  // useEffect(() => {
  //   console.log(`counter ${counter} n ${num}`);
  //   if (counter > 100 && !prevs.includes(num)) {
  //     stop();
  //   }
  // }, [counter, num, prevs]);

  // const handleInterval = (e) => {
  //   try {
  //     e.preventDefault();
  //     if (counter > 0 && counter < 100) {
  //       clearInterval(interval.current);
  //       setCounter(0);
  //       return;
  //     }
  //     if (counter > 100) {
  //       setCounter(0);
  //     }
  //     interval.current = setInterval(() => {
  //       let n = _.random(1, 99);
  //       console.log(`new random ${n} `);
  //       setCounter((c) => c + 1);
  //       setNum(n);
  //     }, 50);
  //   } catch (error) {
  //     console.log(error);
  //     stop();
  //   }
  // };

  const handleWeight1 = (e) => {
    try {
      e.preventDefault();

      if (weight1Counter > 0 && weight1Counter < 188) {
        clearInterval(interval.current);
        setWeight1Counter(0);
        return;
      }
      if (weight1Counter > 188) {
        setWeight1Counter(0);
      }

      interval.current = setInterval(() => {
        let n = weight1[Math.floor(Math.random() * weight1.length)];
        // console.log(`new random ${n} `);
        setWeight1Counter((w) => w + 1);
        setWinWeight1(n);
      }, 30);
    } catch (error) {
      console.log(error);
      stop();
    }
  };

  const handleWeight2 = (e) => {
    try {
      e.preventDefault();

      if (weight2Counter > 0 && weight2Counter < 188) {
        clearInterval(interval.current);
        setWeight2Counter(0);
        return;
      }
      if (weight2Counter > 188) {
        setWeight2Counter(0);
      }

      interval.current = setInterval(() => {
        let n = weight2[Math.floor(Math.random() * weight2.length)];
        console.log(`n for winWeight2 is ${n}`);
        setWeight2Counter((w) => w + 1);
        setWinWeight2(n);
      }, 20);
    } catch (error) {
      console.log(error);
      stop();
    }
  };

  return (
    <div className="jsx-component">
      <div className="buttons">
        <button className="buttonx" onClick={handleWeight1}>
          <span className="win">{winWeight1}</span>
        </button>
        <button className="buttonx" onClick={handleWeight2}>
          <span className="win">{winWeight2}</span>
        </button>
      </div>

      {/* <div className="counter">
        {_.range(1, counter).map((c, inx) => {
          return (
            <div key={inx.toString()} className="dot">
              .
            </div>
          );
        })}
      </div>
      <p>{prevs.join(', ')}</p> */}

      <div className="witems">
        <WeightBox isGroup={false} data={prevs1} />
        <WeightBox isGroup={true} data={weight1} />

        <WeightBox isGroup={false} data={prevs2} />
        <WeightBox isGroup={true} data={weight2} />
      </div>

      <div className="status">
        <Toaster position="top-right">
          {(t) => (
            <ToastBar
              style={{
                borderRadius: '20px',
                background: '#546',
                color: '#fff',
              }}
              toast={t}
            >
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {/* {t.type !== "loading" && (
                    <button onClick={() => toast.dismiss(t.id)}>X</button>
                  )} */}
                  {/* {t.type === "loading" && <span>waiting ...</span>} */}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
      </div>
    </div>
  );
};

const WeightBox = ({ data, isGroup = true }) => {
  const renderData = () => {
    return data.map((d, idx) => {
      // if (parseInt(data[idx]) === 1 && isGroup === true) {
      //   debugger;
      // }
      if (typeof data[idx - 1] === 'number' && isGroup === true && data[idx - 1] !== data[idx]) {
        return <span> xx {d}</span>;
      } else {
        return <span>{d}</span>;
      }
    });
  };

  return <div className={isGroup === true ? 'witemGroup' : 'witem'}>{renderData()}</div>;
};
