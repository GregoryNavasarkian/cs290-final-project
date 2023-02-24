import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

import Navigation from './components/Navigation';
import './App.css';

import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {

	const [exercise, setExercise] = useState([]);

  	return (
    <>
		<Router>
			<header>
				<h1>Exercise History</h1>
				<p>App created with MERN stack</p>
			</header>
			
			<Navigation />
			

			<main>
				<Route path="/" exact>
					<HomePage setExercise={setExercise} />
				</Route>
				<Route path="/add-exercise">
					<AddExercisePage />
				</Route>
				<Route path="/edit-exercise">
					<EditExercisePage exercise={exercise} />
				</Route>
			</main>

			<footer>
				<p>&copy; 2022 Gregory Navasarkian</p>
			</footer>
		</Router>
	</>
  	);
}

export default App;
