import axiosClient from '@Config/axiosClient'
import { ISituation } from './Generation.store'

export const getSituations = () => {
  return new Promise<ISituation[]>((resolve, reject) => {
    axiosClient
      .get('/generations/situation')
      .then((response: any) => {
        resolve(response.directories)
      })
      .catch((err) => reject(err))
  })
}

export const getEnvironmentOverall = (situation: string) => {
  return new Promise((resolve, reject) => {
    axiosClient
      .get(`/environment/result?of=${situation}`)
      .then((infor) => resolve(infor))
      .catch((err) => reject(err))
  })
}

export const getFitness = (situation: string) => {
  return new Promise<Number[]>((resolve, reject) => {
    axiosClient
      .get(`/generations/fitness?of=${situation}`)
      .then((infor: any) => resolve(infor.fitness))
      .catch((err) => reject(err))
  })
}

export const getTotalGenerations = (situation: string) => {
  return new Promise<Number[]>((resolve, reject) => {
    axiosClient
      .get(`/generations/total?of=${situation}`)
      .then((infor: any) => resolve(infor.generations))
      .catch((err) => reject(err))
  })
}
