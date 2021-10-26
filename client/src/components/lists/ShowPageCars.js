import { List } from 'antd';
import ShowPageCar from '../list-items/ShowPageCar';

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center',
    },
})

const ShowPageCars = ({ data }) => {
    const styles = getStyles();

    return (
        <List grid={{ gutter: 10, column: 1 }} style={styles.list}>
            {
                data.personWithCar.cars.map(car => (
                    <List.Item key={car.id}>
                        <ShowPageCar car={car} />
                    </List.Item>
                ))
            }
        </List>
    )
}

export default ShowPageCars
