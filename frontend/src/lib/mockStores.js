// @ts-nocheck
import { vi } from "vitest";

export const mockComposerStore = {
    workouts: [],
    muscles: [],
    exercises: [],
    update: vi.fn(),
    set: vi.fn(),
    subscribe: vi.fn(),
}

