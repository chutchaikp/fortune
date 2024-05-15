import { useEffect } from 'react';
import './page.scss';
const Page = () => {

  useEffect(() => {

    func2();

  }, [])

  const func1 = () => {

  }

  const func2 = (para1) => {

  }

  return (
    <div className='page'>
      <h1> Page </h1>

    </div>
  )
}
export default Page;