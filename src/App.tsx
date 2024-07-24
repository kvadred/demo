import './global.css'
import { CalculatorPage } from './modules/calculator/CalculatorPage'

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
