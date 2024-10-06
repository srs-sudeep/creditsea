import apiClient from '../../core/apiConfig'
const API_ENDPOINT = '/verifier/loan'

const getVerifierLoanAPI = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINT);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Get Loans failed');
  }
}
export default getVerifierLoanAPI
