
import {
    Typography,
    Container,
    Grid,
} from '@mui/material';

// Footer component to display average task completion times
export function Footer({ averageTimeAll, averageTimeHigh, averageTimeMedium, averageTimeLow}) {
    return (
        // Container to hold the footer content
        <Container>
            {/* Grid container to layout the footer items with spacing and centered alignment */}
            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                {/* Grid item to display the average time to finish all tasks */}
                <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Average time to finish tasks:
                    </Typography>
                    <Typography variant="h4" color="secondary">
                        {/* Display average time in minutes or a message if no tasks are done */}
                        {isNaN(averageTimeAll) ? "No done tasks" : (averageTimeAll / 60000).toFixed(2) + " min"}
                    </Typography>
                </Grid>
                {/* Grid item to display the average time to finish tasks by priority */}
                <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Average time to finish tasks by priority:
                    </Typography>
                    <Typography variant="body1">
                        {/* Display average time for high priority tasks in minutes or a message if no tasks are done */}
                        {"High"}: {isNaN(averageTimeHigh) ? "No done tasks" : (averageTimeHigh / 60000).toFixed(2) + " min"}
                    </Typography>
                    <Typography variant="body1">
                        {/* Display average time for medium priority tasks in minutes or a message if no tasks are done */}
                        {"Medium"}: {isNaN(averageTimeMedium) ? "No done tasks" : (averageTimeMedium / 60000).toFixed(2) + " min"}
                    </Typography>
                    <Typography variant="body1">
                        {/* Display average time for low priority tasks in minutes or a message if no tasks are done */}
                        {"Low"}: {isNaN(averageTimeLow) ? "No done tasks" : (averageTimeLow / 60000).toFixed(2) + " min"}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}