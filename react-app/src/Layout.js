import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import AuthPage from "./views/AuthPage";
import Dashboard from "./views/Dashboard";
import ContextProvider from "./context/Provider";
import { Navbar } from "./components/Navbar";
import Calendar from "./views/Calendar";
import ProgramsList from "./views/ProgramsList";
import ProgramPage from "./views/ProgramPage";
import AddExerciseModal from "./components/AddExerciseModal";


const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ContextProvider>
					<Navbar />
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/auth" element={<AuthPage />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/calendar" element={<Calendar />} />
							<Route path="/programs" element={<ProgramsList />} />
							<Route path="/programs/:programName" element={<ProgramPage />} />
							<Route path="/programs/:programName/add-exercise" element={<AddExerciseModal />} />
							{/* <Route path="/single/:theid" element={<Single />} /> */}
							<Route path="*" element={<h1>Not found!</h1>} />
						</Routes>
				</ContextProvider>
			</BrowserRouter>
		</div>
	);
};

export default Layout;