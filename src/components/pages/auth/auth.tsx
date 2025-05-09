import { useState } from 'react';
import { LoginForm, RegisterForm } from '../../auth';
import { AuthLayout } from '../../layouts';
import { Button } from '../../ui';


export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout title={isLogin ? 'Sign In' : 'Create Account'}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      
      <div className="mt-4 text-center">
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm"
        >
          {isLogin 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Sign in"}
        </Button>
      </div>
    </AuthLayout>
  );
};