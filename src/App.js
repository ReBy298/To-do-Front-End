
import "./App.css";
import { Header } from "./components/Header/Header";
import { Tasks_List } from "./components/TaskList/Tasks_List";
import {Modal_PopUp} from "./components/Modal/Modal_PopUp";
import { Tasks_Pagination } from "./components/Pagination/Tasks_Pagination";
import { Footer } from "./components/Footer/Footer";
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
import { useTodo } from './hooks/useTodo';

function App() {
    const {
        todoItems, page, setPage, totalPages, name, setName, priority, setPriority, state, setState, label, setLabel, open, dueDate, setDueDate, taskName, setTaskName, priority_Modal, setPriorityModal, taskToEdit,  averageTimeAll, averageTimeHigh, averageTimeMedium, averageTimeLow, todoItemsFlags, handleOpen, handleClose, handleToggleDone, handleSubmit, handleSearch, handlePrioritySortClick, handleDueDateSortClick, handleEditClick, deleteTask, 
    } = useTodo();

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
