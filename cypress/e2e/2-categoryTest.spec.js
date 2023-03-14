describe("Product tests", () => {
  beforeEach("open women's cloth webpage", () => {
    cy.visit("https://www.mapclub.com/cat/women/clothing-CA2009270917");
  });

  it("verify brand filter ", () => {
    cy.get(".list-filter__brand")
      .eq(0)
      .find("div")
      .find(".ps--active-y")
      .find("ul")
      .find("li")
      .each((li, index) => {
        if (index !== 0) {
          const brand = li.text().trim();
          cy.contains(brand).click({ force: true });
          cy.get(".goods-introudce").find("a").should("contain", brand);
          cy.contains(brand).click({ force: true });
        } else {
          return;
        }
      });
  });
});

it.only("verify price filter", () => {
  cy.visit(
    "https://www.mapclub.com/cat/women/clothing-CA2009270917?categoryCodes=CA2009270917"
  );
  cy.get("#min").type("2000000", { force: true });
  cy.get("#max")
    .type("2100000", { force: true })
    .then(() => {
      cy.wait(1000);
      cy.get(".goods-price").each(($div, index, $list) => {
        cy.wrap($div).find("span").invoke("text").as("priceRp");

        cy.get("@priceRp").each((price) => {
          console.log(price);
          const priceNum = price.substring(2).removeAll(".", "");
          cy.wrap(priceNum).should("be.greaterThan", "2000000");
          cy.wrap(priceNum).should("be.lessThan", "2100000");
        });
      });
    });
});
