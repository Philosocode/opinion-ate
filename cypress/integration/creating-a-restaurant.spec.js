describe("Creating a Restaurant", () => {
  it("allows adding a restaurant", () => {
    const restaurantId = 27;
    const restaurantName = "Sushi Place";

    cy.server({force404: true});

    cy.route({
      method: "GET",
      url: "https://outside-in-dev-api.herokuapp.com/O5qZzrSNoJwXvPHIQ5geBAkhAYxyZtAK/restaurants",
      response: [],
    });

    cy.route({
      method: "POST",
      url: "https://outside-in-dev-api.herokuapp.com/O5qZzrSNoJwXvPHIQ5geBAkhAYxyZtAK/restaurants",
      response: {
        id: restaurantId,
        name: restaurantName,
      },
    }).as("addRestaurant");

    cy.visit("/");

    // find the DOM element with this placeholder. Type in the restaurant name
    cy.get(`[placeholder="Add Restaurant"]`).type(restaurantName);

    // find the Add button and click on it
    cy.contains("Add").click();

    // wait for the POST request to be sent
    // the POST request should send the name of the restaurant
    cy.wait("@addRestaurant").its("requestBody").should("deep.equal", {
      name: restaurantName,
    });

    // confirm that the restaurant name shows up on the page
    cy.contains(restaurantName);
  });
});
