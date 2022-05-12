import { When, Then, Given } from "cypress-cucumber-preprocessor/steps"

When("I enter the site", () => {
  cy.visit("localhost:3000/");
});

Then("I want to see all the available services related to the Zenbridge services", () => {
  cy.get("li").contains("Swarm of Oracle status check");
  cy.get("li").contains("Logs management");
  cy.get("li").contains("SoftwarePassport tasks");
});