import React from 'react'

export default function NovelBody({novelText}:{novelText:string}) {
  return (
   <div className="px-10 lg:px-24 text-right text-tertiary leading-12 whitespace-pre-wrap font-urdu">
        {/* <p dir="rtl">{paginatedText}</p> */}
        <p dir="rtl">{novelText}</p>
      </div>
  )
}
