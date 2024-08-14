
import {
    Container,
    Grid,
    Pagination,
    PaginationItem,
} from '@mui/material';

export function Tasks_Pagination({totalPages, page, setPage}) {
    const handlePageChange = (event, value) => {
        if (value !== page) {
            setPage(value);
        }
    };

    return (
        <Container>
            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                        />
                    )}
                />
            </Grid>
        </Container>
    );
}