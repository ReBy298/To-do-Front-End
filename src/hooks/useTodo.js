import { useState, useEffect } from 'react';

// Custom hook to manage todo items
export const useTodo = () => {
    // State variables
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

    // Fetch functions
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

    // Effect to fetch data on mount and when dependencies change
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

    // Sorting functions
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

    // Search function
    const handleSearch = () => {
        fetchTodoItems(priority, name, state);
        setPage(1);
    };

    // Modal handling functions
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTaskToEdit(null); // Reset taskToEdit when closing the modal
    };

    // Task handling functions
    const handleToggleDone = (id) => {
        const newTodoItems = [...todoItems];
        const task = newTodoItems.find((task) => task.id === id);

        if (task) {
            task.done = !task.done;

            if (task.done === true) {
                updateTaskDone(id, task)
                    .then(() => {
                        setTodoItems(newTodoItems);
                        fetchAverageTimes();
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                    });
            } else {
                updateTaskUndone(id, task)
                    .then(() => {
                        setTodoItems(newTodoItems);
                        fetchAverageTimes();
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                    });
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            name: taskName,
            priority: priority_Modal,
            dueDate: dueDate
        };

        if (taskToEdit && 'id' in taskToEdit) {
            updateTask(taskToEdit.id, task)
                .then(() => {
                    setTodoItems(todoItems.map(item => item.id === taskToEdit.id ? { ...item, ...task } : item));
                    setTaskToEdit(null);
                    fetchTodoItems();
                    fetchTodoItemsFlags();
                })
                .catch((error) => {
                    console.error('Error updating task:', error);
                });
        } else {
            createTask(task)
                .then(() => {
                    fetchTodoItems();
                    fetchTodoItemsFlags();
                })
                .catch((error) => {
                    console.error('Error creating task:', error);
                });
        }

        handleClose();
    };

    // API functions
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
        }
    };

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
        }
    };

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
    };

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
    };

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
    };

    return {
        todoItems, setTodoItems, page, setPage, totalPages, setTotalPages, name, setName, priority, setPriority, state, setState, label, setLabel, open, setOpen, dueDate, setDueDate, taskName, setTaskName, priority_Modal, setPriorityModal, taskToEdit, setTaskToEdit, sortBy1, setSortBy1, order1, setOrder1, sortBy2, setSortBy2, order2, setOrder2, averageTimeAll, setAverageTimeAll, averageTimeHigh, setAverageTimeHigh, averageTimeMedium, setAverageTimeMedium, averageTimeLow, SetAverageTimeLow, fetchFlags, setFetchFlags, todoItemsFlags, setTodoItemsFlags, handleOpen, handleClose, handleToggleDone, handleSubmit, handleSearch, handlePrioritySortClick, handleDueDateSortClick, handleEditClick, deleteTask, updateTask, createTask, updateTaskDone, updateTaskUndone, fetchTodoItemsFlags, fetchTodoItems, fetchAverageTimes, handleSortClick
    };
};