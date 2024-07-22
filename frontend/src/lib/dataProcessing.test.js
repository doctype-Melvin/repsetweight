import { test, expect, describe } from 'vitest';
import { validateTemplateData } from './dataProcessing';

describe('validateTemplateData', () => {
	const data = [
		{
			name: 'Workout 1',
			muscles: [
				{
					name: 'Muscle 1',
					exercises: [
						{
							name: 'Exercise 1',
							baseline: {
								sets: 1,
								reps: 15
							}
						}
					]
				}
			]
		}
	];

	const data2 = [
		{
			name: 'Workout 1',
			muscles: [
				{
					name: 'Muscle 1',
					exercises: [
						{
							name: 'Exercise 1',
							baseline: {
								// Sets shouldn't be 0
								sets: 0,
								reps: 15
							}
						}
					]
				}
			]
		},
		{
			name: 'Workout 2',
			muscles: [
				{
					name: 'Muscle 2',
					exercises: [
						{
							name: 'Exercise 3',
							baseline: {
								sets: 3,
								// Reps shouldn't be 0
								reps: 0
							}
						}
					]
				}
			]
		}
	];

	test('should return empty array if data is valid', () => {
		const result = validateTemplateData(data);
		expect(result).toEqual([]);
	});

	test('should return array of warnings i data is invalid', () => {
		const result = validateTemplateData(data2);
		expect(result).not.toHaveLength(0);
	});
});
