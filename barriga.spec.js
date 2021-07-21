/// <reference types="cypress"/>

describe('barriga', ()=> {
    it('deve poder realizar cadastro', ()=>{
        cy.visit('http://seubarriga.wcaquino.me/cadastro');

        // cy.get - busca um elemento
       // .type - insere um texto
        cy.get('[id=nome]').type('Diego');
        cy.get('#email').type('saulo@gmail.com');
        cy.get('#senha').type('123456789');
  
        cy.get('.btn').click();

        //Assert para verificar se o elemento do botão "cadastrar" exite dentro do DOM
        cy.get('.btn').should('exist');

    });

    it('devem poder realizar login', ()=>{
        
        cy.visit('http://seubarriga.wcaquino.me/login');
        cy.get('#email').type('saulo@gmail.com');
        cy.get('#senha').type('123456789');
        cy.get('.btn').click();

        
        //Assert para verificar se após fazer login, será exibida mensagem de "Bem vindo!"
        expect('Bem vindo, Diego!').be.eq('Bem vindo, Diego!');

        // confirme se todos os recursos estáticos foram executados
        cy.get('#app-message').should('not.be.empty');
        cy.log('app.js loaded');
        cy.contains('Sair').click();

    });

    it(' devem poder acessar a lista de contas', ()=> {
        cy.visit('http://seubarriga.wcaquino.me/login');
        cy.get('#email').type('saulo@gmail.com');
        cy.get('#senha').type('123456789');
        cy.get('.btn').click();

        //Assert para verificar caso uma conta já exista se aparecerá a mensagem Já existe uma conta com esse nome!
        expect('Já existe uma conta com esse nome!').be.eq('Já existe uma conta com esse nome!');

        //adicionar uma nova conta
        cy.contains('Contas').click();
        cy.get('.dropdown-menu > :nth-child(1) > a').click();
        cy.get('#nome').type('Aluguel');
        cy.get('.btn').click();

        //verificar a lista e  excluir um elemento da lista
        cy.contains('Contas').click();
        cy.contains('Listar').click();
        //cy.get('').click();



    });
        
    it('Criar movimentação', ()=>{
        cy.visit('http://seubarriga.wcaquino.me/login');
        cy.get('#email').type('saulo@gmail.com');
        cy.get('#senha').type('123456789');
        cy.get('.btn').click();

        cy.get(':nth-child(3) > a').click();
        cy.get('#data_transacao').type('10/07/2021');
        cy.get('#data_pagamento').type('26/08/2021');
        cy.get('#descricao').type('Pagar o concerto do carro');
        cy.get('#interessado').type('Eu mesmo');
        cy.get('#valor').type('1500');
        cy.get('#status_pago').click();
        cy.get('.btn').click();

        //Aseert para verificar se após realizar uma movimentação será exibida a mensagem Movimentação adicionada com sucesso!
        expect('Movimentação adicionada com sucesso!').be.eq('Movimentação adicionada com sucesso!');

    });

    it('devem poder verificaro resumo mensal ', ()=>{
        cy.visit('http://seubarriga.wcaquino.me/login');
        cy.get('#email').type('saulo@gmail.com');
        cy.get('#senha').type('123456789');
        cy.get('.btn').click();

        cy.get(':nth-child(4) > a').click();

    });

    it('deve ser capaz de excluir a ação', ()=>{
        cy.visit('http://seubarriga.wcaquino.me/extrato');
        cy.get('#email').type('saulo@gmail.com');
        cy.get('#senha').type('123456789');
        cy.get('.btn').click();
        
        //deve ser capaz de excluir a ação
        cy.visit('http://seubarriga.wcaquino.me/extrato');
        cy.get(':nth-child(1) > :nth-child(6) > a > .glyphicon').click();
        
        //Asset verificar se o elemento botão [data-layer="Content"] não existe no DOM
        cy.get('[data-layer="Content"]').should('not.exist');

        //Assert para verificar se após excluir um item a mensagem Movimentação removida com sucesso! será exibida
        expect('Movimentação removida com sucesso!').be.eq('Movimentação removida com sucesso!');

        // confirme se todos os recursos estáticos foram executados
        cy.get('#app-message').should('not.be.empty');
        cy.log('app.js loaded');
        cy.contains('Sair').click();

    })

})
