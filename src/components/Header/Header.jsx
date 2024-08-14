import {
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    Container,
    FormControl,
    InputLabel,
    Grid,
    InputAdornment

} from '@mui/material';

export function Header({name, setName, priority, setPriority, state, setState, label, setLabel, handleSearch, handleOpen}) {

    return (<Container>
        <Typography variant="h5" align="center">
            To-Do
        </Typography>

        <FormControl fullWidth style={{ marginBottom: '16px' }}>
            {label && <InputLabel>Name</InputLabel>}
            <TextField
                id="name-input"
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
                label= "Name"
            />
        </FormControl>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select label="priority" value={priority} onChange={(e) => setPriority(e.target.value)} data-testid="priority-select">
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
                    <Select value={state} onChange={(e) => setState(e.target.value)} data-testid="state-select">
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

    </Container>)
}

