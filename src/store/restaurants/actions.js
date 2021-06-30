export const START_LOADING = "START_LOADING";
export const STORE_RESTAURANTS = "STORE_RESTAURANTS";

export const loadRestaurants = () => (dispatch, getState, api) => {
  dispatch(startLoading());
  api.loadRestaurants().then(records => {
    dispatch(storeRestaurants(records));
  });
};

function startLoading() {
  return {type: START_LOADING};
}

function storeRestaurants(records) {
  return {type: STORE_RESTAURANTS, records};
}
