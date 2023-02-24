import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Exercises collection using Mongoose.');
    }
});

const exerciseSchema = mongoose.Schema({
	name: { type: String, required: true },
	reps: { type: Number, required: true },
	weight: { type: Number, required: true },
	unit: { type: String, required: true },
	date: { type: Date, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
	const exercise = new Exercise({
		name: name,
		reps: reps,
		weight: weight,
		unit: unit,
		date: date
	});
	return exercise.save();
};

const findExercise = async () => {
    const query = Exercise.find();
    return query.exec();
};

const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
};

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id }, {
        name: name,
		reps: reps,
		weight: weight,
		unit: unit,
		date: date
    });
    return {_id: _id,
			name: name,
			reps: reps,
			weight: weight,
			unit: unit,
			date: date};
};

export {createExercise, findExercise, findExerciseById, replaceExercise, deleteById }