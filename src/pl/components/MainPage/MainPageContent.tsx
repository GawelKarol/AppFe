//Content.js
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function Content() {
    return (
        <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
            >
            </AppBar>
            <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                Witaj w panelu administracyjnym Śrubolud
            </Typography>
        </Paper>
    );
}
