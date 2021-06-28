import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import restaurantsReducer from "../restaurants/reducers";
import {loadRestaurants} from "../restaurants/actions";

describe("restaurants", () => {
  describe("loadRestaurants action", () => {
    it("stores the restaurants", async () => {
      const records = [
        {id: 1, name: "Sushi Place"},
        {id: 2, name: "Pizza Place"},
      ];

      // stub API
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const initialState = {
        records: [],
      };

      // create the store
      // only the needed reducer is passed in
      const store = createStore(
        restaurantsReducer,
        initialState,
        // inject API into thunk; make available to all thunk funcs
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      await store.dispatch(loadRestaurants());

      expect(store.getState().records).toEqual(records);
    });
  });
});
