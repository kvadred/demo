
import { useEffect, useState } from "react"
import ProductGrid from "./components/ProductGrid"
import { ceramicsItems, bathroomFurnitureItems, floorCoveringsItems, laminamItems, plumbingItems } from "./productItems"
import { IProduct } from "./types/IProduct"
import { Navbar } from "./components/Navbar"
import { toastUtils } from "../../common/utils/toastUtils"

export const MarketPlacePage = (): JSX.Element => {
    const [cart, setCart] = useState<IProduct[]>([])
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

    const addToCart = (product: IProduct) => {
        setCart([...cart, product])
        toastUtils.success('Добавлено в корзину')
    }

    const removeFromCart = (title: string) => {
        setCart(cart.filter(it => it.title !== title))
    }

    return (
        <>
            <Navbar category={category} setCategory={setCategory} cart={cart} removeFromCart={removeFromCart} />
            <ProductGrid products={products} addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} />
        </>
    )
}
