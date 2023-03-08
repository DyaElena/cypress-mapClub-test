describe("Place order tests", () => {
  beforeEach("Login", () => {
    cy.session("wahunyxo@ema-sofia.eu", () => {
      cy.visit("/home/");
      cy.get("#cky-btn-accept").click();
      cy.contains("Login").click();
      cy.get("[placeholder='Email']")
        .click({ force: true })
        .type("wahunyxo@ema-sofia.eu");
      cy.get('[placeholder="Password"]')
        .click({ force: true })
        .type("1Qwer123!");
      cy.get('[data-cy="login--login-button"]').click({ force: true });
      cy.url().should("contain", "home");
      cy.get("h1").should(
        "contain",
        "The branded groceries you love, for less"
      );
    });

    cy.visit("/home/");
  });

  it("verify registration", () => {
    cy.contains("Login").click();
    cy.get('[placeholder="First name"]').type("Marina");
    cy.get('[placeholder="Last name"]').type("Miller");
    cy.get("#Email").type("wahunyxo@ema-sofia.eu");
    cy.get("#ConfirmEmail").type("wahunyxo@ema-sofia.eu");
    cy.get('[placeholder="Password"]').eq(1).type("HelloMolly1!");
    cy.get("#terms").click({ force: true });
    cy.get("[class='btn btn-primary btn-block']").eq(2).click();
    cy.url().should("contain", "/Profile");
  });

  it("verify search results", () => {
    cy.get('[placeholder="Search and get saving"]').type("cheese");
    cy.get("[data-testid='SearchBar']").find("button").eq(1).click();
    cy.url().should("contain", "/search?q=cheese");
    cy.wait(5000);
    cy.get("h1").should("contain", "cheese");
  });

  it.only("verify new in", () => {
    cy.get('[data-cy="category--card"]').eq(0).click();
    cy.get("h1").should("contain", "New In");
    cy.contains("Laundry").click();

    cy.window().scrollTo(0, -100);

    cy.get('[aria-labelledby="ProductSortOptions-select"]')
      .eq(1)
      .select("Price (Low-High)", { force: true })
      .should("have.value", "price_desc");

    cy.get("[data-cy=loader]").should("be.visible"); // check for the loader element

    cy.get("body").scrollTo("bottom", { duration: 2000 }); // scroll down to load more results
    cy.get('[data-testid="ProductLoader"]').should("not.exist"); // check that the loader element is no longer visible
    cy.get('[data-testid="KaGrid"]')
      .find('[class="css-17x5wyx euutgo62"]')
      .invoke("text");
  });
});
