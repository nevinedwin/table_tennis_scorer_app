import { AuthProvider } from './context/authContext/authContext'
import { GlobalStateProvider } from './context/globalStateContext/globalStateContext'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/appRouter';
import 'react-calendar/dist/Calendar.css';
import { WebSocketProvider } from './context/websocketContext/websocketContext';
import 'aws-amplify/auth/enable-oauth-listener';

function App(): JSX.Element {

  return (
    <WebSocketProvider>
      <AuthProvider>
        <Router>
          <GlobalStateProvider>
            <AppRouter />
          </GlobalStateProvider>
        </Router>
      </AuthProvider>
    </WebSocketProvider>
  );
};

export default App;
