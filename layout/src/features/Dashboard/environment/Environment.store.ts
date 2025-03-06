import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getEnvironmentInfor } from './Environment.API'

export interface IEnvironmentInfor {
  temperature: number
  humidity: number
  atmos_pressure: number
  wind_speed: number
  ph: number
  energy: number
  percen_foods: number
  rainfall: number
}

export interface IEnvrionmentState {
  infor: IEnvironmentInfor
  // Dùng để lấy dữ liệu khởi đầu
  fetchState: 'idle' | 'loading' | 'succeeded'
  showEditModal: boolean
}

const default_env_infor: IEnvironmentInfor = require('@Assets/default_env.infor.json')

const initialState: IEnvrionmentState = {
  infor: default_env_infor,
  fetchState: 'idle',
  showEditModal: false,
}

export const initalize = createAsyncThunk<IEnvironmentInfor>(
  'environment/initalize',
  async () => {
    const info = await getEnvironmentInfor()
    return info
  }
)

export const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    initalizeEnv: (state, action: PayloadAction<IEnvironmentInfor>) => {
      state.infor = action.payload
    },
    onChangeShowModal: (state, action: PayloadAction<boolean>) => {
      state.showEditModal = action.payload
    },
    onUpdateEnvInfor: (state, action: PayloadAction<IEnvironmentInfor>) => {
      state.infor = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initalize.pending, (state) => {
        state.fetchState = 'loading'
      })
      .addCase(
        initalize.fulfilled,
        (state, action: PayloadAction<IEnvironmentInfor>) => {
          state.fetchState = 'succeeded'
          state.infor = action.payload
        }
      )
  },
})

export const { initalizeEnv, onChangeShowModal, onUpdateEnvInfor } =
  environmentSlice.actions
export default environmentSlice.reducer
