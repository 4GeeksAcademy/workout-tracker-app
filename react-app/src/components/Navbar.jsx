import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { auth } from "../index.js";
import { Context } from '../context/Provider';

export const Navbar = () => {

    const { user, setUser } = useContext(Context);
    const navigate = useNavigate();
    

    const logout =()=>{
        auth.signOut();
        navigate('/');
        setUser(null);

    }
	return (
        <>
        
		<nav className="navbar navbar-light bg-dark">
			<button className="btn btn-secondary ms-3" onClick={logout}>Logout</button>
			<div className="ml-auto">
				<Link to="/calendar">
					<button className="btn btn-primary m-2">Calendar</button>
				</Link>
                <Link to="/dashboard">
					<button className="btn btn-primary m-2">Dashboard</button>
				</Link>

			</div>
		</nav>

        {/* {!user && <p style={{color: "red"}}>succesfully logged out!</p>}
        {console.log(user)} */}
        </>
	);
};