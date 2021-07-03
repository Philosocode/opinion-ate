import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {NewRestaurantForm} from "../NewRestaurantForm";

describe("NewRestaurantForm", () => {
  const restaurantName = "Sushi Place";

  let createRestaurant;
  let context;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName("createRestaurant");
    context = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe("when filled in", () => {
    beforeEach(async () => {
      const {getByPlaceholderText, getByTestId} = context;

      // find the input and type in the restaurant name
      await userEvent.type(
        getByPlaceholderText("Add Restaurant"),
        restaurantName,
      );

      // click on the submit button
      userEvent.click(getByTestId("new-restaurant-submit-button"));
    });

    it("calls createRestaurant with the name", () => {
      // expect the passed func to be called with the right ARG
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });
  });
});
