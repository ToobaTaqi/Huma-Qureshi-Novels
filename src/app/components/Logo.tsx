import Image from 'next/image'
import React from 'react'
import {icons} from "../assets/index"
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className='w-[100px] h-[100px] lg:self-start'>
      <Image src={icons.logo} alt='' width={100} height={100} className='w-[100px] h-[100px] object-contain'/>
    </Link>
  )
}
