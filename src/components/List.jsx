/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export default function List({ listItems}) {
  return (
    listItems.map((item , index)=>(
        <div key={index} className='flex w-[90%] justify-between items-center my-[0.5em] m-auto'>
            <div className='w-[50%]'>{item.key} : </div>
            <div className='w-[50%]'>{item.value}</div>
        </div>
    ))
  )
}
