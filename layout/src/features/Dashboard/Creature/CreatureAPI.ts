import axiosClient from '@Config/axiosClient'

export const getCreatureInfo = (situation: string, id: string) => {
  const url = `/creature/result?of=${situation}&id=${id}`
  return new Promise((resolve, reject) => {
    axiosClient
      .get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
