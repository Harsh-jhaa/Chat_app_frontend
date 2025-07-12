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
const getUserFriends = async () => {
  const response = await axiosInstance.get('/user/friends');
  return response.data;
};
const getRecommendedUsers = async () => {
  const response = await axiosInstance.get('/user/');
  return response.data;
};
const getOutgoingFriendRequests = async () => {
  const response = await axiosInstance.get('/user/outgoing-friend-requests');
  return response.data;
};
const getFriendRequests = async () => {
  const response = await axiosInstance.get('/user/friend-requests');
  return response.data;
};
const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data;
};
const acceptFriendRequest = async (requestId) => {
  const response = await axiosInstance.put(
    `/user/friend-request/${requestId}/accept`
  );
  return response.data;
};

const getStreamToken = async () => {
  const response = await axiosInstance.get('/chat/token');
  return response.data;
};

export {
  signup,
  getAuthUser,
  completeOnboarding,
  login,
  logout,
  getUserFriends,
  getRecommendedUsers,
  getOutgoingFriendRequests,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  getStreamToken,
};
