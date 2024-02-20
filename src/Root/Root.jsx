import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Root = () => {
    return (
        <div className="bg-customBackground">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;