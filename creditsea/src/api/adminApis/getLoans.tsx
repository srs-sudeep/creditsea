import apiClient from '../../core/apiConfig'
const API_ENDPOINT = '/admin/loans'

const getadminLoansAPI = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINT);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'get Loans failed');
  }
}
export default getadminLoansAPI
