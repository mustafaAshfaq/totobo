import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LAYOUTS_FEATURE_KEY, LayoutsState } from './layouts.reducer';

// Lookup the 'Layouts' feature state managed by NgRx
const getLayoutsState = createFeatureSelector<LayoutsState>(
  LAYOUTS_FEATURE_KEY
);

const getLoaded = createSelector(
  getLayoutsState,
  (state: LayoutsState) => state.loaded
);
const getError = createSelector(
  getLayoutsState,
  (state: LayoutsState) => state.error
);

const getLayout=createSelector(
  getLayoutsState,
  (state:LayoutsState)=>state.layout
)





export const layoutsQuery = {
  getLoaded,
  getError,
  getLayout
};
