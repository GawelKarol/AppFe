import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link as RouterLink} from 'react-router-dom'; // Import Link from react-router-dom
import Content from './MainPageContent';
import Header from './MainPageHeader';
import {BoxedNavigator} from "../navigator/BoxedNavigator";
import {useUser} from "../LoginPage/UserProvider";
import {MechanicServices} from "../storage/MechanicServices";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <RouterLink color="inherit" to="/">
                Your Website
            </RouterLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

let them = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

export const theme = them = {
    ...them,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#081627',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginLeft: them.spacing(1),
                },
                indicator: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: them.palette.common.white,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 16px',
                    minWidth: 0,
                    padding: 0,
                    [them.breakpoints.up('md')]: {
                        padding: 0,
                        minWidth: 0,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: them.spacing(1),
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 4,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(255,255,255,0.15)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#4fc3f7',
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontWeight: them.typography.fontWeightMedium,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: them.spacing(2),
                    '& svg': {
                        fontSize: 20,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 32,
                },
            },
        },
    },
};

export const MainPage = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {role} = useUser();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            {role !== 'client' ? (
                <ThemeProvider theme={theme}>
                    <Box sx={{display: 'flex', minHeight: '100vh'}}>
                        <BoxedNavigator/>
                        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                            <Header onDrawerToggle={handleDrawerToggle}/>
                            <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                                <Content/>
                            </Box>

                        </Box>
                    </Box>
                </ThemeProvider>
            ) : null}
            {role === 'client' ? (
                <MechanicServices/>
            ) : null}
            <Box component="footer" sx={{p: 2, bgcolor: '#eaeff1'}}>
                <Copyright/>
            </Box>)
        </>
    );
};