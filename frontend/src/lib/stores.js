import { writable } from 'svelte/store';

// Writable stores for use in
// layout and respective components
export const templatesData = writable(null);
export const exercisesData = writable(null);
