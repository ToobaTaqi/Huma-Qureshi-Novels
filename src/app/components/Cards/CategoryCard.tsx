import Image from 'next/image'
import React from 'react'

export default function CategoryCard() {
  return (
    <div className='relative  flex flex-col items-center'>
      <img src="https://cdn.pixabay.com/photo/2018/07/11/16/53/book-3531412_1280.jpg" className="w-[150px] h-[130px] bg-secondary flex items-center justify-center text-2xl text-wrap text-center object-cover" alt='' width={100} height={100}/>
      <h2 className='absolute top-[40px] bg-secondary rounded text-primary px-3 py-2 text-bold'>Category name</h2>
    </div>
  )
}
