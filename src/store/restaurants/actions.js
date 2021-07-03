export const START_LOADING = "START_LOADING";
export const STORE_RESTAURANTS = "STORE_RESTAURANTS";
export const RECORD_LOADING_ERROR = "RECORD_LOADING_ERROR";
export const ADD_RESTAURANT = "ADD_RESTAURANT";

export const loadRestaurants = () => (dispatch, getState, api) => {
  dispatch(startLoading());
  api
    .loadRestaurants()
    .then(records => {
      dispatch(storeRestaurants(records));
    })
    .catch(() => {
      dispatch(recordLoadingError());
    });
};

function startLoading() {
  return {type: START_LOADING};
}

function storeRestaurants(records) {
  return {type: STORE_RESTAURANTS, records};
}

function recordLoadingError() {
  return {type: RECORD_LOADING_ERROR};
}

export const createRestaurant = name => (dispatch, getState, api) => {
  api.createRestaurant(name).then(record => {
    dispatch(addRestaurant(record));
  });
};

const addRestaurant = record => ({
  type: ADD_RESTAURANT,
  record,
});
