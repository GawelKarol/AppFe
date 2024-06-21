import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { BoxedNavigator } from "../navigator/BoxedNavigator";
import { theme } from "../MainPage/MainPage";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import { getAllUsers, deleteUser, UserDTO, addUser } from "../../services/Api";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

export const Users = () => {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [refetch, setRefetch] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<{ name: string, role: string, email: string, password: string }>({ name: '', role: 'user', email: '', password: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllUsers();
                setUsers(result);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [refetch]);

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const addedUser = await addUser(newUser);
            setUsers([...users, addedUser]);
            setOpen(false);
            setNewUser({ name: '', role: 'user', email: '', password: '' });
            setRefetch(true)
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <BoxedNavigator />
                <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
                    <AppBar
                        position="static"
                        color="default"
                        elevation={0}
                        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                    >
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">

                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: { fontSize: 'default' },
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" sx={{ mr: 1 }} onClick={() => setOpen(true)}>
                                        Dodaj użytkownika
                                    </Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                        Lista użytkowników
                    </Typography>
                    <TableContainer component={Paper}>
                        {loading ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh'
                            }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Register Date</TableCell>
                                        <TableCell>Usuwanie</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.registerDate}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    sx={{ mr: 1 }}
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Usuń użytkownika
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                </Paper>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Dodaj użytkownika</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wprowadź dane nowego użytkownika.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Imię"
                        fullWidth
                        variant="standard"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <Select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="client">Client</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Hasło"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Anuluj</Button>
                    <Button onClick={handleAddUser}>Dodaj</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
