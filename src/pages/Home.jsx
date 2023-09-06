import React from 'react'
import { Layout } from '../layout/Layout'
import HeroSlider from '../components/ui/HeroSlider'
import Cta from '../components/ui/Cta'
import Quotes from '../components/ui/Quotes'
import Subscribe from '../components/ui/Subscribe'

export const Home = () => {
  return (
    <Layout>
        <HeroSlider />
        <Quotes />
        <Cta />
        <Subscribe />
    </Layout>
  )
}
