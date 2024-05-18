import { useEffect, useState } from 'react';
import _ from 'lodash'


import './main3.scss';
// import { Button } from 'react-bootstrap';
// import useGenerator from './useGenerator';


const Main3 = () => {

  const [start, setStart] = useState(false);

  // let generator = useGenerator(start);

  // // what is useEffect parameter ?
  // useEffect((p1) => {
  //   debugger;
  //   console.log('what is generator return ? what is handlerTimer ')
  // }, [generator])

  let [res] = useGenerator(start);

  useEffect(() => {
    // debugger;
    console.log(`generator return ${res} `)
  }, [res])

  return (
    <div className='main3'>

      <div class="wrapper">
        <h1> Main3 </h1>
        <h1>
          {res}
        </h1>
        <button
          style={{
            color: start === true ? 'blue' : 'red',
            borderColor: start === true ? 'blue' : 'red'
          }}
          onClick={() => setStart(!start)} >
          {start === true ? "on" : "off"}
        </button>


      </div>

    </div>
  )
}

export default Main3;


let handlerTimer = null;
const useGenerator = (cb = false) => {
  // console.log('re-generate useGenerator now');
  const [res, setRes] = useState(0);

  useEffect(() => {
    if (cb === false) {
      if (handlerTimer) {
        clearTimeout(handlerTimer);
      }
    } else {
      handlerTimer = setInterval(() => {
        let n = _.random(0, 1000)
        console.log(`new random ${n} `);
        setRes(n)
      }, 50);
    }

    return () => {
      console.log('clearTimeout NOW!')
      clearTimeout(handlerTimer);
    };
  }, [cb]);

  return [res];

}