import * as React from 'react';
import {useEffect, useState} from 'react';
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
import {DocumentDTO, getAllDocuments} from "../../services/Api";
import {CircularProgress} from "@mui/material";

export const Documents = () => {

    const [documents, setDocuments] = useState<DocumentDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllDocuments();
                setDocuments(result);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleReport = (id: any) => {
        console.log(`Zgłoś reklamację dla dokumentu o ID: ${id}`);
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
                                    <Button variant="contained" sx={{mr: 1}}>
                                        Dodaj dokument
                                    </Button>

                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                        Obieg dokumentów
                    </Typography>
                    <TableContainer component={Paper}>
                        {loading ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh'
                            }}>
                                <CircularProgress/>
                            </div>
                        ) : (
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Numer Dokumentu</TableCell>
                                        <TableCell>Użytkownik</TableCell>
                                        <TableCell>Typ</TableCell>
                                        <TableCell>Data Wpłynięcia</TableCell>
                                        <TableCell>Akcje</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {documents.map((document) => (
                                        <TableRow key={document.id}>
                                            <TableCell>{document.number}</TableCell>
                                            <TableCell>{document.user}</TableCell>
                                            <TableCell>{document.type}</TableCell>
                                            <TableCell>{document.date}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="secondary"
                                                        onClick={() => handleReport(document.id)}>
                                                    Zgłoś reklamację
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
        </ThemeProvider>
    );
}
