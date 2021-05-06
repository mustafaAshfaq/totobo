import { Action } from '@ngrx/store';
import { Entity } from './layouts.reducer';

export enum LayoutsActionTypes {
  LoadLayouts = '[Layouts] Load Layouts',
  LayoutsLoaded = '[Layouts] Layouts Loaded',
  LayoutsLoadError = '[Layouts] Layouts Load Error',
  HideMobileSearchBar = '[Layout] Hide Mobile Search Bar',
  ShowMobileSearchBar = '[Layout] Show Mobile Search Bar',
  HideMobileMainMenu = '[Layout] Hide Mobile Main Menu',
  ShowMobileMainMenu = '[Layout] Show Mobile Main Menu'
}

export class HideMobileSearchBar implements Action {
  readonly type = LayoutsActionTypes.HideMobileSearchBar;
}

export class ShowMobileSearchBar implements Action {
  readonly type = LayoutsActionTypes.ShowMobileSearchBar;
}

export class HideMobileMainMenu implements Action {
  readonly type = LayoutsActionTypes.HideMobileMainMenu;
}
export class ShowMobileMainMenu implements Action {
  readonly type = LayoutsActionTypes.ShowMobileMainMenu;
}
export class LayoutsLoadError implements Action {
  readonly type = LayoutsActionTypes.LayoutsLoadError;
  constructor(public payload: any) {}
}

export class LayoutsLoaded implements Action {
  readonly type = LayoutsActionTypes.LayoutsLoaded;
  constructor(public payload: Entity) {}
}


export type LayoutsAction = ShowMobileMainMenu| HideMobileMainMenu | ShowMobileSearchBar | HideMobileSearchBar | LayoutsLoaded | LayoutsLoadError;

export const fromLayoutsActions = {
  ShowMobileMainMenu,
  HideMobileMainMenu,
  ShowMobileSearchBar,
  HideMobileSearchBar,
  LayoutsLoaded,
  LayoutsLoadError,
};
