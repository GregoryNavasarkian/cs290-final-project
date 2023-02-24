import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExercise }) {
    const history = useHistory();

    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    } 
    
    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }

	const onDeleteExercise = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <article>
                <h2>List of Exercises</h2>
                <p>View exercises in the table below.</p>
                <ExerciseList 
                    exercises={exercises} 
                    onEdit={onEditExercise} 
                    onDelete={onDeleteExercise} 
                />
            </article>
        </>
    );
}

export default HomePage;