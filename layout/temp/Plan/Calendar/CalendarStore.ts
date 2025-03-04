import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlotInfo } from 'react-big-calendar';
import { getCallbacks, getEvents } from './CalendarAPI';
import { addPropertyEvent } from './Calendar.utils';

export interface PlanItem {
  id: string;
  title: string;
  description?: string;
  isRepeatable: boolean;
  timeInDay: string;
  specificDays: string[]; // [DD-MM-YYYY]
  callbacks: string[];
}

export interface PlanCallback {
  name: string;
  function_name: string;
  description: string;
}

export interface InheritSlotInfo extends SlotInfo, PlanItem {}

export interface PlanState {
  fetchState: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  events: PlanItem[];
  slotSelected: InheritSlotInfo | null;
  callbacks: PlanCallback[];
}

const initialState: PlanState = {
  events: [],
  slotSelected: null,
  fetchState: 'idle',
  error: null,
  callbacks: [],
};

export const initalize = createAsyncThunk('plan/initalize', async () => {
  let events = await getEvents();
  let callbacks = await getCallbacks();
  events = events.map((event) => addPropertyEvent(event));
  return {
    events,
    callbacks,
  };
});

export const refreshEvent = createAsyncThunk('plan/refreshPlan', async () => {
  let events = await getEvents();
  events = events.map((event) => addPropertyEvent(event));
  return events;
});

export const PlanSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    initalizePlan: (state, plans: PayloadAction<PlanItem[]>) => {
      state.events = plans.payload;
    },
    addNewPlan: (state, plan: PayloadAction<PlanItem>) => {
      state.events = [...state.events, plan.payload];
    },
    deletePlan: (state, planPayload: PayloadAction<string>) => {
      state.events = state.events.filter(
        (plan) => plan.id !== planPayload.payload
      );
    },
    selectSlot: (state, slotPayload: PayloadAction<InheritSlotInfo | null>) => {
      state.slotSelected = slotPayload.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initalize.pending, (state) => {
        state.fetchState = 'loading';
      })
      .addCase(
        initalize.fulfilled,
        (
          state,
          action: PayloadAction<{
            events: PlanItem[];
            callbacks: PlanCallback[];
          }>
        ) => {
          state.fetchState = 'succeeded';
          state.events = action.payload.events;
          state.callbacks = action.payload.callbacks;
        }
      )
      .addCase(initalize.rejected, (state, action: any) => {
        state.fetchState = 'failed';
        state.error = action.payload.message;
      })
      .addCase(refreshEvent.pending, (state) => {
        state.fetchState = 'loading';
      })
      .addCase(refreshEvent.fulfilled, (state, action) => {
        state.fetchState = 'succeeded';
        state.events = action.payload;
      })
      .addCase(refreshEvent.rejected, (state) => {
        state.fetchState = 'failed';
      });
  },
});

export const { initalizePlan, addNewPlan, deletePlan, selectSlot } =
  PlanSlice.actions;

export default PlanSlice.reducer;
