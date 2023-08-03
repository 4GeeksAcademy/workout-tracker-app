import React from "react";
import '../styles/dashboard.css'
import { Link } from "react-router-dom";


export default function Dashboard () {


    return (
        <div className="App">
            
            <header>
                <h1>Powerlifting App</h1>
            </header>

            
            <main>
                <section className="user-profile">
                
                <h2>User Profile</h2>
                
                </section>

                <section className="recent-workouts">
                
                <h2>Recent Workouts</h2>
            
                

                        
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