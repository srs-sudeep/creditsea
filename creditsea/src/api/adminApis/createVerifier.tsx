import apiClient from '../../core/apiConfig'
const API_ENDPOINT = '/auth/register-verifier'

const createVerifierAPI = async (values:any) => {
  try {
    const response = await apiClient.post(API_ENDPOINT,values);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Create Verifier failed');
  }
}
export default createVerifierAPI
