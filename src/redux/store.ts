import { configureStore } from '@reduxjs/toolkit';
import fakeDataReducer from './fakeDataSlice';

const store = configureStore({
  reducer: {
    fakeData: fakeDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
