import { useEffect, useState } from 'react';
import _ from 'lodash'

import './main3.scss';

const Main3 = () => {
  console.log('Main3 > re-render')

  const [counter, setCounter] = useState(0);

  const [start, setStart] = useState(false);

  // // what is useEffect parameter ?
  // useEffect((p1) => {
  //   debugger;
  //   console.log('what is generator return ? what is handlerTimer ')
  // }, [generator])

  // custom hook
  // re-render in it everytime

  const [res] = useGenerator(start, counter);

  useEffect(() => {
    // debugger;
    console.log(`=========== random ============= ${_.padStart(res, 5, '0')} `)
  }, [res])

  useEffect(() => {
    console.log(`Main3 useEffect[]`);

  }, [])

  // const [data] = Generator(counter);

  const f1 = () => {
    console.log(`Main3 f1`);

  }
  let f2 = () => {
    console.log(`Main3 f2`);

  }
  var f3 = () => {
    console.log(`Main3 f3`);

  }

  // run this everytime
  // (() => {
  //   console.log(`Mainx fx`);
  // })()

  function f4() {
    console.log('Main3 f4');
  }

  const handleCounter = () => {
    console.log('handleCounter')
    setCounter((prev) => prev + 1)
  }

  return (
    <div className='main3'>

      <div className="wrapper">
        <h1> Main3 </h1>
        <h1> Generator {res} </h1>
        {/* <h1> Counter {counter} </h1> */}
        {/* <h1> data {data}</h1> */}

        <button
          style={{
            color: start === true ? 'blue' : 'red',
            borderColor: start === true ? 'blue' : 'red'
          }}
          onClick={() => setStart(!start)} >
          {start === true ? "on" : "off"}
        </button>

        <div className="counter">
          <button onClick={handleCounter}>{counter}</button>
          <button onClick={f1}>f1</button>
          <button onClick={f2}>f2</button>
        </div>

      </div>


    </div>
  )
}

export default Main3;





//////////////////////////////////////////////////
let handlerTimer = null;
const useGenerator = (cb = false, c) => {
  console.log(`useGenerator re-render, while counter ${c} `);
  const [res, setRes] = useState(0);

  useEffect(() => {
    console.log('useGenerator useEffect[cb]');
    if (cb === false) {
      if (handlerTimer) {
        clearTimeout(handlerTimer);
        handlerTimer = null;
      }
    } else {
      handlerTimer = setInterval(() => {
        let n = _.random(0, 1000)
        console.log(`new random ${n} `);
        setRes(n)
      }, 1000);
    }

    return () => {
      console.log('clearTimeout NOW!')
      clearTimeout(handlerTimer);
      handlerTimer = null;
    };
  }, [cb]);

  console.log(`useGenerator return ${res} while counter is ${c} `);
  return [res];
}

const Generator = (cb = false) => {
  console.log('Generator re-render');
  const [data, setData] = useState(0);
  // const [data2, setData2] = useState(0);

  // useEffect(() => {
  //   console.log('Generator useEffect[]');
  // }, [])

  // useEffect(() => {
  //   console.log(`Generator useEffect[cb] and cb is ${cb} `);
  //   setData(cb)
  // }, [cb]);

  // useEffect(() => {
  //   console.log('Generator useEffect[data2]');
  // }, [data2])

  console.log(`Generator return ${data}`);
  return [data];
}