import {render} from "@testing-library/react";
import {RestaurantList} from "../RestaurantList";

describe("RestaurantList", () => {
  it("loads restaurants on first render", () => {
    // create a mock func
    // can check if it was called
    const loadRestaurants = jest.fn().mockName("loadRestaurants");

    render(
      <RestaurantList loadRestaurants={loadRestaurants} restaurants={[]} />,
    );

    expect(loadRestaurants).toHaveBeenCalled();
  });

  it("displays the restaurants", () => {
    // func that does nothing
    const noop = () => {};

    const restaurants = [
      {id: 1, name: "Sushi Place"},
      {id: 2, name: "Pizza Place"},
    ];

    const {queryByText} = render(
      <RestaurantList loadRestaurants={noop} restaurants={restaurants} />,
    );

    // queryByText: find an EL containing the text
    expect(queryByText("Sushi Place")).not.toBeNull();
    expect(queryByText("Pizza Place")).not.toBeNull();
  });
});
