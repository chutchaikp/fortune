import { useState, memo, useCallback } from 'react';
import './debounceApp.scss';
import { useEffect } from 'react';
import React from 'react';
const DebounceApp = () => {
  console.log('DebounceApp - render')
  const [search, setSearch] = useState('');
  const handleChange = useCallback((val) => {
    console.log(val);
    setSearch(val)
  }, [])

  return (
    <div className='debounceApp'>
      <h1> Debounce </h1>

      {/* handleChange no change */}
      {/* so SearchBox component will not be re-render */}
      <SearchBox onCompleted={handleChange} />
      <p>{search}</p>
    </div>
  )
}
export default DebounceApp;

const useDebounce = (callback, delay) => {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceValue(callback)
    }, delay)

    return () => {
      clearTimeout(handle)
    }
  }, [callback, delay])

  return debounceValue
}

const SearchBox = memo(({ onCompleted }) => {
  console.log('SearchBox - render')
  const [searchVal, setSearchVal] = useState(``);

  const debounceValue = useDebounce(searchVal, 2000)

  useEffect(() => {
    onCompleted(debounceValue)
  }, [debounceValue, onCompleted])

  return (
    <input type="text" onChange={(e) =>
      setSearchVal(e.target.value)} />
  )
})