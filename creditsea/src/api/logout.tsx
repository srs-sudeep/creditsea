const logoutAPi = async () => {
  try {
    if(localStorage.getItem('token')) {
      console.log("helo")
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return
    }
  } catch {
    throw new Error('Logout failed')
  }
}
export default logoutAPi
