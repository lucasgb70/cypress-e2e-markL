/// <reference types="cypress"/>

import {faker} from '@faker-js/faker'
describe('tarefas', ()=>{
    
    it('deve cadastrar uma nova tarefa', ()=>{
        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type(faker.music.songName())

        //Não precisa do plugin xPath se usar as funções do Cypress
        cy.contains('button', 'Create').click()
    })

})