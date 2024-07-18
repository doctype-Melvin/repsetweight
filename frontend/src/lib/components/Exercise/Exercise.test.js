// @ts-nocheck

import { userTemplateData } from '$lib/stores';
import { vi, beforeEach, test, describe, expect } from 'vitest';
import Exercise from './Exercise.svelte';
import { render, screen } from '@testing-library/svelte';

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
				toggleFlyout: vi.fn()
			}
		});
		expect(getByText('Test Exercise')).toBeInTheDocument();
	});
});
