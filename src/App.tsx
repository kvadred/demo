import { useState } from 'react'
import './global.css'
import { CalculatorPage } from './modules/calculator/CalculatorPage'
import { Navbar } from './common/components/Navbar'
import { MarketPlacePage } from './modules/marketplace/MarketplacePage'

export const App = (): JSX.Element => {
  const [nav, setNav] = useState('planner')
  return (
    <div className='background-container'>
      <div className='app-container'>
        <section style={{ marginBottom: '1rem' }}>
          <Navbar nav={nav} setNav={setNav} />
        </section>
        {nav === 'planner' && <CalculatorPage />}
        {nav === 'marketplace' && <MarketPlacePage />}
      </div>
    </div>
  )
}
