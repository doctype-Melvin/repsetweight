import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import Composer from './Composer.svelte';

test('Composer reders', () => {
    render(Composer);
    const composerElement = screen.getByText(/no muscle group selected/i)

    expect(composerElement).toBeInTheDocument();
})