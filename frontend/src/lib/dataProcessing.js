export const lookUpExercise = async (id) => {
	const response = await fetch(`http://localhost:3000/api/exercises/${id}`);
	const exercise = await response.json();
	return exercise;
};
