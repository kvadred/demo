import { useState } from 'react'
import './global.css'
import { SmetaPage } from './modules/calculator/SmetaPage'
import { CompaniesPage } from './modules/calculator/CompaniesPage'
import { Navbar } from './common/components/Navbar'
import { MarketplacePage } from './modules/marketplace/MarketplacePage'
import { RoomTypes } from './common/types/RoomTypes'
import { CompanyOffer } from './modules/calculator/types/CompanyOffer'
import { IProduct } from './modules/marketplace/types/IProduct'



export interface RoomArea {
  type: RoomTypes,
  area: number | null
}

export interface SmetaFormData {
  renovationType: string,
  city: string,
  residentialComplex: string,
  area: number | null,
  ceilingHeight: number | null,
  rooms: RoomTypes[],
  roomAreas: RoomArea[]
}

const smetaDefaultForm: SmetaFormData = {
  renovationType: '',
  city: '',
  residentialComplex: '',
  area: null,
  ceilingHeight: null,
  rooms: [],
  roomAreas: []
}

export interface CompaniesFormData {
  city: string;
  residentialComplex: string;
  area: number | null;
  ceilingHeight: number | null;
}

const companiesDefaultForm: CompaniesFormData = {
  city: "",
  residentialComplex: "",
  area: null,
  ceilingHeight: null,
}

export const App = (): JSX.Element => {
  const [nav, setNav] = useState('planner')

  // State for SmetaPage
  const [smetaFormData, setSmetaFormData] = useState<SmetaFormData>(smetaDefaultForm)
  const [costData, setCostData] = useState<any>(null)

  // State for CompaniesPage
  const [companyFormData, setCompanyFormData] = useState<CompaniesFormData>(companiesDefaultForm)
  const [companyOffers, setCompanyOffers] = useState<CompanyOffer[]>([])

  // State for MarketplacePage
  const [cart, setCart] = useState<IProduct[]>([])
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState<IProduct[]>([])

  return (
    <div className='background-container'>
      <div className='app-container'>
        <section style={{ marginBottom: '1rem' }}>
          <Navbar nav={nav} setNav={setNav} />
        </section>
        {nav === 'smeta-calculator' && <SmetaPage formData={smetaFormData} setFormData={setSmetaFormData} costData={costData} setCostData={setCostData} />}
        {nav === 'companies-calculator' && <CompaniesPage formData={companyFormData} setFormData={setCompanyFormData} companyOffers={companyOffers} setCompanyOffers={setCompanyOffers} />}
        {nav === 'marketplace' && <MarketplacePage cart={cart} setCart={setCart} category={category} setCategory={setCategory}  products={products} setProducts={setProducts} />}
      </div>
    </div>
  )
}
