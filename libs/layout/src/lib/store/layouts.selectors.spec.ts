import { Entity, LayoutsState } from './layouts.reducer';
import { layoutsQuery } from './layouts.selectors';

describe('Layouts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLayoutsId = (it) => it['id'];

  let storeState;

  beforeEach(() => {
    const createLayouts = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    });
    storeState = {
      layouts: {
        list: [
          createLayouts('PRODUCT-AAA'),
          createLayouts('PRODUCT-BBB'),
          createLayouts('PRODUCT-CCC'),
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true,
      },
    };
  });

  describe('Layouts Selectors', () => {
    it('getAllLayouts() should return the list of Layouts', () => {
      const results = layoutsQuery.getAllLayouts(storeState);
      const selId = getLayoutsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedLayouts() should return the selected Entity', () => {
      const result = layoutsQuery.getSelectedLayouts(storeState);
      const selId = getLayoutsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = layoutsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = layoutsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
