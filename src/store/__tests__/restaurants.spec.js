import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import restaurantsReducer from "../restaurants/reducers";
import {loadRestaurants} from "../restaurants/actions";

describe("restaurants", () => {
  describe("initially", () => {
    const initialState = {};
    const store = createStore(
      restaurantsReducer,
      initialState,
      applyMiddleware(thunk),
    );

    expect(store.getState().loading).toEqual(false);
  });

  describe("while loading", () => {
    it("sets a loading flag", () => {
      const api = {
        // promise that never resolves
        loadRestaurants: () => new Promise(() => {}),
      };

      const initialState = {};

      const store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      store.dispatch(loadRestaurants());

      expect(store.getState().loading).toEqual(true);
    });
  });

  describe("when loading succeeds", () => {
    const records = [
      {id: 1, name: "Sushi Place"},
      {id: 2, name: "Pizza Place"},
    ];

    let store;

    beforeEach(() => {
      // stub API
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const initialState = {
        records: [],
      };

      // create the store
      // only the needed reducer is passed in
      store = createStore(
        restaurantsReducer,
        initialState,
        // inject API into thunk; make available to all thunk funcs
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      // return the Promise to make Jest wait for it
      return store.dispatch(loadRestaurants());
    });

    it("stores the restaurants", () => {
      expect(store.getState().records).toEqual(records);
    });

    it("clears the loading flag", () => {
      expect(store.getState().loading).toEqual(false);
    });
  });
});
