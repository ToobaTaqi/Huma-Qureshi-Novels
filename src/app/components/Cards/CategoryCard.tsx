import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryCard({categoryName,href}:{categoryName:any,href:string}) {
  return (
    <Link href={`/categories/${href}`} className='relative  flex flex-col items-center border border-primary active:border-secondary lg:hover:border-secondary w-fit'>
      <img src="https://cdn.pixabay.com/photo/2018/07/11/16/53/book-3531412_1280.jpg" className="w-[140px] lg:w-[180px] h-[130px] lg:h-[150px] bg-secondary flex items-center justify-center text-2xl text-wrap text-center object-cover" alt='' width={100} height={100}/>
      <h2 className='absolute top-[40px] lg:top-[45px] border border-secondary bg-secondary active:bg-tertiary  lg:hover:bg-tertiary lg:hover:text-secondary active:text-secondary rounded text-primary px-3 py-2 lg:px-5 lg:py-3 font-bold'>{categoryName}</h2>
    </Link>
  )
}
