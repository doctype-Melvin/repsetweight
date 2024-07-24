// @ts-nocheck

import { fireEvent, render } from "@testing-library/svelte";
import { test, describe, expect, vi, beforeEach } from "vitest";
import { mockComposerDataStore } from "$lib/mockStores";
import ComposerV2 from "./ComposerV2.svelte";

describe('ComposerV2', async () => {
    let component

    const mockData = {
        workouts: [],
        muscles: [],
        exercises: []
    }

    beforeEach( async () => {
        vi.resetAllMocks()
        vi.mock('$lib/stores', async () => {
            return {
                composerData: mockComposerDataStore
            }
        })

        component = await render(ComposerV2);
    })

    test('renders correctly', async () => {

        expect(component.getByText('Lightweight')).not.toBeNull();
    })

    test('has a button to add workouts', async () => {
        expect(component.getByText('Add Workout')).not.toBeNull();
    })
   
    test('clicking the button adds a workout to the store', async () => {
        expect(component.getByText('Add Workout')).toBeInTheDocument();
        const button = component.getByText('Add Workout');
        await fireEvent.click(button);
        
        expect(mockComposerDataStore.update).toHaveBeenCalled();
        
        const updateMock = mockComposerDataStore.update.mock.calls[0][0];
        const result = updateMock(mockData)

        expect(result.workouts.length).toBeGreaterThan(mockData.workouts.length);

    })

    test('renders a list', async () => {
        
        
        expect(component.getByText('No workouts')).toBeInTheDocument();

        mockComposerDataStore.set({
            workouts: [{name: 'Workout 1'}],
            muscles: [],
            exercises: []
        })
        
        
        expect(component.getByText('Workout 1')).toBeInTheDocument();
    })

})