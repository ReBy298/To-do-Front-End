
import IconButton from '@mui/material/IconButton';
import { GrEdit } from "react-icons/gr";
import { FaSort } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import {
    Checkbox,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
export function Tasks_List({ todoItems, handlePrioritySortClick, handleDueDateSortClick, todoItemsFlags, handleToggleDone, handleEditClick, deleteTask }) {
    return (
        <Container style={{width:"100%"}}>
            {todoItems && (
                <TableContainer style={{ borderRadius: "10px", overflow: 'hidden' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Done</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell> Priority<IconButton style={{ marginLeft: '10px' }} onClick={() => handlePrioritySortClick('priority')} data-testid="sort-priority">
                                    <FaSort />
                                </IconButton></TableCell>
                                <TableCell>Due Date<IconButton style={{ marginLeft: '10px' }} onClick={() => handleDueDateSortClick('dueDate')} data-testid="sort-due-date">
                                    <FaSort />
                                </IconButton></TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todoItems.map((task) => {
                                // Encuentra el objeto correspondiente en todoItemsFlags
                                const flagObject = todoItemsFlags.find(flagItem => flagItem.item.id === task.id);
                                let flag = flagObject ? flagObject.flag : 0;

                                // Asigna un color de fondo en función del valor de la bandera
                                let backgroundColor;
                                switch (flag) {
                                    case 0:
                                        backgroundColor = 'transparent'; // No due date – No background color
                                        break;
                                    case 1:
                                        backgroundColor = '#FF7F7F'; // One week between due date and today – Light red background color
                                        break;
                                    case 2:
                                        backgroundColor = '#FFFF99'; // 2 weeks between due date and today – Light yellow background color
                                        break;
                                    case 3:
                                        backgroundColor = '#99FF99'; // More that 2 weeks between due date and today – Light green background color
                                        break;
                                    default:
                                        backgroundColor = 'transparent';
                                }

                                return (
                                    <TableRow key={task.id} style={task.done ? { backgroundColor, borderRadius: "5px", textDecoration: 'line-through' } : { backgroundColor, borderRadius: "5px" }}>
                                        <TableCell>
                                            <Checkbox
                                                onChange={() => handleToggleDone(task.id)}
                                                checked={task.done}
                                            />
                                        </TableCell>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>
                                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not Defined'}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton style={{ marginRight: '10px' }} onClick={() => handleEditClick(task)} data-testid={`edit-task-${task.id}`}>
                                                <GrEdit />
                                            </IconButton>
                                            <IconButton onClick={() => deleteTask(task.id)} data-testid={`delete-task-${task.id}`}>
                                                <FaRegTrashCan />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    )
}




