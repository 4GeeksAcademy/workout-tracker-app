import React from "react";
import '../styles/dashboard.css'
import { Link } from "react-router-dom";


export default function Dashboard () {


    return (
        <div className="App">
            {/* Header */}
            <header>
                <h1>Powerlifting App</h1>
                {/* Add navigation links here if you have multiple pages */}
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
                <ul>
        <li>
          <Link to="/programs/1">Program 1</Link>
        </li>
        {/* Add other program links */}
      </ul>

      {/* Show the "New Program" button */}
      <Link to="/programs/new">New Program</Link>
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