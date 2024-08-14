// App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Configuración del mock global
beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url.includes('colorFlags')) {
            return Promise.resolve({
                json: () => Promise.resolve([]),
            });
        }
        if (url.includes('todos')) {
            return Promise.resolve({
                json: () => Promise.resolve({
                    items: [],
                    totalPages: 1,
                }),
            });
        }
        if (url.includes('averageTime')) {
            return Promise.resolve({
                json: () => Promise.resolve({
                    averageTimeAll: 120000,
                    averageTimeHigh: 60000,
                    averageTimeMedium: 120000,
                    averageTimeLow: 180000,
                }),
            });
        }
        return Promise.reject('Unknown API call');
    });
});

test('renders App component correctly', async () => {
    render(<App />);

    // Verifica si el Header está renderizado
    expect(screen.getByText(/Average time to finish tasks:/)).toBeInTheDocument();
    expect(screen.getByText(/Average time to finish tasks by priority:/)).toBeInTheDocument();

    // Simula una interacción de búsqueda
    fireEvent.click(screen.getByText(/Search/i));
    await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
    });
});
