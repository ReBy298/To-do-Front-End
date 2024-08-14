
import "./App.css";
import { Header } from "./components/Header/Header";
import { Tasks_List } from "./components/TaskList/Tasks_List";
import {Modal_PopUp} from "./components/Modal/Modal_PopUp";
import { Tasks_Pagination } from "./components/Pagination/Tasks_Pagination";
import { Footer } from "./components/Footer/Footer";
import React, { useEffect, useState } from "react";
import {
    Container,
    Paper,
} from '@mui/material';

import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";


function App() {
    const [todoItems, setTodoItems] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("All");
    const [state, setState] = useState("All");
    const [label, setLabel] = useState(true);
    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [taskName, setTaskName] = useState("");
    const [priority_Modal, setPriorityModal] = useState("");
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [sortBy1, setSortBy1] = useState("dueDate");
    const [order1, setOrder1] = useState("asc");
    const [sortBy2, setSortBy2] = useState("priority");
    const [order2, setOrder2] = useState("asc");
    const [averageTimeAll, setAverageTimeAll] = useState("");
    const [averageTimeHigh, setAverageTimeHigh] = useState("");
    const [averageTimeMedium, setAverageTimeMedium] = useState("");
    const [averageTimeLow, SetAverageTimeLow] = useState("");
    const [fetchFlags, setFetchFlags] = useState(true);
    const [todoItemsFlags, setTodoItemsFlags] = useState([]);


    useEffect(() => {
        if (fetchFlags) {
            fetchTodoItemsFlags();
            setFetchFlags(false);
        }

        fetchTodoItems();
        fetchAverageTimes();
        if (taskToEdit) {
            setTaskName(taskToEdit.name);
            setPriorityModal(taskToEdit.priority);
            setDueDate(taskToEdit.dueDate);
        } else {
            setTaskName('Nueva Tarea');
            setPriorityModal('Medium');
            setDueDate('');
        }
    }, [page, taskToEdit, sortBy1, sortBy2, order1, order2, fetchFlags]);



    const fetchTodoItemsFlags = () => {
        fetch(`http://localhost:9090/api/todos/colorFlags`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Todo Items List Flags:", data);
                setTodoItemsFlags(data);
            })
            .catch((error) => {
                console.error('Error fetching todo items:', error);
            });
    };

    const fetchTodoItems = () => {
        fetch(`http://localhost:9090/api/todos?name=${name}&priority=${priority}&state=${state}&page=${page}&pageSize=10&sortBy1=${sortBy1}&order1=${order1}&sortBy2=${sortBy2}&order2=${order2}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Todo Items List:", data);
                setTodoItems(data.items);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching todo items:', error);
            });
    };



    const fetchAverageTimes = () => {
        fetch('http://localhost:9090/api/todos/averageTime')
            .then(response => response.json())
            .then(data => {
                setAverageTimeAll(data.averageTimeAll);
                setAverageTimeHigh(data.averageTimeHigh);
                setAverageTimeMedium(data.averageTimeMedium);
                SetAverageTimeLow(data.averageTimeLow);
            })
            .catch((error) => {
                console.error('Error fetching average times:', error);
            });
    };



    const handleSortClick = (field) => {
        if (field === sortBy1) {
            setOrder1(order1 === "asc" ? "desc" : "asc");
        } else {
            setSortBy2(sortBy1);
            setOrder2(order1);
            setSortBy1(field);
            setOrder1("asc");
        }
    };

    const handlePrioritySortClick = () => {
        handleSortClick("priority");
    };


    const handleDueDateSortClick = () => {
        handleSortClick("dueDate");
    };


    const handleSearch = () => {
        fetchTodoItems(priority, name, state);
        setPage(1);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTaskToEdit(null); // Resetea taskToEdit cuando cierras el modal
    };

    const handleToggleDone = (id) => {
        // Crea una nueva copia de todoItems
        const newTodoItems = [...todoItems];

        // Encuentra la tarea en el nuevo array por su id
        const task = newTodoItems.find((task) => task.id === id);

        if (task) {
            // Cambia el valor de 'done'
            task.done = !task.done;

            if (task.done === true) {
                // Actualiza la tarea en el servidor
                updateTaskDone(id, task)
                    .then(() => {
                        // Actualiza el estado con el nuevo array
                        setTodoItems(newTodoItems);
                        fetchAverageTimes();
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                        // Aquí puedes manejar los errores
                    });

            } else {
                // Actualiza la tarea en el servidor
                updateTaskUndone(id, task)
                    .then(() => {
                        // Actualiza el estado con el nuevo array
                        setTodoItems(newTodoItems);
                        fetchAverageTimes();
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                        // Aquí puedes manejar los errores
                    });
            }

        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            name: taskName,
            priority: priority_Modal,
            dueDate: dueDate
        };

        if (taskToEdit && 'id' in taskToEdit) {
            // Si taskToEdit no es null y tiene una propiedad 'id', actualiza la tarea
            updateTask(taskToEdit.id, task)
                .then(() => {
                    // Actualiza el estado de las tareas
                    setTodoItems(todoItems.map(item => item.id === taskToEdit.id ? { ...item, ...task } : item));
                    setTaskToEdit(null); // Resetea taskToEdit después de actualizar la tarea
                    fetchTodoItems();
                    fetchTodoItemsFlags();
                })
                .catch((error) => {
                    console.error('Error updating task:', error);
                });
            setTodoItems(todoItems.map(task => task.id === taskToEdit.id ? updateTask : task));
        } else {
            // Si taskToEdit es null, crea una nueva tarea
            createTask(task)
                .then(() => {
                    fetchTodoItems();
                    fetchTodoItemsFlags();
                })
                .catch((error) => {
                    console.error('Error creating task: sera este el error', error);
                });
        }

        handleClose();
    };


    const createTask = async (todoItem) => {
        const response = await fetch(`http://localhost:9090/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoItem),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data);
            fetchTodoItems();
            // Aquí puedes actualizar tu estado o hacer algo con los datos devueltos
        }
    }


    const updateTaskDone = async (id, todoItem) => {

        const response = await fetch(`http://localhost:9090/api/todos/${id}/done`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoItem),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data);
            fetchTodoItems();
            fetchAverageTimes();
            // Aquí puedes actualizar tu estado o hacer algo con los datos devueltos
        }
    }

    const updateTaskUndone = async (id, todoItem) => {
        const response = await fetch(`http://localhost:9090/api/todos/${id}/undone`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoItem),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            fetchTodoItems();
            fetchAverageTimes();
            console.log(data);
        }
    }

    const handleEditClick = (task) => {
        setTaskToEdit(task);
        setDueDate(task.dueDate); 
        handleOpen();
    };


    const updateTask = async (id, todoItem) => {
        const response = await fetch(`http://localhost:9090/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoItem),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data);
            fetchTodoItemsFlags();
            fetchTodoItems();
        }
    }
    const deleteTask = async (id) => {
        const response = await fetch(`http://localhost:9090/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            setTodoItems(todoItems.filter(task => task.id !== id));
            console.log(`Task with id ${id} deleted.`);
            fetchTodoItemsFlags();
            fetchTodoItems();
            fetchAverageTimes();
        }
    }


    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '100px', margin: '20px auto', marginBottom: '100px' }}>
                {/* Header */}
                <Header 
                name={name} 
                setName={setName} 
                priority={priority} 
                setPriority={setPriority} 
                state={state} 
                setState={setState} 
                label={label} 
                setLabel={setLabel} 
                handleSearch={handleSearch} 
                handleOpen={handleOpen} 
                />
                {/* Modal */}
                <Modal_PopUp 
                open={open} 
                handleClose={handleClose} 
                taskToEdit={taskToEdit} 
                handleSubmit={handleSubmit} 
                taskName={taskName} 
                setTaskName={setTaskName} 
                priority_Modal={priority_Modal} 
                setPriorityModal={setPriorityModal} 
                dueDate={dueDate} 
                setDueDate={setDueDate} />

                {/* Task List */}
                <Tasks_List
                todoItems={todoItems}
                handlePrioritySortClick={handlePrioritySortClick}
                handleDueDateSortClick={handleDueDateSortClick}
                todoItemsFlags={todoItemsFlags}
                handleToggleDone={handleToggleDone}
                handleEditClick={handleEditClick}
                deleteTask={deleteTask}
                />

                {/* Pagination */}
                <Tasks_Pagination
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                />

                {/* Footer */}
                <Footer
                averageTimeAll={averageTimeAll}
                averageTimeHigh={averageTimeHigh}
                averageTimeMedium={averageTimeMedium}
                averageTimeLow={averageTimeLow}
                />



            </Paper>
        </Container>

    );
};

export default App;
