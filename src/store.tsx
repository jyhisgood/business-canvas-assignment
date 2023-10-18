import { configureStore } from '@reduxjs/toolkit';
import { resourcesSlice } from './features/resource';

const store = configureStore({
  reducer: {
    resources: resourcesSlice.reducer,
  },
});

export default store;
