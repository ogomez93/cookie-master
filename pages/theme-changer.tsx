import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'

import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { Layout } from '../components/layouts'

const ThemeChanger: NextPage = () => {
  const [currentTheme, setCurrentTheme] = useState('light')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setCurrentTheme(e.target.value)

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={handleChange}>
              <FormControlLabel value='light' control={<Radio />} label='light' />
              <FormControlLabel value='dark' control={<Radio />} label='dark' />
              <FormControlLabel value='custom' control={<Radio />} label='custom' />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default ThemeChanger
