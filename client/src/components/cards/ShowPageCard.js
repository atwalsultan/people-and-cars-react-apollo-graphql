import { Card } from 'antd';
import { Link } from "react-router-dom";
import ShowPageCars from '../lists/ShowPageCars';


const getStyles = () => ({
    outerCard: {
        width: '100%',
    }
})

const ShowPageCard = ({ data }) => {
    const styles = getStyles();

    return (
        <Card
            title={`${data.personWithCar.person.firstName} ${data.personWithCar.person.lastName}`}
            style={styles.outerCard}
            extra={<Link to="/">Go Back Home</Link>}
        >
            <ShowPageCars data={data} />
        </Card>
    )
}

export default ShowPageCard
