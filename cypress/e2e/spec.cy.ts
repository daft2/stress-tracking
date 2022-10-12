describe("Home", () => {
  it("should render stress form with input image and stress level", () => {
    cy.visit("http://localhost:3000/");

    cy.get("form");
    cy.get('input[type="file"]');
    cy.get('input[type="number"]');
  });

  it("should render history table", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("history");
    cy.get("table");
  });

  it("should successfully submit form if the image is not null ", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[type="file"]').selectFile("cypress/fixtures/example.jpg");

    cy.get("form").submit();
    cy.then(() => {
      cy.on("window:alert", (text) => {
        expect(text).to.eq("Insert success...");
      });
    });
  });

  it("should failed when image size is over 2MB", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[type="file"]').selectFile("cypress/fixtures/oversize.jpg");

    cy.get("form").submit();
    cy.then(() => {
      cy.on("window:alert", (text) => {
        expect(text).to.eq("Error Image limit is 2MB");
      });
    });
  });
});
