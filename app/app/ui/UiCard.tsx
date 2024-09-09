import React from 'react'
import { Card, CardContent, CardHeader } from '../settings/_components/SettingsCard'

const UiCard = () => {
  return (
    <Card className='w-[600px]'>
      <CardHeader>Header</CardHeader>
      <CardContent>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </CardContent>
    </Card>
  )
}

export default UiCard