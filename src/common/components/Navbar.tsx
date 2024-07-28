import { Dispatch, SetStateAction } from 'react'
import { Menu } from 'antd';
import {
    ShoppingOutlined,
    CalculatorOutlined,
} from '@ant-design/icons';

interface Props {
    nav: string
    setNav: Dispatch<SetStateAction<string>>
}

export const Navbar = ({ nav, setNav }: Props): JSX.Element => {

    const handleClick = (e: any) => {
        console.log('click ', e)
        setNav(e.key)
      }

    return (
        <>
            <Menu
                onClick={handleClick}
                selectedKeys={[nav]}
                mode="horizontal">
                <Menu.Item key="planner">
                    <CalculatorOutlined style={{ marginRight: '0.5rem' }} />
                    Расчет
                </Menu.Item>
                <Menu.Item key="marketplace">
                    <ShoppingOutlined style={{ marginRight: '0.5rem' }} />
                    Маркетплэйс
                </Menu.Item>
            </Menu>
            {/* Navbar
            <button onClick={() => setNav(0)}>Расчет</button>
            <button onClick={() => setNav(1)}>Маркетплэйс</button> */}
        </>
    );
}
