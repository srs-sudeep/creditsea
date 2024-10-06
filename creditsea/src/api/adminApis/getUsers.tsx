import apiClient from '../../core/apiConfig'
const API_ENDPOINT = '/admin/users'

const getUsersAPI = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINT);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'get User failed');
  }
}
export default getUsersAPI
