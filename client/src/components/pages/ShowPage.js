import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'

import { GET_PERSON_WITH_CARS } from '../../queries';
import ShowPageCard from "../cards/ShowPageCard";

const ShowPage = () => {
    let { id } = useParams();

    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
        variables: { personWithCarId: id }
    });
    console.log(data)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className="App">
            <ShowPageCard data={data} />
        </div >
    )
}

export default ShowPage
