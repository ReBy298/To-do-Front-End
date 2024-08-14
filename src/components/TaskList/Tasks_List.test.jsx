import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Para las aserciones
import { Tasks_List } from './Tasks_List'; // Asegúrate de usar la ruta correcta
import { FaSort, FaRegTrashCan } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';

// Mock de los iconos si no están en el entorno de prueba
jest.mock('react-icons/fa', () => ({
    FaSort: () => <span>Sort</span>,
    FaRegTrashCan: () => <span>Delete</span>
}));
jest.mock('react-icons/gr', () => ({
    GrEdit: () => <span>Edit</span>
}));

describe('Tasks_List', () => {
    const mockHandlePrioritySortClick = jest.fn();
    const mockHandleDueDateSortClick = jest.fn();
    const mockHandleToggleDone = jest.fn();
    const mockHandleEditClick = jest.fn();
    const mockDeleteTask = jest.fn();

    const todoItems = [
        { id: 1, name: 'Task 1', priority: 'High', dueDate: '2024-08-20', done: false },
        { id: 2, name: 'Task 2', priority: 'Medium', dueDate: null, done: true },
    ];

    const todoItemsFlags = [
        { item: { id: 1 }, flag: 1 },
        { item: { id: 2 }, flag: 3 },
    ];

    it('renders correctly with given todoItems', () => {
        render(
            <Tasks_List
                todoItems={todoItems}
                handlePrioritySortClick={mockHandlePrioritySortClick}
                handleDueDateSortClick={mockHandleDueDateSortClick}
                todoItemsFlags={todoItemsFlags}
                handleToggleDone={mockHandleToggleDone}
                handleEditClick={mockHandleEditClick}
                deleteTask={mockDeleteTask}
            />
        );

        // Verifica que se muestre la tabla
        expect(screen.getByRole('table')).toBeInTheDocument();

        // Verifica que se muestren las filas de la tabla con los datos correctos
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
        // Usa una función matcher para encontrar la fecha, por ejemplo:
        expect(screen.getByText((content, element) => {
            return element.textContent === new Date('2024-08-20').toLocaleDateString();
        })).toBeInTheDocument();

        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Medium')).toBeInTheDocument();
        expect(screen.getByText('Not Defined')).toBeInTheDocument();
    });


    it('calls handlePrioritySortClick when priority sort icon is clicked', () => {
        render(
            <Tasks_List
                todoItems={todoItems}
                handlePrioritySortClick={mockHandlePrioritySortClick}
                handleDueDateSortClick={mockHandleDueDateSortClick}
                todoItemsFlags={todoItemsFlags}
                handleToggleDone={mockHandleToggleDone}
                handleEditClick={mockHandleEditClick}
                deleteTask={mockDeleteTask}
            />
        );

        fireEvent.click(screen.getByTestId('sort-priority')); // Click en el icono de ordenación por prioridad

        expect(mockHandlePrioritySortClick).toHaveBeenCalledWith('priority');
    });
    it('calls handlePrioritySortClick when priority sort icon is clicked', () => {
        render(
            <Tasks_List
                todoItems={todoItems}
                handlePrioritySortClick={mockHandlePrioritySortClick}
                handleDueDateSortClick={mockHandleDueDateSortClick}
                todoItemsFlags={todoItemsFlags}
                handleToggleDone={mockHandleToggleDone}
                handleEditClick={mockHandleEditClick}
                deleteTask={mockDeleteTask}
            />
        );

        fireEvent.click(screen.getByTestId('sort-priority')); // Click en el icono de ordenación por prioridad

        expect(mockHandlePrioritySortClick).toHaveBeenCalledWith('priority');
    });

    it('calls handleToggleDone when checkbox is clicked', () => {
        render(
            <Tasks_List
                todoItems={todoItems}
                handlePrioritySortClick={mockHandlePrioritySortClick}
                handleDueDateSortClick={mockHandleDueDateSortClick}
                todoItemsFlags={todoItemsFlags}
                handleToggleDone={mockHandleToggleDone}
                handleEditClick={mockHandleEditClick}
                deleteTask={mockDeleteTask}
            />
        );

        fireEvent.click(screen.getAllByRole('checkbox')[0]); // Click en el checkbox de la primera tarea

        expect(mockHandleToggleDone).toHaveBeenCalledWith(1);
    });

    it('calls handleEditClick when edit icon is clicked', () => {
        render(
            <Tasks_List
                todoItems={todoItems}
                handlePrioritySortClick={mockHandlePrioritySortClick}
                handleDueDateSortClick={mockHandleDueDateSortClick}
                todoItemsFlags={todoItemsFlags}
                handleToggleDone={mockHandleToggleDone}
                handleEditClick={mockHandleEditClick}
                deleteTask={mockDeleteTask}
            />
        );

        fireEvent.click(screen.getAllByText('Edit')[0]); // Click en el icono de edición de la primera tarea

        expect(mockHandleEditClick).toHaveBeenCalledWith(todoItems[0]);
    });

    it('calls deleteTask when delete icon is clicked', () => {
        render(
            <Tasks_List
                todoItems={todoItems}
                handlePrioritySortClick={mockHandlePrioritySortClick}
                handleDueDateSortClick={mockHandleDueDateSortClick}
                todoItemsFlags={todoItemsFlags}
                handleToggleDone={mockHandleToggleDone}
                handleEditClick={mockHandleEditClick}
                deleteTask={mockDeleteTask}
            />
        );

        // Selecciona el botón de eliminar usando data-testid
        fireEvent.click(screen.getByTestId('delete-task-1')); // Click en el icono de eliminar de la primera tarea

        expect(mockDeleteTask).toHaveBeenCalledWith(1);
    });


    it('renders rows with correct background color based on flag', () => {
        render(
            <Tasks_List
                todoItems={todoItems}
                handlePrioritySortClick={mockHandlePrioritySortClick}
                handleDueDateSortClick={mockHandleDueDateSortClick}
                todoItemsFlags={todoItemsFlags}
                handleToggleDone={mockHandleToggleDone}
                handleEditClick={mockHandleEditClick}
                deleteTask={mockDeleteTask}
            />
        );

        // Verifica los colores de fondo en función de la bandera
        expect(screen.getAllByRole('row')[1]).toHaveStyle('background-color: #FF7F7F'); // Para la primera tarea
        expect(screen.getAllByRole('row')[2]).toHaveStyle('background-color: #99FF99'); // Para la segunda tarea
    });
});
