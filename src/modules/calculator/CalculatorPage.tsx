import { useState } from "react"
import { Button, Card, Form, InputNumber, Radio, Select, Space, Typography } from 'antd'
import s from './styles/calculatorPage.module.css'
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { IOption } from "../../common/types/IOption"
import { RoomTypes } from "../../common/types/RoomTypes"
import { CostTable } from "./components/CostTable"
import { formatNumberCombined } from "../../common/utils/formattingUtils"

// const defaultForm: ICalculatorForm = {
//     city: '',
//     roomCount: 0,
//     residentialComplex: '',
//     area: 0,
//     ceilingHeight: 0,
//     rooms: [],
//     renovationType: 'ECONOM'
// }

const roomTypes: IOption[] = [
    {
        value: RoomTypes.KITCHEN,
        label: 'Кухня'
    },
    {
        value: RoomTypes.LIVING_ROOM,
        label: 'Гостиная'
    },
    {
        value: RoomTypes.BATHROOM,
        label: 'Санузел'
    },
    {
        value: RoomTypes.BEDROOM,
        label: 'Спальня'
    },
    {
        value: RoomTypes.HALLWAY,
        label: 'Прихожая'
    }
]

const roomCostPerSquareMeterMap = {
    'KITCHEN': { material: 50875, service: 47168.125 },
    'LIVING_ROOM': { material: 39206, service: 44995.6 },
    'BATHROOM': { material: 168319.96, service: 83593.05 },
    'BEDROOM': { material: 40629, service: 46345.6 },
    'HALLWAY': { material: 40758, service: 41370.6 },
}

