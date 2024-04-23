import { writable } from 'svelte/store';

// Store for user created template data
export const userTemplateData = writable();

// Stores for fetched data
export const templatesData = writable();
export const exercisesData = writable();
export const workoutData = writable();
