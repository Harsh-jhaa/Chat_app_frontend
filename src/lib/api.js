import axiosInstance from './axios';

const signup = async (signupData) => {
  const response = await axiosInstance.post('/auth/signup', signupData);
  return response.data;
};

const getAuthUser = async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data;
};

const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post('/auth/onboarding', userData);
  return response.data;
};

export { signup, getAuthUser, completeOnboarding };
