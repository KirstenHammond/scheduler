//Cypress end to end testing for DayList/ Daylist item
//Accessing scheduler_test mock API database

describe("Navigation", () => {
  it("1. Should visit root", () => {
    cy.visit("/");
  });

  it("2. Should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
