import { Card } from 'antd';

const getStyles = () => ({
    innerCard: { 
        width: '400px', 
        border: '1px solid gray', 
        textAlign: 'center' 
    }
})

const ShowPageCar = ({ car }) => {
    const styles = getStyles();

    return (
        <Card
            type="inner"
            style={styles.innerCard}
        >
            {car.year} {car.make} {car.model}: ${car.price}
        </Card>
    )
}

export default ShowPageCar
