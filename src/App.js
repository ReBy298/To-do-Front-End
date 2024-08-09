

import "./App.css";
import React, { useEffect, useState } from "react";
import TodoItem from "./components/todoItem";

import {
  TextField,
  Select,
  MenuItem,
  Button,
  Checkbox,
  IconButton,
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
} from '@mui/material';

function App() {
  const [todoItems, setTodoItems] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log("useEffect Loaded.");
    fetchTodoItems();
  }, [page]);

  const fetchTodoItems = () => {
    fetch(`http://localhost:8080/api/todoItems?page=${page}&pageSize=10`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Todo Items List:", data); // Accede a los items con "items"
        setTodoItems(data.items); // Accede a los items con "items"
        setTotalPages(data.totalPages); // Accede a totalPages con "totalPages"
      });
  };
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
                    <InputLabel>Name</InputLabel>
                    <TextField variant="outlined" />
                </FormControl>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select>
                                <MenuItem value="high">High</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>State</InputLabel>
                            <Select>
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="done">Done</MenuItem>
                                <MenuItem value="undone">Undone</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} container justifyContent="center">
                      <Button variant="contained" style={{ width: '50%', padding: '10px', marginTop: '5px' }}>
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
                                                // onChange={() => handleToggleDone(task.id)}
                                                // checked={task.done}
                                            />
                                        </TableCell>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>{task.dueDate}</TableCell>
                                        <TableCell>
                                            {/* Add edit and delete icons/buttons */}
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
