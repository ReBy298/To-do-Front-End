import {
    Container,
    Grid,
    Pagination,
    PaginationItem,
} from '@mui/material';

// Tasks_Pagination component to handle pagination of tasks
export function Tasks_Pagination({totalPages, page, setPage}) {
    // Function to handle page change
    const handlePageChange = (event, value) => {
        if (value !== page) {
            setPage(value);
        }
    };

    return (
        // Container to hold the pagination component
        <Container>
            {/* Grid container to center the pagination */}
            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                {/* Pagination component to navigate through pages */}
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        // Render each pagination item
                        <PaginationItem
                            {...item}
                        />
                    )}
                />
            </Grid>
        </Container>
    );
}