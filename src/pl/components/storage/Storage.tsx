import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {BoxedNavigator} from "../navigator/BoxedNavigator";
import {theme} from "../MainPage/MainPage";
import {ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {getAllStorage, addStorageItem, StorageDTO} from "../../services/Api";
import {CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

export const Storage = () => {
    const [storage, setStorage] = useState<StorageDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [refetch, setRefetch] = useState<boolean>(false);
    const [newPart, setNewPart] = useState<{ name: string, type: string, stock: number, price: number }>({
        name: '',
        type: '',
        stock: 0,
        price: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllStorage();
                setStorage(result);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [refetch]);

    const handleAddPart = async () => {
        try {
            const addedPart = await addStorageItem(newPart);
            setStorage([...storage, addedPart]);
            setOpen(false);
            setNewPart({ name: '', type: '', stock: 0, price: 0 });
            setRefetch(true)
        } catch (error) {
            console.error('Failed to add part:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', minHeight: '100vh'}}>
                <BoxedNavigator/>
                <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
                    <AppBar
                        position="static"
                        color="default"
                        elevation={0}
                        sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
                    >
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" sx={{mr: 1}} onClick={() => setOpen(true)}>
                                        Dodaj nową część
                                    </Button>
                                    <Button variant="contained" sx={{mr: 1}}>
                                        Dostawa
                                    </Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                        Stan magazynowy
                    </Typography>
                    <TableContainer component={Paper}>
                        {loading ? (
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                                <CircularProgress/>
                            </div>
                        ) : (
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nazwa</TableCell>
                                        <TableCell>Typ</TableCell>
                                        <TableCell>Stan magazynowy</TableCell>
                                        <TableCell>Cena</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {storage.map((storage) => (
                                        <TableRow key={storage.id}>
                                            <TableCell>{storage.name}</TableCell>
                                            <TableCell>{storage.type}</TableCell>
                                            <TableCell>{storage.stock}</TableCell>
                                            <TableCell>{storage.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                </Paper>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Dodaj nową część</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wprowadź dane nowej części.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nazwa"
                        fullWidth
                        variant="standard"
                        value={newPart.name}
                        onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Typ"
                        fullWidth
                        variant="standard"
                        value={newPart.type}
                        onChange={(e) => setNewPart({ ...newPart, type: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Stan magazynowy"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newPart.stock}
                        onChange={(e) => setNewPart({ ...newPart, stock: Number(e.target.value) })}
                    />
                    <TextField
                        margin="dense"
                        label="Cena"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newPart.price}
                        onChange={(e) => setNewPart({ ...newPart, price: Number(e.target.value) })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Anuluj</Button>
                    <Button onClick={handleAddPart}>Dodaj</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
