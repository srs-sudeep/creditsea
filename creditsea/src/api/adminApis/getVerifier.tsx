import apiClient from '../../core/apiConfig'
const API_ENDPOINT = '/admin/verifiers'

const getVerifiersAPI = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINT);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'get Verifier failed');
  }
}
export default getVerifiersAPI
