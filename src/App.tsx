import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './service';
import { AuthPage, DashboardPage } from './components';

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
       <Route path='/dashboard' element={<DashboardPage/>}/>
      </Routes>
    </BrowserRouter>
}

export default App
