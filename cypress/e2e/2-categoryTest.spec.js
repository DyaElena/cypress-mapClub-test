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
      .then((li) => {
        console.log(li);
        const brand = cy.wrap(li).invoke("text");
        cy.contains(brand).click({ force: true });

        // cy.get(".goods-introudce").find("a").should("contain", brand);
      });
  });
});
