[1mdiff --git a/cypress-express-mark/cypress/e2e/tasks..cy.js b/cypress-express-mark/cypress/e2e/tasks..cy.js[m
[1mindex 58487dd..9f0709b 100644[m
[1m--- a/cypress-express-mark/cypress/e2e/tasks..cy.js[m
[1m+++ b/cypress-express-mark/cypress/e2e/tasks..cy.js[m
[36m@@ -35,5 +35,11 @@[m [mdescribe('tarefas', ()=>{[m
             .should('be.visible')[m
             .should('have.text', 'Task already exists!')[m
     })[m
[32m+[m
[32m+[m[32m    it ('Campo obrigatório', () =>{[m
[32m+[m[32m        cy.createTask()[m
[32m+[m[32m        cy.isRequired('This is a required field')[m
[32m+[m[41m    [m
[32m+[m[32m    })[m
 })[m
 [m
[1mdiff --git a/cypress-express-mark/cypress/support/commands.js b/cypress-express-mark/cypress/support/commands.js[m
[1mindex cff1d8f..d602c2e 100644[m
[1m--- a/cypress-express-mark/cypress/support/commands.js[m
[1m+++ b/cypress-express-mark/cypress/support/commands.js[m
[36m@@ -24,13 +24,16 @@[m
 // -- This will overwrite an existing command --[m
 // Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })[m
 [m
[31m-Cypress.Commands.add('createTask', (taskName)=> {[m
[32m+[m[32mCypress.Commands.add('createTask', (taskName = '')=> {[m
     cy.visit('http://localhost:8080')[m
[32m+[m[32m    cy.get('input[placeholder="Add a new Task"]').as('inputTask')[m
[32m+[m[41m        [m
[32m+[m[32m    if(taskName !== ''){[m
[32m+[m[32m       cy.get('@inputTask')[m
[32m+[m[32m            .type(taskName)[m
[32m+[m[32m    }[m
 [m
[31m-        cy.get('input[placeholder="Add a new Task"]')[m
[31m-        .type(taskName)[m
[31m-[m
[31m-        cy.contains('button', 'Create').click()[m
[32m+[m[32m    cy.contains('button', 'Create').click()[m
 })[m
 [m
 Cypress.Commands.add('removeTaskByName', (taskName)=> {[m
[36m@@ -51,4 +54,15 @@[m [mCypress.Commands.add('postTask', (task)=> {[m
     }).then(response => {[m
         expect(response.status).to.eq(201)[m
     })[m
[32m+[m[32m})[m
[32m+[m
[32m+[m[32mCypress.Commands.add('isRequired', (text) =>{[m
[32m+[m[41m   [m
[32m+[m[32m        cy.get('@inputTask')[m
[32m+[m[32m            .invoke('prop', 'validationMessage')[m
[32m+[m[32m            .should((text) => {[m
[32m+[m[32m                expect([m
[32m+[m[32m                    'This is a required field'[m
[32m+[m[32m                ).to.eq(text)[m
[32m+[m[32m            })[m
 })[m
\ No newline at end of file[m
