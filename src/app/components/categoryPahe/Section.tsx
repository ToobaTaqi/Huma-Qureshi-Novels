import React from 'react'
import CategoryCard from '../Cards/CategoryCard'

export default function Section({name}:{name:string}) {
  return (
    <div className='flex flex-col gap-3'>
       <div className="flex items-center gap-3">
        <h2 className="text-3xl text-tertiary">{name}</h2>
        <div className="h-[2px] w-40 rounded-full bg-tertiary"></div>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  )
}
