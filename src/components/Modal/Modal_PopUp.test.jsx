import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Para las aserciones
import { Modal_PopUp } from './Modal_PopUp'; // Asegúrate de usar la ruta correcta

// Mock de DateTimePickerComponent
jest.mock('@syncfusion/ej2-react-calendars', () => ({
    DateTimePickerComponent: ({ value, onChange }) => (
        <input
            data-testid="date-time-picker"
            value={value ? value.toISOString() : ''}
            onChange={e => {
                const newValue = new Date(e.target.value);
                onChange({ value: newValue });
            }}
        />
    )
}));

describe('Modal_PopUp', () => {
    const mockHandleClose = jest.fn();
    const mockHandleSubmit = jest.fn();

    it('renders correctly when creating a new task', () => {
        render(
            <Modal_PopUp
                open={true}
                handleClose={mockHandleClose}
                taskToEdit={false}
                handleSubmit={mockHandleSubmit}
                taskName=""
                setTaskName={jest.fn()}
                priority_Modal=""
                setPriorityModal={jest.fn()}
                dueDate={null}
                setDueDate={jest.fn()}
            />
        );

        expect(screen.getByText('New To-Do')).toBeInTheDocument();
        expect(screen.getByText('Task Name')).toBeInTheDocument();
        expect(screen.getByText('Priority')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('renders correctly when editing a task', () => {
        render(
            <Modal_PopUp
                open={true}
                handleClose={mockHandleClose}
                taskToEdit={true}
                handleSubmit={mockHandleSubmit}
                taskName="Existing Task"
                setTaskName={jest.fn()}
                priority_Modal="High"
                setPriorityModal={jest.fn()}
                dueDate={new Date()}
                setDueDate={jest.fn()}
            />
        );

        expect(screen.getByText('Edit To-Do')).toBeInTheDocument();
        expect(screen.getByText('Task Name')).toBeInTheDocument();
        expect(screen.getByText('Priority')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    });

    

});
