import React, { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppRoutes } from './routes';
import { SplashScreen } from '../features/splash/SplashScreen';


export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <QueryProvider>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
