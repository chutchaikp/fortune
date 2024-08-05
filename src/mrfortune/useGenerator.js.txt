import { useEffect, useState } from "react";
import _ from 'lodash'

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
        console.log('');
        console.log(`random ${n} on ${new Date().toISOString()} `);
        setRes(n)
      }, 1000);
    }
    return () => {
      console.log('clearTimeout NOW!')
      clearTimeout(handlerTimer);
    };
  }, [cb]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     let n = _.random(1, 99)
  //     setRes(n)
  //   }, 2000)
  //   // debugger;
  //   // setRes(55)
  // }, [cb])

  // console.log('NOW return res is ' + res);

  return [res];

}

export default useGenerator