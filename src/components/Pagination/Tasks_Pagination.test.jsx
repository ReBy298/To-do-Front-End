import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Para las aserciones
import { Tasks_Pagination } from './Tasks_Pagination'; // Asegúrate de usar la ruta correcta

describe('Tasks_Pagination', () => {
    const setPage = jest.fn();

    it('renders correctly with given totalPages and page', () => {
        render(
            <Tasks_Pagination
                totalPages={5}
                page={1}
                setPage={setPage}
            />
        );

        // Verifica que se muestre el componente Pagination
        const pagination = screen.getByRole('navigation');
        expect(pagination).toBeInTheDocument();

        // Verifica que se muestran los elementos de la paginación
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('calls setPage when a page is clicked', () => {
        render(
            <Tasks_Pagination
                totalPages={5}
                page={1}
                setPage={setPage}
            />
        );

        // Simula el clic en la página 3
        fireEvent.click(screen.getByText('3'));

        // Verifica que setPage fue llamado con el valor correcto
        expect(setPage).toHaveBeenCalledWith(3);
    });

    it('does not call setPage if the same page is clicked', () => {
        render(
            <Tasks_Pagination
                totalPages={5}
                page={1}
                setPage={setPage}
            />
        );

        // Simula el clic en la página 1, que es la página actual
        fireEvent.click(screen.getByText('1'));

        // Verifica que setPage no fue llamado
        expect(setPage).not.toHaveBeenCalled();
    });

});
