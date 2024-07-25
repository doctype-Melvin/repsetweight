// @ts-nocheck
import { writable } from "svelte/store";
import { vi } from "vitest";

// Mock the writeable
const mockComposerStore = writable({
    workouts: [],
    muscles: [],
    exercises: []
})

// Mock the store with 
// all needed methods as vi.fn() to
// test if they've been called
export const mockComposerDataStore = {
    subscribe: mockComposerStore.subscribe,
    set: vi.fn((value) => mockComposerStore.set(value)), 
    update: vi.fn((cb) => mockComposerStore.update(cb)),
    
}

export function getMockComposerStore() {
    return mockComposerDataStore;
}