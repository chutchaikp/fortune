
// theme colors
// C:\Users\wit\AppData\Local\Programs\Microsoft VS Code\resources\app\extensions\theme-defaults\themes

import { useEffect, useState, useRef } from 'react';
import _ from 'lodash'
import toast, { ToastBar, Toaster } from "react-hot-toast";

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
  console.log('Main4 > before-render --------------------')
  return (
    <div className='main4'>

      <div className="wrapper">

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

    toast("DONE", { icon: "👏" });

    clearInterval(interval.current)
    // setCounter(0)
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
    setNum(nums[0])

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
      if (counter > 0 && counter < 100) {
        clearInterval(interval.current)
        setCounter(0)
        return
      }
      if (counter > 100) {
        setCounter(0)
      }

      interval.current = setInterval(() => {
        let n = _.random(1, 99)
        console.log(`new random ${n} `);

        setCounter((c) => c + 1)
        setNum(n)

      }, 50);
    } catch (error) {
      console.log(error);
      stop();
    }

  }

  return (
    <div className='jsx-component' >
      <button className='buttonx' onClick={handleInterval}>

        <span className='win'>
          {_.padStart(num, 2, '0')}
        </span>

      </button>

      <div className='counter'>
        {/* {_.padStart(counter, 2, '0')} */}
        {_.range(1, counter).map(() => {
          return (<div className='dot'>
            {/* <img width={10} height={10}
              draggable="false"
              class="emoji"
              alt="😷"
              src="https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f637.svg" /> */}
            .
          </div>)
        })}
      </div>

      <p>
        {prevs.join(', ')}
      </p>


      <div className="status">
        <Toaster position="top-right">
          {(t) => (
            <ToastBar
              style={{
                borderRadius: "20px",
                background: "#546",
                color: "#fff",
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
  )
}




