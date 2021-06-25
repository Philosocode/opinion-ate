import {render} from "@testing-library/react";
import {RestaurantList} from "../RestaurantList";

describe("RestaurantList", () => {
  it("loads restaurants on first render", () => {
    // create a mock func
    // can check if it was called
    const loadRestaurants = jest.fn().mockName("loadRestaurants");

    render(<RestaurantList loadRestaurants={loadRestaurants} />);

    expect(loadRestaurants).toHaveBeenCalled();
  });
});
