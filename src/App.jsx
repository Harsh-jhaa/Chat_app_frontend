import React from 'react';
import { Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import NotificationPage from './pages/NotificationPage';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='h-screen' data-theme='night'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
        <Route path='call' element={<CallPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/notifications' element={<NotificationPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
