import { ChangeEvent, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Cookies from 'js-cookie'
import axios from 'axios'

import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { Layout } from '../components/layouts'

interface Props {
  theme: 'light' | 'dark' | 'custom'
}

const ThemeChanger: NextPage<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = e.target.value as Props['theme']
    setCurrentTheme(selectedTheme)
    Cookies.set('COOKIE_MASTER-theme', selectedTheme)
  }

  const handleRequestClick = async () => {
    const { data } = await axios.get('/api/hello')
  }

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

          <Button onClick={handleRequestClick}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { 'COOKIE_MASTER-theme': theme = 'light' } = req.cookies

  const validThemes = ['light', 'dark', 'custom']

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark'
    }
  }
}

export default ThemeChanger
