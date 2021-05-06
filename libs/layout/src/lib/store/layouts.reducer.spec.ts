import { LayoutsLoaded } from './layouts.actions';
import { LayoutsState, Entity, initialState, reducer } from './layouts.reducer';

describe('Layouts Reducer', () => {
  const getLayoutsId = (it) => it['id'];
  let createLayouts;

  beforeEach(() => {
    createLayouts = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    });
  });

  describe('valid Layouts actions ', () => {
    it('should return set the list of known Layouts', () => {
      const layoutss = [
        createLayouts('PRODUCT-AAA'),
        createLayouts('PRODUCT-zzz'),
      ];
      const action = new LayoutsLoaded(layoutss);
      const result: LayoutsState = reducer(initialState, action);
      const selId: string = getLayoutsId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
