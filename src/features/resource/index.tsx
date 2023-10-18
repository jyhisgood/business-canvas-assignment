import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { uid } from 'uid';

export interface Resource {
  key: string;
  path: string;
  updatedPath?: string;
  date: string;
}

type CreateResource = Omit<Resource, 'key'>;
type UpdateResource = {
  key: string;
  data: { path: string; updatedPath?: string };
};

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState: [] as Resource[],
  reducers: {
    addResource: (state, action: PayloadAction<CreateResource>) => {
      state.push({ ...action.payload, key: uid() });
    },
    updateResource: (state, action: PayloadAction<UpdateResource>) => {
      const { key, data } = action.payload;
      const resourceToUpdate = state.find((resource) => resource.key === key);
      if (resourceToUpdate) {
        Object.assign(resourceToUpdate, { updatedPath: data.path });
      }
    },
    deleteResource: (state, action: PayloadAction<string>) => {
      return state.filter((resource) => resource.key !== action.payload);
    },
  },
});

export const { addResource, updateResource, deleteResource } =
  resourcesSlice.actions;
