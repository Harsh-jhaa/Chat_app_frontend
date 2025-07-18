import React from 'react';
import './index.css';
import { Route, Routes, Navigate } from 'react-router';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import NotificationPage from './pages/NotificationPage';
import Layout from './components/Layout';
import PageLoader from './components/PageLoader';
// import axiosInstance from './lib/axios';
import { Toaster } from 'react-hot-toast';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { getAuthUser } from './lib/api';
import useAuthUser from './hooks/useAuthUser';
import useThemeStore from './store/useThemeStore';

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnBoarded;
  const { theme } = useThemeStore();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/login'
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? '/' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/signup'
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? '/' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/onboarding'
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to='/' />
              )
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/call/:id'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <CallPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/chat/:id'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/notifications'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
