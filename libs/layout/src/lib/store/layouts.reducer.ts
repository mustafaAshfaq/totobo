import { LayoutsAction, LayoutsActionTypes } from './layouts.actions';

export const LAYOUTS_FEATURE_KEY = 'layouts';

/**
 * Interface for the 'Layouts' data used in
 *  - LayoutsState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {
  showMobileSearchBar:boolean;
  showMobileMainMenu:boolean;
  isMobile:boolean;
}

export interface LayoutsState {
  layout?:Entity
  loaded: boolean; // has the Layouts list been loaded
  error?: any; // last none error (if any)
}

export interface LayoutsPartialState {
  readonly [LAYOUTS_FEATURE_KEY]: LayoutsState;
}

export const initialState: LayoutsState = {
  loaded: false,
  layout:{showMobileSearchBar:true,showMobileMainMenu:false,isMobile:false}
};

export function reducer(
  state: LayoutsState = initialState,
  action: LayoutsAction
): LayoutsState {
  switch (action.type) {
    case LayoutsActionTypes.LayoutsLoaded: {
      state = Object.assign({},{loaded:true,layout:action.payload})
      break;
    }
    case LayoutsActionTypes.HideMobileMainMenu:
      state={
       layout:{...state.layout,showMobileMainMenu:false},
       ...state
      }
      break;
      case LayoutsActionTypes.ShowMobileMainMenu:
        state={
         layout:{...state.layout,showMobileMainMenu:true},
         ...state
        }
        break;

      case LayoutsActionTypes.HideMobileSearchBar:
          state={
           layout:{...state.layout,showMobileSearchBar:false},
           ...state
          }
        break;
      case LayoutsActionTypes.ShowMobileSearchBar:
          state={
           layout:{...state.layout,showMobileSearchBar:true},
           ...state
          }
          break;
      case LayoutsActionTypes.LayoutsLoadError:
        state=Object.assign({},{error:action.payload, ...state});
        break;
    }
  return state;
}
