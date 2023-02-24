import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName]     = useState('');
    const [reps, setReps]     = useState('');
    const [weight, setWeight] = useState('');
	const [unit, setUnit]     = useState('');
	const [date, setDate]     = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
		history.push("/");
    };

    return (
        <>
        <article>
            <h2>Add an Exercise to the Collection</h2>
            <p>Enter and submit data below.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>&nbsp;Which exercise are you adding?&nbsp;</legend>
                    <label for="name">Name &nbsp;</label>
                    <input
                        type="text"
                        placeholder="Name"
						required
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    <br />
					<br />
                    <label for="reps">Reps &nbsp;&nbsp;</label>
                    <input
                        type="number"
						required
                        value={reps}
						min="0"
                        placeholder="Reps"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />
					<br />
					<br />
                    <label for="weight">Weight</label>
                    <input
                        type="number"
						required
                        placeholder="Weight"
						min="0"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />
					<br />
					<br />
					<label for="unit">Unit &nbsp;&nbsp;&nbsp;</label>
                    <select
						name='unit'
						onChange={e => setUnit(e.target.value)}
						required="required">
						<option value="none">None</option>
						<option value="lbs">Lbs</option>
						<option value="kgs">Kgs</option>
						<option value="miles">Miles</option>
						<option value="kilometers">Km</option>
						<option value="minutes">Minutes</option>
					</select>
					
					<br />
					<br />
					<label for="date">Date &nbsp;&nbsp;</label>
                    <input
                        type="date"
						required="required"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />
					<br />
					<br />
                    <label for="submit"></label>
                    <button
                        onClick={addExercise}
                        id="submit"
                    >Add</button>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExercisePage;