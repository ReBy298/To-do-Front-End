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

export function Modal_PopUp({open, handleClose, taskToEdit,handleSubmit,taskName,setTaskName, priority_Modal,setPriorityModal,dueDate,setDueDate}){
    return(
        <Container>
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
                                    let localDateTime = "";
                                    if(e.value !== null){
                                        localDateTime = new Date(e.value.getTime() - e.value.getTimezoneOffset() * 60000);   
                                    }
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
        </Container>
    )

}