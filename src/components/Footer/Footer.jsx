
import {
    Typography,
    Container,
    Grid,
} from '@mui/material';


export function Footer({ averageTimeAll, averageTimeHigh, averageTimeMedium, averageTimeLow}) {
    return (
        <Container>
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
        </Container>
    )
}


