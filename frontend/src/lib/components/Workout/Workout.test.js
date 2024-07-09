import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, vi, describe } from 'vitest';
import * as stores from '../../stores.js';

import Workout from './Workout.svelte'; 

describe('Workout component', () => {
    stores.userTemplateData.set({workouts: [{wid: 1, muscles: []}]})

    test('renders with default message when no muscle group has been chosen', () => {
        render(Workout, {id: 1, copyWorkout: vi.fn(() => {}), deleteWorkout: vi.fn(() => {})});
        const workoutElement = screen.getByText(/no muscle group selected/i);

        expect(workoutElement).toBeInTheDocument();
    })

    test('shows an "Add muscle group" button ', () => {
        render(Workout, {id: 1, copyWorkout: vi.fn(() => {}), deleteWorkout: vi.fn(() => {})});
        const toggleButton = screen.getByRole('button', {name: 'Add Muscle Group'});
        expect(toggleButton).toBeInTheDocument();   
        
       
    })
    

})