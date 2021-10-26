import { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import RemoveCar from '../buttons/RemoveCar';
import UpdateCar from '../forms/UpdateCar';

const Car = ({ car, people }) => {
    const [, setYear] = useState(car.year);
    const [, setMake] = useState(car.make);
    const [, setModel] = useState(car.model);
    const [, setPrice] = useState(car.price);
    const [, setPersonId] = useState(car.personId);
    const [editMode, setEditMode] = useState(false);

    const updateStateVariable = (variable, value) => {
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

    const handleButtonClick = () => {
        setEditMode(!editMode);
    }

    return (
        <div>
            {
                editMode ? (
                    <UpdateCar
                        car={car}
                        onButtonClick={handleButtonClick}
                        updateStateVariable={updateStateVariable}
                        people={people}
                    />
                )
                : 
                (
                    <Card
                        type="inner"
                        key={car.id}
                        style={{ width: '400px', border: '1px solid gray'}}
                        actions={[
                            <EditOutlined key="edit" onClick={handleButtonClick} />,
                            <RemoveCar id={car.id} year={car.year} make={car.make} model={car.model} price={car.price} personId={car.personId} />
                        ]}
                    >
                        {car.year} {car.make} {car.model}: ${car.price}
                    </Card>)
            }
        </div>
    )
}

export default Car
