import { render, screen } from '@testing-library/svelte';
import { beforeEach, expect, test, vi } from 'vitest';
import * as stores from '../../stores.js';

import Composer from './Composer.svelte';

// Composer imports isWriteMode directly from stores module
// By default isWriteMode is false

// Mock the entire stores module
vi.mock('@lib/stores.js', () => {
    return {
        isWriteMode: {
            // Mock the subscribe method
            subscribe: vi.fn((cb) => {
                // Set store value to true
                cb(true)
                // Unsubscribe function
                return () => ({})
            })
        }
    }
 })

beforeEach(() => {
    vi.resetAllMocks()
})


test('Composer renders and shows default message', () => {
    render(Composer);
    const composerElement = screen.getByText(/no muscle group selected/i)

    expect(composerElement).toBeInTheDocument();
})

test('Composer does not render add muscle group button when isWriteMode is false', () => {
    render(Composer)
    const addMuscleGroupButton = screen.queryByRole("button", {name: 'Add Muscle Group'})

    expect(addMuscleGroupButton).not.toBeInTheDocument();
})

test('Composer does not render add workout button when isWriteMode is false', () => {
    render(Composer)
    const addWorkoutButton = screen.queryByRole("button", {name: 'Add Workout'})

    expect(addWorkoutButton).not.toBeInTheDocument();
})

test('Composer renders add muscle group button when isWriteMode is true', () => {
    vi.spyOn(stores.isWriteMode, 'subscribe').mockImplementation((cb) => {
        cb(true)
        return () => ({})
    })

    render(Composer)
    const addMuscleGroupButton = screen.getByRole("button", {name: 'Add Muscle Group'}) 

    expect(addMuscleGroupButton).toBeInTheDocument();
})

test('Composer has add workout button when isWriteMode is true', () => {
    
    vi.spyOn(stores.isWriteMode, 'subscribe').mockImplementation((cb) => {
        cb(true)
        return () => ({})
    })

    render(Composer)
    const addWorkoutButton = screen.getByRole("button", {name: 'Add Workout'})
    
    expect(addWorkoutButton).toBeInTheDocument();
})
