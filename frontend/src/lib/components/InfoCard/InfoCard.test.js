// @ts-nocheck
import InfoCard from "./InfoCard.svelte";
import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/svelte";

describe('Info Card', () => {

    beforeEach(() => {
        render(InfoCard, {content: {title: 'Test title', text: 'Some content', button: 'The Button', href: '/'}})
    })

    test('renders with title and text content', () => {
        expect(screen.getByText('Test title')).toBeInTheDocument();
        expect(screen.getByText('Some content')).toBeInTheDocument();
    })

    test('renders a button', () => {
        expect(screen.getByText('The Button')).toBeInTheDocument();
    })
    
})