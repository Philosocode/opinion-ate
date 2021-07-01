import {render} from "@testing-library/react";
import {RestaurantList} from "../RestaurantList";

describe("RestaurantList", () => {
  const restaurants = [
    {id: 1, name: "Sushi Place"},
    {id: 2, name: "Pizza Place"},
  ];
  let loadRestaurants;
  let context;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      // create a mock func
      // can check if it was called
      loadRestaurants: jest.fn().mockName("loadRestaurants"),
      loading: false,
      restaurants,
      ...propOverrides,
    };

    loadRestaurants = props.loadRestaurants;
    context = render(<RestaurantList {...props} />);
  };

  it("loads restaurants on first render", () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it("displays the loading indicator while loading", () => {
    renderWithProps({loading: true});

    // the loading indicator doesn't have text content, so we can't use queryByText
    // to identify it, use a test ID instead
    const {queryByTestId} = context;
    expect(queryByTestId("loading-indicator")).not.toBeNull();
  });

  describe("when loading succeeds", () => {
    beforeEach(() => {
      renderWithProps();
    });

    it("doesn't display the loading indicator when not loading", () => {
      const {queryByTestId} = context;
      expect(queryByTestId("loading-indicator")).toBeNull();
    });

    it("does not display the error message", () => {
      const {queryByText} = context;
      expect(queryByText("Restaurants could not be loaded.")).toBeNull();
    });

    it("displays the restaurants", () => {
      const {queryByText} = context;

      // queryByText: find an EL containing the text
      expect(queryByText("Sushi Place")).not.toBeNull();
      expect(queryByText("Pizza Place")).not.toBeNull();
    });
  });

  describe("when loading fails", () => {
    beforeEach(() => {
      renderWithProps({loadError: true});
    });

    it("displays the error message", () => {
      const {queryByText} = context;
      expect(queryByText("Restaurants could not be loaded.")).not.toBeNull();
    });
  });
});
