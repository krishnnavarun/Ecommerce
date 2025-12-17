import { Outlet } from "react-router";
import Navbar from "../components/Navbar";


const NavbarLayout = () => {
    return(
        <>
            <Navbar/>
            <Outlet/>  
        </>
    );    
};


export default NavbarLayout;