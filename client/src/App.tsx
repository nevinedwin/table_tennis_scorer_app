import { AuthProvider } from './context/authContext/authContext'
import { GlobalStateProvider } from './context/globalStateContext/globalStateContext'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/appRouter';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-calendar/dist/Calendar.css';


const env = import.meta.env.VITE_ENV;

const queryClient = new QueryClient();

function App(): JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <GlobalStateProvider>
              <AppRouter />
            </GlobalStateProvider>
          </Router>
        </AuthProvider>
      {env === "local" && <ReactQueryDevtools position='bottom-right' initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
