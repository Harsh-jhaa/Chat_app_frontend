import axiosInstance from './axios';

const signup = async (signupData) => {
  const response = await axiosInstance.post('/auth/signup', signupData);
  return response.data;
};
const login = async (loginData) => {
  const response = await axiosInstance.post('/auth/login', loginData);
  return response.data;
};
const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  } catch (error) {
    console.log('Error in getAuthUser', error);
    return null;
  }
};

const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post('/auth/onboarding', userData);
  return response.data;
};

export { signup, getAuthUser, completeOnboarding, login, logout };
