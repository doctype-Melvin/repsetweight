// @ts-nocheck

import { vi, describe, test, expect } from "vitest";
import { render } from "@testing-library/svelte";
import ComposerV2 from "./ComposerV2.svelte";
import { getMockComposerStore } from "$lib/mockStores";

test('Composer Store', () => {
    const mockComposerStore = getMockComposerStore();
    
    mockComposerStore.set({
        workouts: [
            {
                name: 'Workout 1',
                muscles: [],
                exercises: []
            }
        ],
        muscles: [],
        exercises: []
    })
    
    expect(mockComposerStore.set).toHaveBeenCalled();
})