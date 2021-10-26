import { Divider } from "antd";
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar";
import People from "../lists/People";

const HomePage = () => {
    return (
        <div className="App">
            <AddPerson />
            <AddCar />
            <Divider>People & Cars</Divider>
            <People />
        </div>
    )
}

export default HomePage
