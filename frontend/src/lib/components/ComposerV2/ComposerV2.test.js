// @ts-nocheck

import { vi, describe, test, expect, beforeEach } from "vitest";
import { render } from "@testing-library/svelte";
import ComposerV2 from "./ComposerV2.svelte";
import { mockComposerData } from "$lib/mockStores";


describe('ComposerV2', () => {

    // Mock the stores module and 
    // return the mockComposerData store
    vi.mock('$lib/stores', async () => {
        const {mockComposerData} = await import('../../mockStores')
        return {composerData: mockComposerData}
    })

    let component

    beforeEach(() => {
        component = render(ComposerV2)
        mockComposerData.reset()
    })

    test('Component renders...', async () => {
        expect(component.getByText('No workouts')).toBeInTheDocument();
    })
    
    test('... and has a button named Add Workout', async () => {
        expect(component.getByText('Add Workout')).toBeInTheDocument();
    })
    
    test('Clicking Add Workout calls the store/s update method...', async () => {
        component.getByText('Add Workout').click();
        expect(mockComposerData.update).toHaveBeenCalled();        
    })

    test('... and adds a workout to the store', async () => {
        component.getByText('Add Workout').click()
        expect(mockComposerData.get().workouts).toHaveLength(1)
    })
})