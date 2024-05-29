import { useMemo, useState } from 'react';
import './UsememoApp.scss';
const UsememoApp = () => {
  console.log('UsememoApp - render......');

  const [number, setNumber] = useState(0);
  const [israndom, setIsrandom] = useState(false);

  const randomWithoutMemo = Math.random();
  const randomNumber = useMemo(() => {
    console.log('call useMemo <===============');
    return Math.random();
  }, [israndom]);

  // israndom change randomNumber will be excetuted

  return (
    <div className='UsememoApp'>
      <h1> UsememoApp </h1>
      <div className='lorem'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae non sed, eius corrupti recusandae aspernatur? Nihil ut suscipit ea! Perferendis, praesentium minima similique quaerat necessitatibus recusandae suscipit tempora vel quibusdam.
      </div>

      <div className='inputs'>

        <button onClick={() => setNumber(number - 1)}>down</button>
        <span>{number}</span>
        <button onClick={() => setNumber(number + 1)}>up</button>

      </div>

      <div className="results">
        <div className='textTeal'> {randomWithoutMemo} </div>

        <div className='textBlue'> {randomNumber} </div>
      </div>

      <div className='inputs'>
        <button onClick={() => setIsrandom(!israndom)} >
          new random
        </button>
      </div>

    </div>
  )
}
export default UsememoApp;