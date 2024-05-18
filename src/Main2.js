// import './main2.scss';
// const Main2 = () => {
//   return (
//     <div className='main2'>
//       <h1> Main2 </h1>      
//     </div>
//   )
// }
// export default Main2;

import { useEffect, useState } from "react";

import _ from "lodash";
// import data from "./data.json"; // assert {type: 'json'};

import "./main2.scss";
import toast, { ToastBar, Toaster } from "react-hot-toast";

// GENERATE 1 NUMBER EXCEPT PREV NUMBER FROM JSON

let timer = null;
let globalAll = []
let globalVar = 0;

const Main = () => {

  const [win2, setWin2] = useState(0);


  const [win, setWin] = useState(0);
  const [all, setAll] = useState([]);


  // const [win, setWin] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // console.log(data);

    return () => {
      timer = null;
    };
  }, []);

  useEffect(() => {

  }, [win])

  useEffect(() => {

    if (globalAll.length > 30 && win < 5) {
      stop();
    }
  }, [all, win])

  useEffect(() => {

    console.log('win2 value in useEffect ' + win2);
    console.log(' globalVar in useEffect ' + globalVar);
  }, [win2])

  const handleWin2 = () => {

    setTimeout(() => {
      console.log('old win2 value in setTimeout ' + win2);
      console.log('old globalVare in setTimeout ' + globalVar);

      var _num = _.random(0, 99)
      setWin2(_num)
      globalVar = _num;

      console.log('new win2 value in setTimeout ' + win2);
      console.log('new globalVar in setTimeout ' + globalVar);
    }, 2000)

  }

  const start = () => {
    if (isRunning === true) {
      stop();
      return;
    }

    setIsRunning(true);
    setAll([])

    console.log('before');

    timer = setInterval(() => {
      let num = _.random(1, 99);
      setWin(num)
      globalAll = [...globalAll, num]
      setAll(globalAll)

      console.log('all.length ' + all.length) // can't access state value
    }, 60);

    console.log('after');

  };

  const stop = () => {
    if (isRunning === false) return;
    setIsRunning(false);

    clearInterval(timer);
    timer = null;
    // setAll([])
    globalAll = []

    toast("Timer Stoped!");
  };


  // // -------------------------------------------------------------------
  // // Check diff 2 below
  // // variable
  // // execute function "resolveAfter3Sec" only 1 time only
  // const resolveAfter3Sec = new Promise((resolve, reject) => {
  //   console.log(
  //     "resolveAfter3Sec - set time out 3 seconds now at " +
  //     new Date().toISOString()
  //   );
  //   setTimeout(resolve, 3000);
  // });
  // const handleToast1 = () => {

  //   toast.promise(resolveAfter3Sec, {
  //     // pending: "Promise is pending",
  //     loading: "Promise is loading xxx",
  //     success: "Promise resolved 👌",
  //     error: "Promise rejected 🤯",
  //   });
  // };

  // // function
  // // execute "functionThatReturnPromise" every time
  // const functionThatReturnPromise = () => {
  //   return new Promise((resolve, reject) => {
  //     console.log(
  //       "functionThatReturnPromise - set time out 3 seconds now at " +
  //       new Date().toISOString()
  //     );
  //     // Do AJAX
  //     setTimeout(resolve, 3000);
  //   });
  // };

  // const handleToast2 = () => {
  //   toast.promise(functionThatReturnPromise(), {
  //     loading: "Promise is loading",
  //     // pending: "Promise is pending",
  //     success: "Promise resolved 👌",
  //     error: "Promise rejected 🤯",
  //   });
  // };

  // const handleToast3 = () => {
  //   toast.success("this is message", { icon: "👏" });
  // };

  return (
    <div className="main2">

      <div className="box">


        <div style={{
          color: 'var(--cp-color-6)',
          // padding: '1rem', 
          // margin: '1rem',
          fontFamily: 'Lato, Tahoma, Arial, san-serif',
          // fontSize: '1.4rem',
          // fontWeight: '400',
          // lineHeight: '2rem',
          letterSpacing: '1px',
        }} >
          <p>
            Lorem ipsum dolor sit amet
            <span className="link2" >
              consectetur adipisicing elit.
            </span>
            Sapiente debitis placeat veniam nam sit magnam neque animi quaerat officia laborum ea, provident incidunt velit odit repudiandae ex quos quibusdam eveniet?
          </p>

          <button className="button">Try the Editor</button>
        </div>
      </div>

      <div className="wrapper">
        <button onClick={start}>start/stop</button>
        <span className="win">{_.padStart(win, 2, "0")}</span>
        <span className="all">{all.join(", ")}</span>
      </div>

      <div className="status">
        <Toaster position="bottom-left">
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
                  {t.type !== "loading" && (
                    <button onClick={() => toast.dismiss(t.id)}>X</button>
                  )}
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
export default Main;
