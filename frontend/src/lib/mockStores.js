// @ts-nocheck
import { writable } from "svelte/store";
import { vi } from "vitest";

// Mock the writeable
const mockComposerDataWriteable = writable({
    workouts: [],
    muscles: [],
    exercises: []
})

// Mock the store with 
// all needed methods as vi.fn() to
// test if they've been called
export const mockComposerDataStore = {
    subscribe: mockComposerDataWriteable.subscribe,
    set: vi.fn(), 
    update: vi.fn(),
    
}
