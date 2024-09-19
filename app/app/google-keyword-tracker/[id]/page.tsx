
import React from 'react'

const page = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  return (
    <div>{id}</div>
  )
}

export default page