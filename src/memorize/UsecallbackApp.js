import { memo, useCallback, useState } from 'react';
import './UsecallbackApp.scss';
const UsecallbackApp = () => {
  console.log('UsecallbackApp - render...')
  const [text, setText] = useState('');

  const handleUpdated = useCallback((e) => {
    setText(e.target.value)
  }, [])

  return (
    <div className='UsecallbackApp'>
      <h1> UsecallbackApp </h1>

      {/* handleUpdated function created only 1 time
      so ExpensiveApp component will be rendered 1 time too
      */}
      <ExpensiveApp onUpdated={handleUpdated} />

      <div className='results'>
        {text}
      </div>

    </div>
  )
}
export default UsecallbackApp;

const ExpensiveApp = memo(({ onUpdated }) => {
  console.log('ExpensiveApp - render...')

  return (
    <div className='inputs'>
      <input type="text" onChange={onUpdated} ></input>
    </div>
  )
})