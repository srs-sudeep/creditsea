import apiClient from '../../core/apiConfig'
const API_ENDPOINT = '/users/loan'

const createLoanAPI = async (values:any) => {
  try {
    console.log(JSON.stringify(values));
    const response = await apiClient.post(API_ENDPOINT,values);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Create Loan failed');
  }
}
export default createLoanAPI
