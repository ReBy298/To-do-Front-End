
import { FaRegTrashCan } from "react-icons/fa6";
import "./App.css";
import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { GrEdit } from "react-icons/gr";
import { FaSort } from "react-icons/fa";
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Checkbox,
    Typography,
    Container,
    Paper,
    FormControl,
    InputLabel,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Pagination,
    PaginationItem,
    InputAdornment

} from '@mui/material';

import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

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
    const [taskName, setTaskName] = useState("Nueva Tarea");
    const [priority_Modal, setPriorityModal] = useState("Medium");
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
            console.log(data);
            // Aquí puedes actualizar tu estado o hacer algo con los datos devueltos
        }
    }

    const handleEditClick = (task) => {
        setTaskToEdit(task);
        setDueDate(task.dueDate); // Asegúrate de que estás estableciendo el estado de dueDate
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
            // Aquí puedes actualizar tu estado o hacer algo con los datos devueltos
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
        }
    }


    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '100px', margin: '20px auto', marginBottom: '100px' }}>
                <Typography variant="h5" align="center">
                    To-Do
                </Typography>
                {/* Encabezado */}

                <FormControl fullWidth style={{ marginBottom: '16px' }}>
                    {label && <InputLabel>Name</InputLabel>}
                    <TextField
                        variant="outlined"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setLabel(!e.target.value);
                        }}
                        InputProps={{
                            startAdornment: !label && (
                                <InputAdornment position="start">Name</InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>State</InputLabel>
                            <Select value={state} onChange={(e) => setState(e.target.value)}>
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                                <MenuItem value="Undone">Undone</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} container justifyContent="center">
                        <Button variant="contained" style={{ width: '50%', padding: '10px', marginTop: '5px' }} onClick={handleSearch}>
                            Search
                        </Button>
                    </Grid>

                </Grid>



                <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={handleOpen} >
                        Add Task
                    </Button>
                </Grid>

                {/* Modal */}
                <Modal open={open} onClose={handleClose}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                        <Typography variant="h5" align="center">
                            {taskToEdit ? 'Edit To-Do' : 'New To-Do'}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Task Name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                inputProps={{ maxLength: 120 }}
                                fullWidth
                                required
                                style={{ marginBottom: "20px" }}
                            />
                            <FormControl fullWidth style={{ marginBottom: "20px" }}>
                                <InputLabel >Priority</InputLabel>
                                <Select value={priority_Modal} onChange={(e) => setPriorityModal(e.target.value)} required>
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </FormControl>
                            <DateTimePickerComponent
                                value={dueDate} // Convierte dueDate a un objeto Date
                                onChange={(e) => {
                                    // Convierte la fecha y hora a tu zona horaria local
                                    const localDateTime = new Date(e.value.getTime() - e.value.getTimezoneOffset() * 60000);
                                    setDueDate(localDateTime);
                                }}
                                min={new Date()}
                            />

                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', align: 'center' }}>
                                {taskToEdit ? 'Save Changes' : 'Submit'}
                            </Button>
                        </form>
                    </div>


                </Modal>

                {/* Task List */}
                {todoItems && (
                    <TableContainer style={{ borderRadius: "10px", overflow: 'hidden' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Done</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell> Priority<IconButton style={{ marginLeft: '10px' }} onClick={() => handlePrioritySortClick('priority')}>
                                        <FaSort />
                                    </IconButton></TableCell>
                                    <TableCell>Due Date<IconButton style={{ marginLeft: '10px' }} onClick={() => handleDueDateSortClick('dueDate')} >
                                        <FaSort />
                                    </IconButton></TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todoItems.map((task) => {
                                    // Encuentra el objeto correspondiente en todoItemsFlags
                                    const flagObject = todoItemsFlags.find(flagItem => flagItem.item.id === task.id);
                                    let flag = flagObject ? flagObject.flag : 0;

                                    // Asigna un color de fondo en función del valor de la bandera
                                    let backgroundColor;
                                    switch (flag) {
                                        case 0:
                                            backgroundColor = 'transparent'; // No due date – No background color
                                            break;
                                        case 1:
                                            backgroundColor = '#FF7F7F'; // One week between due date and today – Light red background color
                                            break;
                                        case 2:
                                            backgroundColor = '#FFFF99'; // 2 weeks between due date and today – Light yellow background color
                                            break;
                                        case 3:
                                            backgroundColor = '#99FF99'; // More that 2 weeks between due date and today – Light green background color
                                            break;
                                        default:
                                            backgroundColor = 'transparent';
                                    }

                                    return (
                                        <TableRow key={task.id} style={task.done ? { backgroundColor, borderRadius: "5px", textDecoration: 'line-through' } : { backgroundColor, borderRadius: "5px" }}>
                                            <TableCell>
                                                <Checkbox
                                                    onChange={() => handleToggleDone(task.id)}
                                                    checked={task.done}
                                                />
                                            </TableCell>
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.priority}</TableCell>
                                            <TableCell>
                                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not Defined'}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton style={{ marginRight: '10px' }} onClick={() => handleEditClick(task)}>
                                                    <GrEdit />
                                                </IconButton>
                                                <IconButton onClick={() => deleteTask(task.id)}>
                                                    <FaRegTrashCan />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                            />
                        )}
                    />
                </Grid>
                {/* Footer */}
                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                    <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Average time to finish tasks:
                        </Typography>
                        <Typography variant="h4" color="secondary">
                            {isNaN(averageTimeAll) ? "No done tasks" : (averageTimeAll / 60000).toFixed(2) + " min"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Average time to finish tasks by priority:
                        </Typography>
                        <Typography variant="body1">
                            {"High"}: {isNaN(averageTimeHigh) ? "No done tasks" : (averageTimeHigh / 60000).toFixed(2) + " min"}
                        </Typography>
                        <Typography variant="body1">
                            {"Medium"}: {isNaN(averageTimeMedium) ? "No done tasks" : (averageTimeMedium / 60000).toFixed(2) + " min"}
                        </Typography>
                        <Typography variant="body1">
                            {"Low"}: {isNaN(averageTimeLow) ? "No done tasks" : (averageTimeLow / 60000).toFixed(2) + " min"}
                        </Typography>
                    </Grid>
                </Grid>


            </Paper>
        </Container>

    );
};

export default App;
