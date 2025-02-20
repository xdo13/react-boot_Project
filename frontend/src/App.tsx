import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Carlist from "./component/Carlist";

const queryClient = new QueryClient();

function App() {
  return(
  <Container maxWidth="xl">
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
         Car Shop
        </Typography>
      </Toolbar>
      
    </AppBar>
    <QueryClientProvider client={queryClient}>
      <Carlist/>
    </QueryClientProvider>
  </Container>
  )
}

export default App
