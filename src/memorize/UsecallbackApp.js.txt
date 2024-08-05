import { memo, useCallback, useState } from 'react';
import './UsecallbackApp.scss';
const UsecallbackApp = () => {
  console.log('UsecallbackApp - render...');

  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleUpdated = useCallback(
    (e) => {
      console.log('=========> UsecallbackApp.handleUpdated() - useCallback ');
      setText(e.target.value);

      console.log('email', email);
      console.log('count', count);
    },
    [count, email]
  );
  // when count changed, expensive component will be rendered

  return (
    <div className="UsecallbackApp">
      <h1> UsecallbackApp </h1>
      <div className="inputs">
        <button onClick={() => setCount(count + 1)}>{count}</button>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* handleUpdated function created only 1 time, so ExpensiveApp component will be rendered 1 time too   */}
      <ExpensiveApp onUpdated={handleUpdated} />

      <div className="results">
        <span>{text}</span>
        <span>{count}</span>
        <span>{email}</span>
      </div>
    </div>
  );
};
export default UsecallbackApp;

const ExpensiveApp = memo(({ onUpdated }) => {
  console.log('ExpensiveApp - render...');

  return (
    <div className="inputs" style={{ backgroundColor: 'blue', padding: '5px' }}>
      <input placeholder="ExpensiveApp" type="text" onChange={onUpdated}></input>
      <span className="textWhite">{new Date().toISOString()}</span>
    </div>
  );
});
