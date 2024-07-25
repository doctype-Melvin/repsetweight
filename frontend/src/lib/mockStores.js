// @ts-nocheck
import { writable } from "svelte/store";
import { vi } from "vitest";

// Copy the writeable composerData store
const composerData = writable({
    workouts: [],
    muscles: [],
    exercises: []
})

// Mock the store 
// 
export const mockComposerData = {
    subscribe: composerData.subscribe,
    set: vi.fn((value) => composerData.set(value)), 
    update: vi.fn((cb) => {
        let currentState 
        composerData.update(data => {
            currentState = cb(data)
            return currentState
        });
        return currentState
    }),

    get: () => {
        let currentState;
        composerData.subscribe(data => {
            currentState = data;
        })();
        return currentState;
    },

    reset: () => {
        composerData.set({
            workouts: [],
            muscles: [],
            exercises: []
        })
    }
    
}

export function getMockComposerStore() {
    return mockComposerData;
}