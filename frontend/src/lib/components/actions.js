// @ts-nocheck
import { nanoid } from "nanoid";
// Functions to update stores

/*
===== composerData Actions =====
*/
export function addWorkout(store) {
    const workoutCount = store.get().workouts.length + 1;
    const workout = {
        name: `Workout ${workoutCount}`,
        wid: nanoid(7),
        muscles: []
    }

    store.update((data) => {
        return { ...data, workouts: [...data.workouts, workout] };
    });
}