import { Row, Col, Card } from "antd"
import { IProduct } from "../types/IProduct"
import { PlusCircleOutlined } from "@ant-design/icons";
import { toastUtils } from "../../../common/utils/toastUtils";
// import 'antd/dist/reset.css'

// const products = [
//   {
//     id: 1,
//     title: 'Product 1',
//     description: 'Description of Product 1',
//     price: '11 990 тг/м²',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     id: 2,
//     title: 'Product 2',
//     description: 'Description of Product 2',
//     price: '12 990 тг/м²',
//     image: 'https://via.placeholder.com/150',
//   },
//   // Add more products as needed
// ];

interface Props {
    products: IProduct[]
}

const ProductGrid = ({ products }: Props) => {
    const addToCart = () => toastUtils.success('Добавлено в корзину')

    return (
        <div style={{ padding: "30px" }}>
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.title}>
                        <Card
                            hoverable
                            cover={<img alt={product.title} src={product.image} />}
                        >
                            {/* <Meta title={product.title} description={product.description} /> */}
                            <div style={{ height: '5rem' }}>{product.title}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                                <b>
                                    {product.price}
                                </b>
                                <PlusCircleOutlined onClick={addToCart} />
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductGrid;
