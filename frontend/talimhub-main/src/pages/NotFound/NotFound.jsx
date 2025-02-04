import React from 'react'
import { Link } from 'react-router-dom'
import not from '../../assets/website/error.gif'
const NotFound = () => {
  return (
      <div className='h-full'>
          <div className="container flex flex-col items-center justify-center ">
              <img src={not} alt="" className='w-[500px] mt-8' />
              <h1 className="text-center font-bold tracking-wider text-slate-700 lg:text-[60px] md:text-[50px] text-[40px] dark:text-white">Page not found </h1>
              <Link to={'/'} className='mt-12 border px-6 py-2 shadow-md text-[20px] text-slate-700 dark:text-white'>Back to home</Link>

          </div>
    </div>
  )
}

export default NotFound