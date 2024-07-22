// @ts-nocheck

import { userTemplateData } from '$lib/stores';
import { vi, beforeEach, test, describe, expect } from 'vitest';
import Exercise from './Exercise.svelte';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

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

	test('weight input allows only numbers', async () => {

		const user = userEvent.setup();

		const { getByRole } = await render(Exercise, {
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

		const weightInput = getByRole('textbox', { name: '' });
		
		expect(weightInput).toBeTruthy();
		expect(weightInput.value).toBe('20');

		weightInput.focus();
		await user.keyboard('{Backspace}');
		await user.keyboard('foo')
		expect(weightInput.value).toBe('2');

		
	});

	test('weight input limits decimals to two digits', async () => {
		const user = userEvent.setup();

		const { getByRole } = await render(Exercise, {
			props: {
				name: 'Test Exercise',
				eid: 'testExerciseId',
				wid: 'testId',
				baseline: {
					sets: 1,
					reps: 15,
					weight: ''
				},
				toggleFlyout: vi.fn()
			}
		});

		const weightInput = getByRole('textbox', { name: '' });
		expect(weightInput).toBeTruthy();
		expect(weightInput.value).toBe('');

		await user.type(weightInput, '15,7567');
		expect(weightInput.value).toBe('15,75');

		await user.keyboard('{Backspace}');
		await user.keyboard('{Backspace}');
		expect(weightInput.value).toBe('15,');
	});

	test('weight input allows only one decimal divider', async () => {
		const user = userEvent.setup();

		const { getByRole } = await render(Exercise, {
			props: {
				name: 'Test Exercise',
				eid: 'testExerciseId',
				wid: 'testId',
				baseline: {
					sets: 1,
					reps: 15,
					weight: ''
				},
				toggleFlyout: vi.fn()
			}
		});

		const weightInput = getByRole('textbox', { name: '' });

		expect(weightInput).toBeTruthy();
		
		await user.type(weightInput, '20.5.78')
		expect(weightInput.value).toBe('20.57');
	})

	test('weight input is limited to 6 characters', async () => {
		const user = userEvent.setup();

		const { getByRole } = await render(Exercise, {
			props: {
				name: 'Test Exercise',
				eid: 'testExerciseId',
				wid: 'testId',
				baseline: {
					sets: 1,
					reps: 15,
					weight: ''
				},
				toggleFlyout: vi.fn()
			}
		});

		const weightInput = getByRole('textbox', { name: '' });

		expect(weightInput).toBeTruthy();
		await user.type(weightInput, '1234567');
		expect(weightInput.value).toBe('123456');

		await user.clear(weightInput)
		await user.type(weightInput, '123,4567')
		expect(weightInput.value).toBe('123,45');
	})
});

describe('Internal function', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

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
				]
			}
		]
	};

	test('deleteExercise should remove the desired exercise', async () => {
		userTemplateData.subscribe.mockImplementation((callback) => {
			callback(mockData);
			return () => {};
		});

		const { component } = await render(Exercise, {
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

		const internalFunctions = component.getInternalFunction();
		internalFunctions.deleteExercise('testExercise2');

		expect(userTemplateData.update).toHaveBeenCalled();

		const updateMock = userTemplateData.update.mock.calls[0][0];
		const result = updateMock(mockData);
		expect(result.workouts[0].muscles[0].exercises).toHaveLength(2);
	});

	test('updates exercise baseline values from input values', async () => {
		userTemplateData.subscribe.mockImplementation((callback) => {
			callback(mockData);
			return () => {};
		});

		const { component } = await render(Exercise, {
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

		const internalFunctions = component.getInternalFunction();
		internalFunctions.handleExerciseVariables({
			value: '3',
			column: 'sets',
			eid: 'testExercise3'
		});

		expect(userTemplateData.update).toHaveBeenCalled();

		const updateMock = userTemplateData.update.mock.calls[0][0];
		const result = updateMock(mockData);
		expect(result.workouts[0].muscles[0].exercises[2].baseline.sets).toBe(3);
	});
});
