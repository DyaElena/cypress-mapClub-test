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

  cy.get("#min")
    .clear({ force: true })
    .clear({ force: true })
    .type("2000000", { force: true });
  //.as("min");

  // cy.get("@min")
  //   .invoke("text")
  //   .then((price) => {
  //     console.log(price);
  //   });

  cy.get("#max")
    .clear({ force: true })
    .clear({ force: true })
    .type("2100000", { force: true });

  const filterByPrice = async () => {
    await cy.get(".goods-price").each(($div) => {
      cy.wrap($div)
        .find("span")
        .invoke("text")
        .should((price) => {
          const priceNum = +price.slice(2).replaceAll(".", "");
          expect(priceNum).to.be.greaterThan(2000000);
          expect(priceNum).to.be.lessThan(2100000);
        });
    });
  };

  filterByPrice();
});
