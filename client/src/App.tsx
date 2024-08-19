import { AuthProvider } from './context/authContext/authContext'
import { GlobalStateProvider } from './context/globalStateContext/globalStateContext'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/appRouter';
import 'react-calendar/dist/Calendar.css';



function App(): JSX.Element {

  return (
        <AuthProvider>
          <Router>
            <GlobalStateProvider>
              <AppRouter />
            </GlobalStateProvider>
          </Router>
        </AuthProvider>
  );
};

export default App;
