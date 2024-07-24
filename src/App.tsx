import './global.css'
import { CalculatorPage } from './modules/calculator/CalculatorPage'
import { MainLayout } from './modules/marketplace/MainLayout'
import { MarketPlacePage } from './modules/marketplace/MarketplacePage'

export const App = (): JSX.Element => {
  return (
    <div className='background-container'>
      <div className='app-container'>
        <CalculatorPage />
        {/* <MarketPlacePage /> */}
      </div>
    </div>
  )
}
