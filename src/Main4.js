
import { useEffect, useState, memo, useRef } from 'react';
import _ from 'lodash'
import data from "./data.json"; // assert {type: 'json'};

import './main4.scss';

// function reverseString(str) {
//   return str.split("").reverse().join("");
// }

// eslint-disable-next-line no-extend-native
String.prototype.reverse = function () {
  return this.split("").reverse().join("");
}

const Main4 = () => {

  console.log('Main4 > re-render')

  const [start, setStart] = useState(false);

  const [res] = useGenerator(start)


  console.log('Main4 > before-render --------------------')
  return (
    <div className='main4'>

      <div className="wrapper">

        {/* <button onClick={() => {
          console.warn(``)
          setStart(!start)
        }}>{start === true ? "on" : "off"}</button>
        <p> {res} </p> */}


        {/* <button onClick={handleInterval3}>hello</button>
        <hr />
       
        <h1> Main4 </h1>
        <button onClick={handleCounter}>{counter}</button> */}

        {/* memo working */}
        <JsxComponent />

      </div>


    </div>
  )
}

export default Main4;

// memo custom hook


// let handlerJsxInterval = null;

const JsxComponent = () => {
  console.log('JsxComponent > re-render');

  const interval = useRef()
  const [counter, setCounter] = useState(0);

  const [prevs, setPrevs] = useState([]);
  const [num, setNum] = useState(0);

  const stop = () => {
    clearInterval(interval.current)

    setCounter(0)
  }

  useEffect(() => {
    let nums = [];
    data.forEach((ele) => {

      let win1 = ele.win1.reverse().substring(0, 2);
      let win2 = ele.win2.reverse().substring(0, 2);

      nums.push(parseInt(win1.reverse()));
      nums.push(parseInt(win2.reverse()));
    });
    setPrevs(nums);

    return () => {
      stop()
    }
  }, [])

  useEffect(() => {
    console.log(`counter ${counter} n ${num}`);

    if (counter > 100 && !prevs.includes(num)) {
      stop();
    }

  }, [counter, num, prevs])

  const handleInterval = (e) => {
    try {
      e.preventDefault();

      // if ( interval.current) {
      if (counter > 0) {
        clearInterval(interval.current)
        setCounter(0)
        return
      }

      interval.current = setInterval(() => {
        let n = _.random(1, 99)
        console.log(`new random ${n} `);

        setCounter((c) => c + 1)
        setNum(n)

      }, 100);
    } catch (error) {
      console.log(error);
      stop();
    }

  }

  return (
    <div className='jsx-component' >
      <button className='buttonx' onClick={handleInterval}>
        <span className='text'>
          interval
        </span>

        <span className='counter'>
          {_.padStart(counter, 2, '0')}
        </span>

        <span className='win'>
          {_.padStart(num, 2, '0')}
        </span>

      </button>

      <p>
        {prevs.join(', ')}
      </p>
    </div>
  )
}

let handlerInterval = null;
const useGenerator = (cb = false) => {
  console.log(`useGenerator re-render,`);
  const [res, setRes] = useState(0);

  useEffect(() => {
    console.log('useGenerator useEffect[cb]');
    if (cb === false) {
      if (handlerInterval) {
        clearInterval(handlerInterval);
        handlerInterval = null;
      }
    } else {
      handlerInterval = setInterval(() => {
        let n = _.random(0, 100)
        console.log(`new random ${n} `);

        setRes(n)

        if (n < 10) {
          stop(handlerInterval)
        }
      }, 1000);
    }

    return () => {
      console.log('clearInterval NOW!')
      clearInterval(handlerInterval);
      handlerInterval = null;
    };
  }, [cb]);

  const stop = (handle) => {
    console.log('clearInterval NOW!')
    clearInterval(handle);
    handle = null;
  }

  console.log(`useGenerator return ${res} `);
  return [res];
}


