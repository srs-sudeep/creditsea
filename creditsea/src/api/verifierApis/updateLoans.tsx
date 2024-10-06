import apiClient from '../../core/apiConfig'
const API_ENDPOINT = '/verifier/loan/status'

const updateLoanAPI = async (loanId, status) => {
  try {
    const response = await apiClient.patch(API_ENDPOINT,{loanId, status});
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Create Loan failed');
  }
}
export default updateLoanAPI
