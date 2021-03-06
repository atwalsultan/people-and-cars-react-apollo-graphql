import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button } from 'antd';

import Title from '../layout/Title';
import { ADD_PERSON, GET_PEOPLE } from '../../queries';

const AddPerson = () => {
    const [id] = useState(uuidv4())
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [addPerson] = useMutation(ADD_PERSON);

    useEffect(() => {
        forceUpdate({});
    }, [])

    const onFinish = (values) => {
        const { firstName, lastName } = values;

        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            optimisticResponse: {
                __typename: "Mutation",
                addPerson: {
                    __typename: "Person",
                    id,
                    firstName,
                    lastName
                }
            },
            update: (proxy, { data: { addPerson } }) => {
                const data = proxy.readQuery({ query: GET_PEOPLE })
                proxy.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson]
                    }
                })
            }
        })
    }

    return (
        <>
            <Title text="Add Person" />
            <Form
                form={form} 
                name="add-person-form" 
                layout="inline" 
                onFinish={onFinish} 
                size="large" 
                style={{ marginBottom: "20px" }}
            >
                <Form.Item 
                    name="firstName" 
                    rules={[{ required: true, message: "Please input your first name!" }]}
                >
                    <Input placeholder="John" />
                </Form.Item>

                <Form.Item 
                    name="lastName" 
                    rules={[{ required: true, message: "Please input your last name!" }]}
                >
                    <Input placeholder="Smith" />
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
                            Add Person
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    )
}

export default AddPerson
