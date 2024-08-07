import { writable } from 'svelte/store';

// Store for user data
export const userData = writable();

// Store for user created template data
export const userTemplateData = writable(null);

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
