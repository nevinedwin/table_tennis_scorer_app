import { AuthProvider } from './context/authContext/authContext'
import { GlobalStateProvider } from './context/globalStateContext/globalStateContext'
import { getConfig } from './config';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/appRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-calendar/dist/Calendar.css';

const config = getConfig();

const env = import.meta.env.VITE_ENV;

const queryClient = new QueryClient();

function App(): JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={config.CLIENT_ID}>
        <AuthProvider>
          <Router>
            <GlobalStateProvider>
              <AppRouter />
              
            </GlobalStateProvider>
          </Router>
        </AuthProvider>
      </GoogleOAuthProvider>
      {env === "dev" && <ReactQueryDevtools position='bottom-right' initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
