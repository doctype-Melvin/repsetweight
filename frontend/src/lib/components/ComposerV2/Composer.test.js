// @ts-nocheck


import ComposerV2 from "./ComposerV2.svelte";
import { render } from "@testing-library/svelte";
import { test, describe, expect, vi, beforeEach } from "vitest";

const { mockComposerStore } = vi.hoisted( async () => await import("../../mockStores.js"));
// 1. Figure out a way of using imported mocked stores
// 2. If that's too much of a challenge, mock the 
// store directly in the test file

describe('ComposerV2', async () => {
    let component
    
    beforeEach( async () => {
        vi.resetAllMocks()
        vi.mock('$lib/mockStores', () => ({ composerData: mockComposerStore }))
        console.log(mockComposerStore)
        component = await render(ComposerV2)
    })

    test('renders correctly', async () => {
        const { getByText } = await component;
        expect(getByText('ComposerV2')).not.toBeNull();
    })

    test('has a button to add workouts', async () => {
        const { getByText } = await component;
        expect(getByText('Add Workout')).not.toBeNull();
    })
   
    test('clicking the button adds a workout to the store', async () => {
        const { getByText } = await component;
        getByText('Add Workout').click()
        expect(mockComposerStore.update).toHaveBeenCalled()
    })

})