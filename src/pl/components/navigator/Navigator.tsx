import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const categories = [
    {
        id: 'Admin',
        children: [
            {id: 'Użytkownicy', icon: <PeopleIcon/>, link: '/paperbase/users'},
            {id: 'Magazyn', icon: <WarehouseIcon/>, link: '/paperbase/storage'},
            {id: 'Zaplanowane Wizyty/Terminarz', icon: <HomeRepairServiceIcon/>, link: '/paperbase/appointment'},
            {id: 'Dokumenty', icon: <DocumentScannerIcon/>, link: '/paperbase/documents'},
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

const Navigator = (props: any) => {
    const {...other} = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}>
                    Śrubolud
                </ListItem>
                {categories.map(({id, children}) => (
                    <Box key={id} sx={{bgcolor: '#101F33'}}>
                        <ListItem sx={{py: 2, px: 3}}>
                            <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({id: childId, icon, link}) => (
                            <ListItem disablePadding key={childId}>
                                <ListItemButton component={RouterLink} to={link} sx={item}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{mt: 2}}/>
                    </Box>
                ))}
            </List>
        </Drawer>
    );
};

export default Navigator;
