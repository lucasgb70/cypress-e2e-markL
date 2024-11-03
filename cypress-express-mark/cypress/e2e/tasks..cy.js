/// <reference types="cypress"/>

describe('tarefas', ()=>{
    
    it('deve cadastrar uma nova tarefa', ()=>{

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: 'Ler um livro de Node.js'}
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Ler um livro de Node.js')

        //Não precisa do plugin xPath se usar as funções do Cypress
        cy.contains('button', 'Create').click()

        cy.contains('main div p', 'Ler um livro de Node.js')
            .should('be.visible')

    })

})