import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './service';
import { AuthPage } from './components';

function App() {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  if (loading) {
    return <div>Loading...</div>;
  }

  return <BrowserRouter>
      <Routes>
        <Route 
          path="/auth" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />} 
        />
       <Route path='/' element={<AuthPage/>}/>
      </Routes>
    </BrowserRouter>
}

export default App
