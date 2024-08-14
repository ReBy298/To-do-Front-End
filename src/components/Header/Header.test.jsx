import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Header } from './Header';

describe('Header Component', () => {
  const mockSetName = jest.fn();
  const mockSetPriority = jest.fn();
  const mockSetState = jest.fn();
  const mockSetLabel = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockHandleOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Header component and interact with it', () => {
    render(
      <Header
        name=""
        setName={mockSetName}
        priority="All"
        setPriority={mockSetPriority}
        state="All"
        setState={mockSetState}
        label={true}
        setLabel={mockSetLabel}
        handleSearch={mockHandleSearch}
        handleOpen={mockHandleOpen}
      />
    );

    expect(screen.getByText(/To-Do/i)).toBeInTheDocument();

    // Verifica que el campo de texto está presente y se puede interactuar
    const nameInput = screen.getByRole('textbox', { name: "Name" });
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    expect(mockSetName).toHaveBeenCalledWith('Test Name');
    expect(mockSetLabel).toHaveBeenCalledWith(false);

    // Verifica que el botón de búsqueda está presente y se puede interactuar
    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(mockHandleSearch).toHaveBeenCalled();

    // Verifica que el botón de agregar tarea está presente y se puede interactuar
    const addTaskButton = screen.getByRole('button', { name: /Add Task/i });
    expect(addTaskButton).toBeInTheDocument();
    fireEvent.click(addTaskButton);
    expect(mockHandleOpen).toHaveBeenCalled();


  });
});
