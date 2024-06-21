// src/components/Appointment.tsx
import * as React from 'react';
import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
import {
    changeServiceStatus,
    getAllServices,
    getAllServicesForClient,
    getAllServicesForPartner,
    ServiceDTO
} from "../../services/Api";
import {Button, CircularProgress} from "@mui/material";
import {useUser} from "../LoginPage/UserProvider";

export const Appointment = () => {
    const {role, name} = useUser();
    const [services, setServices] = useState<ServiceDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [changeStatus, setChangeStatus] = useState<boolean>();

    const firstStatus = 'Przyjęto twoje zgłoszenie'
    const secondStatus = 'Twoje auto zostało przyjęte do serwisu'
    const finalStatus = 'Twoja naprawa została zakończona'
    useEffect(() => {
        const fetchData = async () => {
            try {
                let result;
                if (role === 'admin') {
                    result = await getAllServices();
                } else if (role === 'client') {
                    result = await getAllServicesForClient(name);
                } else {
                    result = await getAllServicesForPartner(name);
                }
                setServices(result);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [changeStatus]);

    const handleChangeStatus = async (serviceId: number) => {
        try {
            if (changeStatus) {
                setChangeStatus(false)
            }
            if (!changeStatus) {
                setChangeStatus(true)
            }
            await changeServiceStatus(serviceId)
        } catch (error) {
            console.error('There was an error changing the status!', error);
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
                                <Grid item xs/>
                                <Grid item>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                        Terminarz
                    </Typography>
                    {loading ? (
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}}>
                            <CircularProgress/>
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Partner</TableCell>
                                        <TableCell>Nazwa Usługi</TableCell>
                                        <TableCell>Cena</TableCell>
                                        {role !== 'client' ? (
                                            <TableCell>Użytkownik</TableCell>
                                        ) : null}
                                        <TableCell>Status</TableCell>
                                        <TableCell>Data założenia zlecenia</TableCell>
                                        <TableCell>Użyte części</TableCell>
                                        {role === 'serwis' ? (
                                            <TableCell>Zmiana statusu</TableCell>
                                        ) : null}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {services.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell>{new Date(service.appointmentDate).toLocaleString()}</TableCell>
                                            <TableCell>{service.partnerName}</TableCell>
                                            <TableCell>{service.serviceName}</TableCell>
                                            <TableCell>{service.serviceCost}</TableCell>
                                            {role !== 'client' ? (
                                                <TableCell>{service.clientName}</TableCell>
                                            ) : null}
                                            <TableCell>{service.status}</TableCell>
                                            <TableCell>{new Date(service.createdDate).toLocaleString()}</TableCell>
                                            <TableCell>{service.usedParts.join(', ')}</TableCell>
                                            {role === 'serwis' && service.status !== finalStatus ? (
                                                <TableCell>
                                                    <Button variant="contained" color="primary"
                                                            onClick={() => handleChangeStatus(service.id)}>
                                                        {service.status === firstStatus ? (
                                                            <>Przyjmij samochód</>
                                                        ) : null}
                                                        {service.status === secondStatus ? (
                                                            <>Zakończ zlecenie</>
                                                        ) : null}
                                                    </Button>
                                                </TableCell>
                                            ) : null}
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