import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button, Select } from 'antd';

import Title from '../layout/Title';
import { ADD_CAR, GET_CARS, GET_PEOPLE } from '../../queries';

const AddCar = () => {
    const { Option } = Select;

    const [id, setId] = useState(uuidv4())
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [addCar] = useMutation(ADD_CAR);

    useEffect(() => {
        forceUpdate({});
    }, [])

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if(loading) return 'Loading...';
    if(error) return `Error! ${error.message}`;

    const onFinish = (values) => {
        const { year, make, model, price, personId } = values;

        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            optimisticResponse: {
                __typename: "Mutation",
                addCar: {
                    __typename: "Car",
                    id,
                    year,
                    make,
                    model,
                    price,
                    personId
                }
            },
            update: (proxy, { data: { addCar } }) => {
                const data = proxy.readQuery({ query: GET_CARS })
                proxy.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        });

        // Set new ID:
        setId(uuidv4());
    }

    return (
        data.people.length > 0 &&
        <>
            <Title text="Add Car" />
            <Form
                form={form}
                name="add-car-form"
                layout="inline"
                onFinish={onFinish}
                size="large"
                style={{ marginBottom: '20px' }}
            >
                <Form.Item
                    name="year"
                    rules={[{ required: true, message: "Please input car year!" }]}
                    style={{ width: '150px' }}
                >
                    <Input placeholder="2021" />
                </Form.Item>

                <Form.Item
                    name="make"
                    rules={[{ required: true, message: "Please input car make!" }]}
                    style={{ width: '150px' }}
                >
                    <Input placeholder="Rivian" />
                </Form.Item>

                <Form.Item
                    name="model"
                    rules={[{ required: true, message: "Please input car model!" }]}
                    style={{ width: '150px' }}
                >
                    <Input placeholder="R1T" />
                </Form.Item>

                <Form.Item
                    name="price"
                    rules={[{ required: true, message: "Please input car price!" }]}
                    style={{ width: '150px' }}
                >
                    <Input placeholder="70000" />
                </Form.Item>

                <Form.Item
                    name="personId"
                    rules={[{ required: true, message: "Pleae select a person!" }]}
                    style={{ width: '150px' }}
                >
                    <Select>
                        {
                            data.people.map(({ id, firstName, lastName }) => (
                                <Option key={id} value={id}>{firstName} {lastName}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Add Car
                        </Button>
                    )}
                </Form.Item>

            </Form>
        </>
    )
}

export default AddCar
