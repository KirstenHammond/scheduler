//Cypress end to end testing for Appointment / index.js
//Accessing scheduler_test mock API database

describe("Appointment tests", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("1. Should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("2. Should edit an interview", () => {
    cy.get("[alt=Edit").first().click({ force: true }); //Only visible on hover

    cy.get("[alt='Tori Malcolm']").click();
    cy.get("[data-testid=student-name-input")
      .clear()
      .type("Lydia Miller-Jones");

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("3. Should cancel an interview", () => {
    cy.get("[alt=Delete").first().click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
