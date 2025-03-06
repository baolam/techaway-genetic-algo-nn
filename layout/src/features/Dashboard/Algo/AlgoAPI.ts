import axiosClient from '@Config/axiosClient'

export const getAlgorithmInfo = () => {
  return new Promise((resolve, reject) => {
    axiosClient
      .get('/algo')
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
