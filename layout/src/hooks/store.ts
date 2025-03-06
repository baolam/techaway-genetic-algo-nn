import environmentSlice from '@Features/Dashboard/environment/Environment.store'
import generationSlice from '@Features/Dashboard/Generation/Generation.store'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    environment: environmentSlice,
    generation: generationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
