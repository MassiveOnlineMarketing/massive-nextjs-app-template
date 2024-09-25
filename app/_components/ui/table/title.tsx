import React from 'react'

export const TableTitle = ({ heading }: { heading: string }) => {
  return (
    <div className="w-full mb-6 flex items-center border-b border-gray-200 ">
      <p className="mb-2 text-2xl leading-8 font-medium text-gray-800">
        {heading}
      </p>
    </div>
  )
}
