describe("Showcasing intercept and hovering on some elements", () => {
  it("Hovering on an element", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://automationpractice.com/index.php");
    cy.get(".product-container")
      .filter(":visible")
      .first()
      .trigger("mouseover");
    cy.get(".button-container").should("be.visible");
  });

  it("Mocking failing requests to see the cannot find stream error", () => {
    cy.intercept("POST", "**protocol-v1-goerli**", {
      statusCode: 400,
      body: {
        message: "Woopsie daisy something went wrong",
      },
    });
    cy.visit(
      "https://user-release-v0-24.dev.superfluid.dev/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26"
    );
    cy.contains("We are unable to fetch the stream details right now.").should(
      "be.visible"
    );
  });

  it.only("Dynamicly changing Coingecko responses", () => {
    cy.fixture("currencies").then((fixture) => {
      cy.intercept("GET", "**markets**", (req) => {
        req.continue((response) => {
          response.body[0]["current_price"] =
            fixture.tokenValues[req.query["ids"]] *
            fixture.fiatValues[req.query["vs_currency"]].multiplier;
        });
      }).as("coingeckoRequest");
      cy.visit(
        "https://user-release-v0-24.dev.superfluid.dev/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26"
      );
      let currencies = ["USD", "GBP", "EUR", "CNY"];
      currencies.forEach((currency) => {
        cy.get("[data-cy=fiat_currency").click();
        cy.get("[data-cy=item-" + currency + "-multi")
          .filter(":visible")
          .click();
        cy.wait("@coingeckoRequest");
        let flowRate = 9645061728395;
        let secondsPerMonth = 2592000;
        let result = (
          ((flowRate * secondsPerMonth) / 1e18) *
          fixture.fiatValues[currency].multiplier
        ).toFixed(2);
        cy.get("[data-cy=per_month]").should(
          "have.text",
          result + " " + currency
        );
      });
    });
  });
});
