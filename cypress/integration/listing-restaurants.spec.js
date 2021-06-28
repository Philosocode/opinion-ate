/// <reference types="Cypress" />

describe("Listing Restaurants", () => {
  it("shows restaurants from the server", () => {
    const sushiPlace = "Sushi Place";
    const pizzaPlace = "Pizza Place";

    // stub calls to the backend
    cy.server({
      // return 404 for non-stubbed routes
      // prevent requests from hitting the actual backend
      force404: true,
    });

    // stub a specific request
    // when the app makes a GET request to this URL, return the `response`
    cy.route({
      method: "GET",
      url: "https://outside-in-dev-api.herokuapp.com/O5qZzrSNoJwXvPHIQ5geBAkhAYxyZtAK/restaurants",
      response: [
        {id: 1, name: sushiPlace},
        {id: 2, name: pizzaPlace},
      ],
    });

    // visit app root
    cy.visit("/");

    // ensure the page contains both places
    cy.contains(sushiPlace);
    cy.contains(pizzaPlace);
  });
});
