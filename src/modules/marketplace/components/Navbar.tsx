import Text from 'antd/es/typography/Text'
import s from './../styles/Navbar.module.css'
import { AppstoreFilled, ShoppingFilled } from '@ant-design/icons'
import { Radio, RadioChangeEvent, Space } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    category: string,
    setCategory: Dispatch<SetStateAction<string>>
}

export const Navbar = ({ category, setCategory }: Props): JSX.Element => {
    const [visible, setVisible] = useState(false)

    const onChange = (e: RadioChangeEvent) => {
        setCategory(e.target.value)
    }

    return (
        <section className={s['navbar-container']}>
            <div className={s['catalog']}>
                <AppstoreFilled />
                <Text onClick={() => setVisible(!visible)} style={{ marginLeft: '0.3rem' }}>Каталог товаров</Text>
            </div>
            {visible &&
            <div className={s['categories']}>
                <Radio.Group onChange={onChange} value={category}>
                    <Space direction="vertical">
                        <Radio value='tiles'>Плитка</Radio>
                        <Radio value='plumming'>Сантехника</Radio>
                        <Radio value='laminam'>Laminam</Radio>
                        <Radio value='bathroom-furniture'>Мебель для ванной комнаты</Radio>
                        <Radio value='floor-coverings'>Напольные покрытия</Radio>
                    </Space>
                </Radio.Group>
            </div>
            }
            <div style={{ padding: '1rem' }}>
                <ShoppingFilled />
                <Text style={{ marginLeft: '0.3rem' }}>Корзина</Text>
            </div>
        </section>
    )
}
