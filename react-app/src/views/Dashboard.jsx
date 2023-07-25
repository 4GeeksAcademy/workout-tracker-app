import React from "react";
import '../styles/dashboard.css'
import { useNavigate } from "react-router";

export default function Dashboard () {
    const navigate = useNavigate();

    const logout =()=>{
        localStorage.clear()
        
        navigate('/')

    }

    return (
        <div className="App">
            {/* Header */}
            <header>
                <h1>Powerlifting App</h1>
                {/* Add navigation links here if you have multiple pages */}
                <button onClick={logout}>Logout</button>
            </header>

            {/* Main Content */}
            <main>
                <section className="user-profile">
                {/* User Profile Section */}
                <h2>User Profile</h2>
                {/* Replace with user profile data (e.g., profile picture, username, etc.) */}
                </section>

                <section className="recent-workouts">
                {/* Recent Workouts Section */}
                <h2>Recent Workouts</h2>
                {/* Replace with a list of recent workouts */}
                </section>

                <section className="data-visualization">
                {/* Data Visualization Section */}
                <h2>Data Visualization</h2>
                {/* Replace with your data visualization components (e.g., graphs, charts, etc.) */}
                </section>
            </main>

            {/* Footer */}
            <footer>
                <p>&copy; {new Date().getFullYear()} Powerlifting App. All rights reserved.</p>
            </footer>
        </div>

    )
}