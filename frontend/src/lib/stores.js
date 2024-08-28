//@ts-nocheck

import { writable } from 'svelte/store';


// Store for user created template data
export const userTemplateData = writable(null);


//===== composerData Store =====
// make this a custom store which 
// exposes a CRUD API that
// is then used in components to keep
// them from being bloated with data processing logic
export const composerData = writable({
	workouts: [],
	muscles: [],
	exercises: [],
})



// Set errors for user created templates
export function userTemplateErrors(array) {
	userTemplateData.update((data) => {
		return { ...data, errors: [...array] };
	});
}
export const missingClientData = writable([]);

// Stores for fetched data
export const templatesData = writable();
export const exercisesData = writable();
export const workoutData = writable();
export const muscleGroupsData = writable();
export const exerciseMuscleData = writable();

// Other stores
export const isWriteMode = writable(false);
export const scrollPosition = writable(0);
export const collapseWorkouts = writable(false);
