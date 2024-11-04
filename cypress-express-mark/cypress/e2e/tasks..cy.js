/// <reference types="cypress"/>

describe('Tarefas', ()=>{
    
    context('Cadastro', () =>{
        it('Deve cadastrar uma nova tarefa', ()=>{

            const taskName = 'Ler um livro de Node.js'
            
            cy.removeTaskByName(taskName)

            cy.createTask(taskName)

            cy.contains('main div p', taskName)
                .should('be.visible')
        })

        it('Não deve permitir tarefa duplicada', ()=>{
            
            const task = {
                name: 'Estudar Javascript',
                is_done: false
            }

            cy.removeTaskByName(task.name)

            //Dado que eu tenho uma tarefa duplicada
            cy.postTask(task)

            //Quando faço o cadastro desta tarefa
            cy.createTask(task.name)

            //Então vejo a mensagem de duplicidade
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it ('Campo obrigatório', () =>{
            cy.createTask()
            cy.isRequired('This is a required field')
        
        })
    })

    context('Atualizacao', () =>{
        it('Deve concluir uma task', () =>{
            const task = {
                name: "Estudar Javascript", is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('http://localhost:8080')

            //(//p[contains(text(), "Estudar Javascript")]/..//button)[1]
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]').click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
                
        })
    })

    context('Exclusão', () =>{
        it('Deve excluir uma task', () =>{
            const task = {
                name: "Estudar sobre testes", is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('http://localhost:8080')

            //(//p[contains(text(), "Estudar Javascript")]/..//button)[1]
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]').click()

            cy.contains('p', task.name)
                .should('not.exist')
                
        })
    })
   
})

