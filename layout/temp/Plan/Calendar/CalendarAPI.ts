import axiosClient from '@Config/axiosClient';
import { PlanCallback, PlanItem } from './CalendarStore';

export const getEvents = () => {
  return new Promise<PlanItem[]>((resolve, reject) => {
    axiosClient
      .get('/plans')
      .then((resp: any) => resolve(resp))
      .catch((err) => reject(err));
  });
};

export const getCallbacks = () => {
  return new Promise<PlanCallback[]>((resolve, reject) => {
    axiosClient
      .get('/plan/callbacks')
      .then((resp: any) => {
        let keys = Object.keys(resp);
        let out = [];
        for (let i = 0; i < keys.length; i++) {
          out.push(resp[keys[i]]);
        }
        resolve(out);
      })
      .catch((err) => reject(err));
  });
};

export const createEvent = (plan: PlanItem) => {
  return new Promise((resolve, reject) => {
    axiosClient.post('/plan', plan).then((resp: any) => {
      if (resp.err) reject(resp.msg);
      else resolve(resp.msg);
    });
  });
};

export const deleteEvent = (plan_id: string) => {
  return new Promise((resolve, reject) => {
    axiosClient.delete(`/plan/${plan_id}`).then((resp: any) => {
      if (resp.err) reject(resp.msg);
      else resolve(resp.msg);
    });
  });
};
