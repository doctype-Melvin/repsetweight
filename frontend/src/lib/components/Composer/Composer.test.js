//@ts-nocheck

import { render, screen, fireEvent } from '@testing-library/svelte';
import { beforeEach, expect, test, vi } from 'vitest';
import * as stores from '../../stores.js';

import Composer from './Composer.svelte';

// Composer imports isWriteMode directly from stores module
// By default isWriteMode is false but
// Composer lives in the create route
// whenever the create route is visited
// isWriteMode is set to true

// Mock the entire stores module

vi.mock('@lib/stores.js', async () => {
	return {
		isWriteMode: {
			// Mock the subscribe method
			subscribe: vi.fn((cb) => {
				// Set store value to false
				// to simulate the default value
				cb(false);
				// Unsubscribe function
				return () => ({});
			})
		},
		userTemplateData: {
			subscribe: vi.fn((cb) => {
				cb([]);
				return () => ({});
			}),
			set: vi.fn((data) => console.log(data))
		}
	};
});

beforeEach(() => {
	// Since the create route always sets isWriteMode to true
	// We mock the subscribe method to set the store value to true
	vi.spyOn(stores.isWriteMode, 'subscribe').mockImplementation((cb) => {
		cb(true);
		return () => ({});
	});
});

test('Composer renders and shows default message', () => {
	render(Composer);
	const composerElement = screen.getByText(/no muscle group selected/i);

	expect(composerElement).toBeInTheDocument();
});

test('Composer has add workout button when isWriteMode is true', () => {
	render(Composer);
	const addWorkoutButton = screen.getByRole('button', { name: 'Add Workout' });

	expect(addWorkoutButton).toBeInTheDocument();
});

test('Composer renders a single empty workout component for a new template', () => {
	render(Composer);
	const workoutComponent = screen.getAllByRole('listitem');

	expect(workoutComponent).toHaveLength(1);
});

test('Composer adds a workout when Add Workout button is clicked', async () => {
	render(Composer);
	const addWorkoutButton = screen.getByRole('button', { name: 'Add Workout' });
	await fireEvent.click(addWorkoutButton);

	const workoutComponent = screen.getAllByRole('listitem');

	expect(workoutComponent).toHaveLength(2);
});
