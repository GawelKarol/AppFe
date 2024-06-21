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
import {theme} from "../MainPage/MainPage";
import {ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {BoxedNavigator} from "../navigator/BoxedNavigator";
import {getAllServices, ServiceDTO} from "../../services/Api";
import {CircularProgress} from "@mui/material";

export const Appointment = () => {
    const [services, setServices] = useState<ServiceDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllServices();
                setServices(result);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                                <Grid item xs/>
                                <Grid item>
                                    <Button variant="contained" sx={{mr: 1}}>
                                        Dodaj wizytę
                                    </Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                        Terminarz
                    </Typography>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Użytkownik</TableCell>
                                        <TableCell>Nazwa Usługi</TableCell>
                                        <TableCell>Cena</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Data założenia zlecenia</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {services.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell>{service.serviceDate}</TableCell>
                                            <TableCell>{service.userName}</TableCell>
                                            <TableCell>{service.serviceName}</TableCell>
                                            <TableCell>{service.price}</TableCell>
                                            <TableCell>{service.status}</TableCell>
                                            <TableCell>{service.createdDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>

            </Box>
        </ThemeProvider>
    );
}
