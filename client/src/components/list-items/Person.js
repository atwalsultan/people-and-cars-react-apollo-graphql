import { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons'

import RemovePerson from '../buttons/RemovePerson';
import UpdatePerson from '../forms/UpdatePerson';
import Cars from '../lists/Cars';

const getStyles = () => ({
    card: {
        width: '100%',
        borderColor: 'black'
    }
})

const Person = (props) => {
    const [id] = useState(props.id);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [editMode, setEditMode] = useState(false);

    const styles = getStyles();

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            default:
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
                    <UpdatePerson
                        id={id}
                        firstName={firstName}
                        lastName={lastName}
                        onButtonClick={handleButtonClick}
                        updateStateVariable={updateStateVariable}
                    />
                ) : (
                    <Card
                        title={`${firstName} ${lastName}`}
                        style={styles.card}
                        // bodyStyle={{border: '2px solid black'}}
                        // headStyle={{border: '2px solid black'}}
                        actions={[
                            <EditOutlined key="edit" onClick={handleButtonClick} />,
                            <RemovePerson id={id} firstName={firstName} lastName={lastName}/>
                        ]
                    }>
                        <Cars personId={id} people={props.people} />
                    </Card>
                )
            }
        </div>
    )
}

export default Person
