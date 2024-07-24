// @ts-nocheck

import { fireEvent, render } from "@testing-library/svelte";
import { test, describe, expect, vi, beforeEach } from "vitest";
import { mockComposerDataStore } from "$lib/mockStores";
import ComposerV2 from "./ComposerV2.svelte";

describe('ComposerV2', async () => {

    const mockData = {
        workouts: [
            {
                wid: 'testId',
                muscles: [],
                exercises: []
            }
        ],
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
    })

    test('renders correctly', async () => {
        const { getByText } = render(ComposerV2);
        expect(getByText('ComposerV2')).not.toBeNull();
    })

    test('has a button to add workouts', async () => {
        const { getByText } = render(ComposerV2);
        expect(getByText('Add Workout')).not.toBeNull();
    })
   
    test('clicking the button adds a workout to the store', async () => {
        const { getByText } = render(ComposerV2);
        
        expect(getByText('Add Workout')).toBeInTheDocument();
        
        await fireEvent.click(getByText('Add Workout'));
        
        expect(mockComposerDataStore.update).toHaveBeenCalled();
        
        const updateMock = mockComposerDataStore.update.mock.calls[0][0];
        const result = updateMock(mockData)

        expect(result.workouts.length).toBeGreaterThan(mockData.workouts.length);

    })

    test('renders as many Workout components as there are workouts in the store', async () => {
        const { getByText } = render(ComposerV2);
        // should render a ul with li for each workout

        await fireEvent.click(getByText('Add Workout'));

        const updateMock = mockComposerDataStore.update.mock.calls[0][0];
        const result = updateMock(mockData)

        expect(result.workouts[0].wid).toBe('testId');
    })

})