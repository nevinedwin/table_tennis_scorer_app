import { AuthProvider } from './context/authContext/authContext'
import { GlobalStateProvider } from './context/globalStateContext/globalStateContext'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/appRouter';
import 'react-calendar/dist/Calendar.css';
import { WebSocketProvider } from './context/websocketContext/websocketContext';
import 'aws-amplify/auth/enable-oauth-listener';
import { useEffect, useState } from 'react';
import WithProviderHoc from './components/withProviderHoc/withProviderHoc';
import AmplifyContextProvider, { useAmplifyContext } from './context/amplifyContext/amplifyContext';

function App(): JSX.Element {

  const { setConfigValue } = useAmplifyContext();
  const [loadComp, setLoadComp] = useState<boolean>(false);

  useEffect(() => {
    fetch('/aws-config.json', { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
      .then(res => res.json())
      .then(awsConfig => {
        setConfigValue(awsConfig)
        setLoadComp(true);
      })
  }, []);

  return (
    <>
      {loadComp ?
        <WebSocketProvider>
          <AuthProvider>
            <Router>
              <GlobalStateProvider>
                <AppRouter />
              </GlobalStateProvider>
            </Router>
          </AuthProvider>
        </WebSocketProvider>
        :
        <><div>Loading...</div></>
      }
    </>
  );
};

export default WithProviderHoc(AmplifyContextProvider)(App);
