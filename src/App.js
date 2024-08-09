

import "./App.css";
import React, { useEffect, useState } from "react";
import TodoItem from "./components/todoItem";
import IconButton from '@mui/material/IconButton';

import {
  TextField,
  Select,
  MenuItem,
  Button,
  Checkbox,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Grid,
  Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Modal,
    Pagination,
    PaginationItem,
    InputAdornment
} from '@mui/material';

function App() {
  const [todoItems, setTodoItems] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("All");
  const [state, setState] = useState("All");
  const [label, setLabel] = useState(true);

  useEffect(() => {
    console.log("useEffect Loaded.");
    fetchTodoItems();
  }, [page]);

  const fetchTodoItems = () => {
    fetch(`http://localhost:8080/api/todos?name=${name}&priority=${priority}&state=${state}&page=${page}&pageSize=10`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Todo Items List:", data); 
        setTodoItems(data.items); 
        setTotalPages(data.totalPages); 
      });
  };

  const handleSearch = () => {
    
    fetchTodoItems(priority, name, state);
};

const handleToggleDone = (id) => {
    // Crea una nueva copia de todoItems
    const newTodoItems = [...todoItems];

    // Encuentra la tarea en el nuevo array por su id
    const task = newTodoItems.find((task) => task.id === id);

    if (task) {
        // Cambia el valor de 'done'
        task.done = !task.done;

        // Actualiza la tarea en el servidor
        updateTask(id, task)
            .then(() => {
                // Actualiza el estado con el nuevo array
                setTodoItems(newTodoItems);
            })
            .catch((error) => {
                console.error('Error updating task:', error);
                // Aquí puedes manejar los errores
            });
    }
}
const updateTask = async (id, todoItem) => {
    const response = await fetch(`http://localhost:8080/api/todos/${id}/done`, {
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


  const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

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

          {/* Task List */}
          
          <Grid  container  justifyContent="center" style={{marginTop: '20px'}}>
            <Button variant="contained" onClick={handleOpenModal} >
                Add Task
            </Button>
          </Grid>
           
          {/* Modal */}
          <Modal open={openModal} onClose={handleCloseModal}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        {/* Add modal content here */}
                        <Typography variant="h4">Modal Content</Typography>
                        <Button variant="contained" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </div>
                </Modal> 
            {/* Task List */} 
            {/* Task List */}
            {todoItems && (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Done</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Due Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todoItems.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>
                                            <Checkbox
                                                 onChange={() => handleToggleDone(task.id)}
                                                 checked={task.done}
                                            />
                                        </TableCell>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>{task.dueDate}</TableCell>
                                        <TableCell>
                                        <IconButton aria-label="delete">
                                           
                                        </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
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
        </Paper>
    </Container>
    
);
};

export default App;
