import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/frontend/pages/Login';
import { SignUpPage } from '@/frontend/pages/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  }
]);
