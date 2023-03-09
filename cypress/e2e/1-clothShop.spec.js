describe("Place order tests", () => {
  beforeEach("Login", () => {
    cy.visit("https://www.mapclub.com/forher/clothing");
  });

  it("verify add to cart without login", () => {
    cy.get('[title="FOR HER"]').click();
    cy.get("h4").contains("Clothing").click();
    // add item 1 to the cart
    cy.contains("Double Breasted Trench Coat").click();
    cy.get('[title="UK 8"]').click();
    cy.contains("ADD TO BAG").click();
    cy.get(".header-main-menu  ")
      .find("ul")
      .find("li")
      .eq(2)
      .find("span")
      .should("contain", "1");

    // add item 2 to the cart
    cy.contains("Pure Cotton Denim Jacket").click({ force: true });
    cy.get('[title="UK 8"]').click();
    cy.contains("ADD TO BAG").click();
    cy.get(".header-main-menu  ")
      .find("ul")
      .find("li")
      .eq(2)
      .find("span")
      .should("contain", "2");

    cy.get('[title="Shopping Bag"]').click({ force: true });

    //check details of item 1
    cy.get(".list-product__detail-description__attribute")
      .eq(0)
      .find("li")
      .eq(0)
      .should("contain", "8");
    cy.get(".list-product__detail-description__price")
      .eq(0)
      .invoke("text")
      .then((price) => {
        const coatPrice = price.slice(3).replaceAll(".", "");
        console.log(coatPrice);
        cy.wrap(coatPrice).should("be.eq", "1299900");
      });

    //check details of item 2
    cy.get(".list-product__detail-description__attribute")
      .eq(1)
      .find("li")
      .eq(1)
      .should("contain", "8");
    cy.get(".list-product__detail-description__price")
      .eq(1)
      .invoke("text")
      .then((price) => {
        const jacketPrice = price.slice(3).replaceAll(".", "");
        cy.wrap(jacketPrice).should("be.eq", "849900");
      });

    // add all items to checkout
    cy.get("#checkbox")
      .check()
      .then(() => {
        cy.wait(1000);
        cy.get(".cart-summary__detail-total")
          .find("b")
          .invoke("text")
          .then((price) => {
            const itemsPrice = +price.slice(2).replaceAll(".", "");

            expect(itemsPrice).to.be.equal(1299900 + 849900);
          });
      });
  });
});