import { writable } from 'svelte/store';

// Writable stores for use in
// layout and respective components

export const createMode = writable();
export const userTemplateData = writable();

export const templatesData = writable();
export const exercisesData = writable();
export const workoutData = writable();
