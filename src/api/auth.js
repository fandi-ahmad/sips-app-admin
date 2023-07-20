const Auth = () => {
    const userToken = localStorage.getItem('user')
    return {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
}

export default Auth