// @ts-nocheck

import WorkoutCard from "./WorkoutCard.svelte";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";

describe('Workout Card', () => {
    test('Component renders', () => {
        render(WorkoutCard, {workout: {name: 'Test Workout'}})
        expect(screen.getByText('Test Workout')).toBeInTheDocument();
    })

    test('If editMode prop is true, "Add Muscle Group" button is visible', () => {
        render(WorkoutCard, {workout: {name: 'Test Workout'}, editMode: true})
        expect(screen.getByText('Add Muscle Group')).toBeInTheDocument();
    })

   
})
