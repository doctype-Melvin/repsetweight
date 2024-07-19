// @ts-nocheck

import { userTemplateData } from '$lib/stores';
import { vi, beforeEach, test, describe, expect } from 'vitest';
import Exercise from './Exercise.svelte';
import { render, fireEvent } from '@testing-library/svelte';


vi.mock('$lib/stores', () => ({
	userTemplateData: {
		subscribe: vi.fn(),
		update: vi.fn()
	}
}));

describe('Exercise component', () => {
	beforeEach(() => {
		vi.resetAllMocks();

		userTemplateData.subscribe.mockImplementation((callback) => {
			callback({
				workouts: [
					{
						wid: 'testId',
						muscles: [],
						exercises: []
					}
				]
			});
			return () => {};
		});
	});

	test('should render', async () => {
		const { getByText } = render(Exercise, {
			props: {
				name: 'Test Exercise',
				eid: 'testExerciseId',
				wid: 'testId',
				baseline: {
					sets: 1,
					reps: 15,
					weight: 20
				},
				toggleFlyout: vi.fn()
			}
		});
		expect(getByText('Test Exercise')).toBeInTheDocument();
	});

	test('only allows numbers for weight input', async () => {

        const {getByRole} = await render(Exercise, {
			props: {
				name: 'Test Exercise',
				eid: 'testExerciseId',
				wid: 'testId',
				baseline: {
					sets: 1,
					reps: 15,
					weight: 20
				},
				toggleFlyout: vi.fn()
			}
		});

        const weightInput = getByRole('spinbutton', {name: ''});
        expect(weightInput).toBeTruthy()

        
        await fireEvent.input(weightInput, {target: {value: '205'}});
        expect(weightInput.value).toBe('205');

        await fireEvent.keyDown(weightInput, {key: 'a', keyCode: 65});
        expect(weightInput.value).toBe('205');

        await fireEvent.keyDown(weightInput, {key: 'Backspace', keyCode: 8});        
        expect(weightInput.value).toBe('20');
        
        await fireEvent.keyDown(weightInput, {key: 'Backspace', keyCode: 8});        
        expect(weightInput.value).toBe('2');

        await fireEvent.keyDown(weightInput, {key: 'z'});
        expect(weightInput.value).toBe('2');

	});
});

describe('Internal function', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    const mockData = {
        workouts: [
            {
                wid: 'testId',
                muscles: [
                    {
                        id: 'testMuscleId',
                        exercises: [
                            {
                                eid: 'testExercise1',
                                baseline: {
                                    sets: 1,
                                    reps: 15,
                                    weight: 20
                                }
                            },
                            {
                                eid: 'testExercise2',
                                baseline: {
                                    sets: 1,
                                    reps: 15,
                                    weight: 20
                                }
                            },
                            {
                                eid: 'testExercise3',
                                baseline: {
                                    sets: 1,
                                    reps: 15,
                                    weight: 20
                                }
                            }                                
                        ]
                    }
                ],
            }
        ]
    }

    test('deleteExercise should remove the desired exercise', async () => {

        userTemplateData.subscribe.mockImplementation((callback) => {
            callback(mockData);
            return () => {};
        });

        const {component} = await render(Exercise, {
            props: {
                name: 'Test Exercise',
                eid: 'testExercise2',
                wid: 'testId',
                baseline: {
                    sets: 1,
                    reps: 15,
                    weight: 20
                },
                toggleFlyout: vi.fn()
            }
        });

        const internalFunctions = component.getInternalFunction()
        internalFunctions.deleteExercise('testExercise2');
        
        expect(userTemplateData.update).toHaveBeenCalled()

        const updateMock = userTemplateData.update.mock.calls[0][0];
        const result = updateMock(mockData);
        expect(result.workouts[0].muscles[0].exercises).toHaveLength(2);    

    })

    test('updates exercise baseline values from input values', async () => {

        userTemplateData.subscribe.mockImplementation((callback) => {
            callback(mockData);
            return () => {};
        });

        const {component} = await render(Exercise, {
            props: {
                name: 'Test Exercise',
                eid: 'testExercise2',
                wid: 'testId',
                baseline: {
                    sets: 1,
                    reps: 15,
                    weight: 20
                },
                toggleFlyout: vi.fn()
            }
        });

        const internalFunctions = component.getInternalFunction()
        internalFunctions.handleExerciseVariables({value: '3', column: 'sets', eid: 'testExercise3'});
        
        expect(userTemplateData.update).toHaveBeenCalled()

        const updateMock = userTemplateData.update.mock.calls[0][0];
        const result = updateMock(mockData);
        expect(result.workouts[0].muscles[0].exercises[2].baseline.sets).toBe(3)

    })
})