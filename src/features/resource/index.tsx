import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { uid } from 'uid';

export interface Resource {
  key: string;
  path: string[];
  updatedPath?: string;
  date: string;
  type: 'url' | 'img';
}

type CreateResource = {
  path: string[];
  type: 'url' | 'img';
};
type UpdateResource = {
  key: string;
  data: { path: string[]; updatedPath?: string };
};

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState: [] as Resource[],
  reducers: {
    addResource: (state, action: PayloadAction<CreateResource>) => {
      const date = moment().format('YYYYMMDDHHmmss');
      state.push({ ...action.payload, key: uid(), date });
    },
    updateResource: (state, action: PayloadAction<UpdateResource>) => {
      const { key, data } = action.payload;
      const resourceToUpdate = state.find((resource) => resource.key === key);
      const isImgType =
        resourceToUpdate?.type === 'img'
          ? { path: data.path }
          : { updatedPath: data.path[0] };
      if (resourceToUpdate) {
        Object.assign(resourceToUpdate, { ...isImgType });
      }
    },
    deleteResource: (state, action: PayloadAction<string>) => {
      return state.filter((resource) => resource.key !== action.payload);
    },
  },
});

export const { addResource, updateResource, deleteResource } =
  resourcesSlice.actions;
