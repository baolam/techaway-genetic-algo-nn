import { createSlice } from '@reduxjs/toolkit'

export interface ISituation {
  name: string
  parentPath: string
  path: string
}

export interface IGenerationInfor {
  situations: ISituation[]
}

export interface IGenerationState {
  infor: IGenerationInfor
  selectedSituation: string
}

const initialState: IGenerationState = {
  infor: {
    situations: [],
  },
  selectedSituation: '',
}

export const generationSlice = createSlice({
  name: 'generation',
  initialState,
  reducers: {
    onUpdateSituation: (state, action) => {
      state.infor.situations = action.payload
    },
    onSelectedSituation: (state, action) => {
      state.selectedSituation = action.payload
    },
  },
})

export const { onUpdateSituation, onSelectedSituation } =
  generationSlice.actions
export default generationSlice.reducer
