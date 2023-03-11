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
