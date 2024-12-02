import {
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    Container,
    FormControl,
    InputLabel,
    Modal
} from '@mui/material';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

// Modal_PopUp component to handle adding and editing tasks
export function Modal_PopUp({ open, handleClose, taskToEdit, handleSubmit, taskName, setTaskName, priority_Modal, setPriorityModal, dueDate, setDueDate }) {
    return (
        // Container to hold the modal content
        <Container>
            {/* Modal component to display the popup */}
            <Modal open={open} onClose={handleClose}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                    {/* Title of the modal, changes based on whether editing or adding a task */}
                    <Typography variant="h5" align="center">
                        {taskToEdit ? 'Edit To-Do' : 'New To-Do'}
                    </Typography>
                    {/* Form to handle task submission */}
                    <form onSubmit={handleSubmit}>
                        {/* TextField for entering the task name */}
                        <TextField
                            label="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            inputProps={{ maxLength: 120 }}
                            fullWidth
                            required
                            style={{ marginBottom: "20px" }}
                        />
                        {/* FormControl for selecting task priority */}
                        <FormControl fullWidth style={{ marginBottom: "20px" }}>
                            <InputLabel>Priority</InputLabel>
                            <Select value={priority_Modal} onChange={(e) => setPriorityModal(e.target.value)} required>
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </FormControl>
                        {/* DateTimePickerComponent for selecting due date and time */}
                        <DateTimePickerComponent
                            value={dueDate} // Convert dueDate to a Date object
                            onChange={(e) => {
                                // Convert the date and time to local timezone
                                let localDateTime = "";
                                if (e.value !== null) {
                                    localDateTime = new Date(e.value.getTime() - e.value.getTimezoneOffset() * 60000);
                                }
                                setDueDate(localDateTime);
                            }}
                            min={new Date()}
                        />
                        {/* Button to submit the form, changes text based on whether editing or adding a task */}
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', align: 'center' }}>
                            {taskToEdit ? 'Save Changes' : 'Submit'}
                        </Button>
                    </form>
                </div>
            </Modal>
        </Container>
    )
}