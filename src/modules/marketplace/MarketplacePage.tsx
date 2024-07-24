
import { useEffect, useState } from "react"
import ProductGrid from "./components/ProductGrid"
import { ceramicsItems, bathroomFurnitureItems, floorCoveringsItems, laminamItems, plumbingItems } from "./productItems"
import { IProduct } from "./types/IProduct"
import { Navbar } from "./components/Navbar"

export const MarketPlacePage = (): JSX.Element => {
    // const [cart, setCart] = useState<IProduct[]>([])
    const [category, setCategory] = useState('')

    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        switch (category) {
            case 'tiles':
                setProducts(ceramicsItems)
                break
            case 'plumming':
                setProducts(plumbingItems)
                break
            case 'laminam':
                setProducts(laminamItems)
                break
            case 'bathroom-furniture':
                setProducts(bathroomFurnitureItems)
                break
            case 'floor-coverings':
                setProducts(floorCoveringsItems)
                break
            default:
        }
    }, [category])

    return (
        <>
            <Navbar category={category} setCategory={setCategory} />
            <ProductGrid products={products} />
        </>
    )
}
