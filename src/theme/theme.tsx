import {createTheme} from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#19567a'},
        background: {default: 'rgba(21,46,81,0.75)', paper: '#04213e'},
        error: {main: '#f44336'},
        warning: {main: '#ff9800'},
        info: {main: '#2196f3'},
        success: {main: '#4caf50'},
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    '--Paper-overlay': 'none',
                    backgroundImage: 'none',
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                },
            },
        },
    },
})

export default theme
