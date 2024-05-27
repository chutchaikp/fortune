// How to memo

import { memo, useState } from 'react';
import './MemorizeApp.scss';
const MemorizeApp = () => {
  console.log('MemorizeApp - render...')

  const [text, setText] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className='MemorizeApp'>
      <h1> MemorizeApp </h1>
      <div className='inputs'>
        <input type="text" onChange={e => setText(e.target.value)} />
        <input type="text" onChange={e => setEmail(e.target.value)} />
      </div>

      <div className='results'>
        <TextApp text={text} />
        <EmailApp email={email} />
      </div>

    </div>
  )
}
export default MemorizeApp;

const TextApp = memo(({ text }) => {
  console.log('TextApp - render...')

  return (
    <p>{text}</p>
  )
})

const EmailApp = memo(({ email }) => {
  console.log('EmailApp - render...')

  return (
    <p>{email}</p>
  )
})