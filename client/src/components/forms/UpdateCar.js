import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { useMutation } from '@apollo/client';

import { UPDATE_CAR } from '../../queries';

const UpdateCar = (props) => {
    const { Option } = Select;

    const [id] = useState(props.car.id);
    const [year, setYear] = useState(props.car.year);
    const [make, setMake] = useState(props.car.make);
    const [model, setModel] = useState(props.car.model);
    const [price, setPrice] = useState(props.car.price);
    const [personId, setPersonId] = useState(props.car.personId);

    const [updateCar] = useMutation(UPDATE_CAR);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate();
    }, []);

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value);
        switch(variable) {
            case 'year':
                setYear(value);
                break;
            case 'make':
                setMake(value);
                break;
            case 'model':
                setModel(value);
                break
            case 'price':
                setPrice(value);
                break
            case 'personId':
                setPersonId(value);
                break
        }
    }

    const onFinish = values => {
        const { year, make, model, price, personId } = values;

        updateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                updateCar: {
                    __typename: 'Car',
                    id,
                    make,
                    model,
                    year,
                    price,
                    personId
                }
            }
        })
        props.onButtonClick();
    }

    return (
        <Form
            form={form}
            name="update-car-form"
            layout="inline"
            onFinish={onFinish}
            initialValues={{
                year: props.car.year,
                make: props.car.make,
                model: props.car.model,
                price: props.car.price,
                personId: props.car.personId
            }}
            size="large"
        >
            <Form.Item
                name="year"
                rules={[{ required: true, message: "Please input car year!" }]}
                style={{ width: '150px' }}
            >
                <InputNumber min={1900} max={2022} style={{ width: '150px' }} />
            </Form.Item>

            <Form.Item
                name="make"
                rules={[{ required: true, message: "Please input car make!" }]}
                style={{ width: '150px' }}
            >
                <Input onChange={e => updateStateVariable('make', e.target.value)} />
            </Form.Item>

            <Form.Item
                name="model"
                rules={[{ required: true, message: "Please input car model!" }]}
                style={{ width: '150px' }}
            >
                <Input onChange={e => updateStateVariable('model', e.target.value)}/>
            </Form.Item>

            <Form.Item
                name="price"
                rules={[{ required: true, message: "Please input car price!" }]}
                style={{ width: '150px' }}
            >
                <InputNumber 
                    min={0} 
                    style={{ width: '150px' }} 
                    step={0.01}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')} 
                />
            </Form.Item>

            <Form.Item
                name="personId"
                rules={[{ required: true, message: "Please select a person" }]}
                style={{ width: '150px' }}
            >
                <Select>
                    {
                        props.people.map(({ id, firstName, lastName }) => (
                            <Option key={id} value={id}>{firstName} {lastName}</Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {
                    () => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('personId')) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Update Car
                        </Button>
                    )
                }
            </Form.Item>

            <Form.Item>
                <Button onClick={props.onButtonClick}>Cancel</Button>
            </Form.Item>
        </Form>
    )
}

export default UpdateCar
