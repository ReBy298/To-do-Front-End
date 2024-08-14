// Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Footer } from './Footer';  // Asegúrate de que la ruta sea correcta

describe('Footer Component', () => {
    test('renders average time to finish tasks', () => {
        render(<Footer averageTimeAll={120000} averageTimeHigh={60000} averageTimeMedium={120000} averageTimeLow={180000} />);
        expect(screen.getByText(/Average time to finish tasks:/)).toBeInTheDocument();
        expect(screen.getByText('2.00 min')).toBeInTheDocument();
    });

    test('renders average time by priority', () => {
        render(<Footer averageTimeAll={120000} averageTimeHigh={60000} averageTimeMedium={120000} averageTimeLow={180000} />);
        expect(screen.getByText(/Average time to finish tasks by priority:/)).toBeInTheDocument();
        expect(screen.getByText('High: 1.00 min')).toBeInTheDocument();
        expect(screen.getByText('Medium: 2.00 min')).toBeInTheDocument();
        expect(screen.getByText('Low: 3.00 min')).toBeInTheDocument();
    });

    test('displays "No done tasks" for NaN values', () => {
        render(<Footer averageTimeAll={NaN} averageTimeHigh={NaN} averageTimeMedium={NaN} averageTimeLow={NaN} />);
        expect(screen.getByText('No done tasks')).toBeInTheDocument();
    });

    test('displays "No done tasks" for undefined values', () => {
        render(<Footer averageTimeAll={undefined} averageTimeHigh={undefined} averageTimeMedium={undefined} averageTimeLow={undefined} />);
        expect(screen.getByText('No done tasks')).toBeInTheDocument();
    });
});
