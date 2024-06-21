import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {getAllMechanicServices, MechanicService, updateMechanicService} from '../../services/Api';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from '../MainPage/MainPage';
import {BoxedNavigator} from '../navigator/BoxedNavigator';
import {useUser} from "../LoginPage/UserProvider";

const possiblePartners = [
    {value: "Wylezalek", fullName: "Jan Wylezalek"},
    {value: "AutoParts", fullName: "Auto Parts Co."},
    {value: "RondoMechanics", fullName: "Rondo Mechanics"}
];

export const MechanicServices = () => {
    const {name} = useUser();
    const [services, setServices] = useState<MechanicService[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<{ [key: number]: string }>({});
    const [selectedHour, setSelectedHour] = useState<{ [key: number]: string }>({});
    const [selectedPartners, setSelectedPartners] = useState<{ [key: number]: string }>({});
    const [, setSelectedFullNames] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllMechanicServices();
                setServices(result);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Failed to fetch mechanic services:', error);
            }
        };

        fetchData();
    }, []);

    const generateHourOptions = () => {
        const hours = [];
        for (let i = 8; i <= 16; i++) {
            hours.push(`${i.toString().padStart(2, '0')}:00`);
        }
        return hours;
    };

    const generateNextThreeDays = () => {
        const days = [];
        for (let i = 0; i < 3; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    };

    const handlePartnerChange = (orderId: number, value: string) => {
        const selectedPartner = possiblePartners.find(partner => partner.value === value);
        setSelectedPartners(prevState => ({
            ...prevState,
            [orderId]: value
        }));
        setSelectedFullNames(prevState => ({
            ...prevState,
            [orderId]: selectedPartner ? selectedPartner.fullName : ''
        }));
    };

    const handleDateChange = (orderId: number, value: string) => {
        setSelectedDate(prevState => ({
            ...prevState,
            [orderId]: value
        }));
    };

    const handleHourChange = (orderId: number, value: string) => {
        setSelectedHour(prevState => ({
            ...prevState,
            [orderId]: value
        }));
    };

    const handleSave = async (orderId: number) => {
        try {
            const appointmentDate = selectedDate[orderId];
            const hour = selectedHour[orderId];
            const partner = selectedPartners[orderId];
            await updateMechanicService(orderId, appointmentDate, hour, partner, name);
            console.log('Service updated successfully');
        } catch (error) {
            console.error('Failed to update service:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', minHeight: '100vh'}}>
                <BoxedNavigator/>
                <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
                    <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                        Usługi Mechaniczne
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
                            <Table sx={{minWidth: 650}} aria-label="mechanic services table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nazwa Usługi</TableCell>
                                        <TableCell>Koszt Usługi</TableCell>
                                        <TableCell>Data Wizyty</TableCell>
                                        <TableCell>Partnerzy</TableCell>
                                        <TableCell>Akcje</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {services.map((service) => (
                                        <TableRow key={service.orderId}>
                                            <TableCell>{service.serviceName}</TableCell>
                                            <TableCell>{service.serviceCost}</TableCell>
                                            <TableCell>
                                                <Select
                                                    value={selectedDate[service.orderId] || ''}
                                                    onChange={(e) => handleDateChange(service.orderId, e.target.value as string)}
                                                    displayEmpty
                                                >
                                                    {generateNextThreeDays().map((day) => (
                                                        <MenuItem key={day} value={day}>
                                                            {day}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                <Select
                                                    value={selectedHour[service.orderId] || ''}
                                                    onChange={(e) => handleHourChange(service.orderId, e.target.value as string)}
                                                    displayEmpty
                                                >
                                                    {generateHourOptions().map((hour) => (
                                                        <MenuItem key={hour} value={hour}>
                                                            {hour}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={selectedPartners[service.orderId] || ''}
                                                    onChange={(e) => handlePartnerChange(service.orderId, e.target.value as string)}
                                                    displayEmpty
                                                >
                                                    {service.ourPartners.map((partner) => (
                                                        <MenuItem key={partner} value={partner}>
                                                            {partner}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" onClick={() => handleSave(service.orderId)}>
                                                    Zapisz
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
};
