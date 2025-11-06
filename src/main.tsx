import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../src/theme/theme.tsx'
import {ThemeProvider, CssBaseline} from '@mui/material'
import App from './App.tsx'
import theme from "./theme/theme.tsx";
import {ProviderUserLog} from "./AllContexte/ProviderUserLog.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <ThemeProvider theme={theme}>
              <ProviderUserLog>
                  <CssBaseline/>
                  <App/>
              </ProviderUserLog>

          </ThemeProvider>


  </StrictMode>,
)
