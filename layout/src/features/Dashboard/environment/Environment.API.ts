import axiosClient from '@Config/axiosClient'
import { IEnvironmentInfor } from './Environment.store'

export const getEnvironmentInfor = () => {
  return new Promise<IEnvironmentInfor>((resolve, reject) => {
    axiosClient
      .get('/environment')
      .then((infor: any) => resolve(infor))
      .catch((error) => reject(error))
  })
}

export const updateEnvironmentInfor = (data: IEnvironmentInfor) => {
  return new Promise<IEnvironmentInfor>((resolve, reject) => {
    axiosClient
      .put('/environment', data)
      .then((infor: any) => resolve(infor))
      .catch((error) => reject(error))
  })
}
