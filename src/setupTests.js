// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            averageTimeAll: 120000,
            averageTimeHigh: 60000,
            averageTimeMedium: 120000,
            averageTimeLow: 180000,
            items: [],
            totalPages: 1,
        }),
    })
);