export const CalculatorPage = (): JSX.Element => {
    // const [form, setForm] = useState<ICalculatorForm>({...defaultForm, rooms: []})
    const [costData, setCostData] = useState<any>(null) 

    // const onFormChange = (key: string, value: number | string | null) => {
    //     if (key === 'roomCount') {
    //         const temp = { ...form, [key]: value }
    //         const tempRooms: IRoom[] = [
    //             { name: 'Санузел', area: 0 },
    //             { name: 'Балкон', area: 0 }
    //         ]
    //         for (let i = 0; i < Number(value); i++) {
    //             tempRooms.push({ name: `Комната ${i+1}`, area: 0 })
    //         }
    //         temp.rooms = tempRooms
    //         // @ts-ignore
    //         setForm(temp)
    //         console.log(temp)
    //         return
    //     }
    //     const temp = { ...form, [key]: value }
    //     console.log(temp)
    //     setForm(temp)
    // }

    const onFinish = (formData: any) => {
        console.log('FORM_DATA:', formData)
        const resultForm = {
            totalCost: 0,
            costPerSquareMeter: 0,
            material: [] as any[],
            service: [] as any[]
        }
        let totalArea = 0
        formData.rooms.forEach(({ area, roomType }: any) => {
            totalArea += area
            // @ts-ignore
            const materialCost = area * roomCostPerSquareMeterMap[roomType].material
            // @ts-ignore
            const serviceCost = area * roomCostPerSquareMeterMap[roomType].service
            resultForm.totalCost += (materialCost + serviceCost)
            resultForm.material.push({ area: area, name: roomTypes.find(it => it.value == roomType)!.label, cost: materialCost })
            resultForm.service.push({ area: area, name: roomTypes.find(it => it.value == roomType)!.label, cost: serviceCost })
        })

        resultForm.material.push({ area: 10, name: 'Расходные материалы', cost: 302640 })
        resultForm.material.push({ area: 10, name: 'Сопутствующие товары', cost: 103640 })
        resultForm.totalCost += (302640 + 103640)

        resultForm.costPerSquareMeter = resultForm.totalCost / totalArea

        console.log('result', resultForm)
        setCostData(resultForm)
    }

    return (
        <section className={s['container']}>
            <Form onFinish={onFinish}>

                <Form.Item
                    name={'renovationType'}
                    label='Тип ремонта'
                >
                    <Select placeholder="Тип ремонта">
                        {['Эконом', 'Комфорт', 'Бизнес'].map(type => (
                            <Select.Option key={type}>{type}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'city'}
                    label='Выбор города'
                >
                <Radio.Group defaultValue="Astana">
                    <Radio.Button value="Astana">Астана</Radio.Button>
                    <Radio.Button value="Almaty">Алматы</Radio.Button>
                </Radio.Group>
                </Form.Item>

                <Form.Item
                    name={'residentialComplex'}
                    label='Выбор ЖК'
                >
                    <Select placeholder="Выберите ЖК">
                        {['ЖК 1', 'ЖК 2', 'ЖК 3'].map(type => (
                            <Select.Option key={type}>{type}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                

                <Space>
                <Form.Item
                    name={'area'}
                    label='Общая площадь (м2)'
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name={'ceilingHeight'}
                    label='Выстота потолков (м)'
                >
                    <InputNumber />
                </Form.Item>
                </Space>
                <br />
                

                <Form.List name="rooms">
                    {(fields, { add, remove }) => (
                        <div>
                            {fields.map((field, index) => {
                                return (
                                    <>
                                    <Space key={field.key} direction="horizontal" size={12}>

                                    <Form.Item
                                        name={[field.name, 'roomType']}
                                        label={`${index+1} комната`}
                                    >
                                        <Select placeholder="Тип" style={{ width: '7rem' }}>
                                                {roomTypes.map(type => (
                                                    <Select.Option key={type.value}>{type.label}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name={[field.name, 'area']}
                                            rules={[{ required: true, message: 'Необходимо указать квадтратуру' }]} 
                                        >
                                            <InputNumber placeholder="м2" />
                                        </Form.Item>
                                        
                                        <Form.Item>
                                            <MinusCircleOutlined 
                                                onClick={() => { remove(field.name) }}
                                                style={{ color: 'red' }}
                                            />   
                                        </Form.Item>
                                    </Space>
                                    <br/>
                                    </>
                                )
                            })}
                            <Form.Item>
                                <Button
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    type="dashed"
                                    block
                                >
                                    Добавить комнату
                                </Button>
                            </Form.Item>
                        </div>
                    )}
                </Form.List>
                <Button htmlType="submit" type="primary">Рассчитать</Button>
            </Form>
            {costData && 
            <>
                <section style={{ marginTop: '1rem' }}>
                    <CostTable material={costData.material} service={costData.service} totalCost={costData.totalCost} costPerSquareMeter={costData.costPerSquareMeter} />
                </section>
                <section>
                    <div style={{ marginTop: '3rem' }}>
                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* <Space direction="horizontal" size={16} align="center"> */}
                            <Card title="Компания 1" style={{ width: 300, height: 200 }}>
                            <Typography><b>Стоимость:</b> {formatNumberCombined(costData.totalCost * 1.1)}</Typography>
                            <Typography><b>Срок:</b> 90 дней</Typography>
                            <Typography><b>Условия:</b> Рассрочка, БЦЦ Кредит</Typography>
                            </Card>
                            <Card title="Компания 2" style={{ width: 300, height: 200 }}>
                                <Typography><b>Стоимость:</b> {formatNumberCombined(costData.totalCost * 0.9)}</Typography>
                                <Typography><b>Стоимость:</b> 70 дней</Typography>
                                <Typography><b>Условия:</b> Рассрочка, Поэтапная оплата</Typography>
                            </Card>
                        {/* </Space> */}
                        </div>
                    </div>
                </section>
            </>
            }
        </section>
    )
}


/*

    <div className={s['container']}>
            <h1>Calculator Page</h1>
            <label>Выбор города</label>
            <Radio.Group onChange={e => onFormChange('city', e.target.value)} defaultValue="Astana">
                <Radio.Button value="Astana">Астана</Radio.Button>
                <Radio.Button value="Almaty">Алматы</Radio.Button>
            </Radio.Group>
            <br/>
            <br/>
            <label>Кол-во комнат</label>
            <InputNumber value={form.roomCount} onChange={value => onFormChange('roomCount', value)} />
            <br/>
            <br/>
            <label>Тип ремонта</label>
            <Select
                defaultValue="ECONOM"
                style={{ width: 120 }}
                onChange={value => onFormChange('renovationType', value)}
                options={[
                    { value: 'ECONOM', label: 'Эконом' },
                    { value: 'COMFORT', label: 'Комфорт' },
                    { value: 'BUSINESS', label: 'Бизнес' }
                ]}
            />
            <br/>
            <br/>
            <label>Укажите квадратуру квартиры по тех паспорту</label>
            <br/>
            <br/>
            <label>Общая площадь</label>
            <InputNumber value={form.area} onChange={value => onFormChange('area', value)} />
            <br/>
            <br/>
            <label>Высота потолков</label>
            <InputNumber value={form.ceilingHeight} onChange={value => onFormChange('ceilingHeight', value)} />
            <br />
            <br />
            <hr />
            <br />
            {form.rooms.map(room =>
                <>
                    <label>{room.name}</label>
                    <InputNumber value={room.area} onChange={value => onFormChange('area', value)} />
                    <br/>
                    <br/>
                </>
            )}
        </div> 

*/