import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exercise }) => {

	const [name, setName]     = useState(exercise.name);
    const [reps, setReps]     = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
	const [unit, setUnit]     = useState(exercise.unit);
	const [date, setDate]     = useState(exercise.date);
    
    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name,
				reps: reps,
				weight: weight,
				unit: unit,
				date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });
        if (response.status === 200) {
            alert("Successfully edited exercise.");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit an Exercise in the Collection</h2>
            <p>Edit the exercise below.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>&nbsp; Update Exercise &nbsp;</legend>
					<label for="name">Name &nbsp;&nbsp;</label>
                    <input
                        type="text"
						required
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
					<br/><br/>
                    <label for="reps">Reps &nbsp;&nbsp;&nbsp;</label>
                    <input
                        type="number"
						required
                        value={reps}
						min="0"
                        placeholder="Reps"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />
					<br/><br/>
                    <label for="weight">Weight</label>
                    <input
                        type="number"
						required
                        placeholder="Weight"
						min="0"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />
					<br/><br/>
					<label for="unit">Unit &nbsp;&nbsp;&nbsp;</label>
                    <select
						name='unit'
						onChange={e => setUnit(e.target.value)}
						required="required"
					>
						<option value="none">None</option>
						<option value="lbs">Lbs</option>
						<option value="kgs">Kgs</option>
						<option value="miles">Miles</option>
						<option value="kilometers">Km</option>
						<option value="minutes">Minutes</option>
					</select>
					<br/><br/>
					<label for="date">Date &nbsp;&nbsp;&nbsp;</label>
                    <input
                        type="date"
						required
                        placeholder="Date"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label for="submit">
					<br/><br/>
                    <button
                        onClick={editExercise}
                        id="submit"
                    >Save</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;