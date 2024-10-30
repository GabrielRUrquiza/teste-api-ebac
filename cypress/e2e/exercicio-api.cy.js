/// <reference types="cypress" />

import contrato from '../contracts/usuarios.contrato'

describe('Testes da Funcionalidade Usuários', () => {

  it.only('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
        return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should((response)=>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    }) 
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    cy.request({
      method: "POST",
      url: 'usuarios',
      body: {
        "nome": 'Gabriel Rodrigues Urquiza',
        "email": 'urquiza-qa1@ebac.com.br',
        "password": 'teste',
        "administrador": 'true'
      }
    }).should((response)=> {
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
          "email": "urquiza_qa1@ebac.com.br",
          "password": "teste" 
      },
      failOnStatusCode: false
  }).then((response) => {
      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal('Email e/ou senha inválidos')
      cy.log(response.body.authorization)
  })
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    cy.request({
      method: 'PUT',
      url: 'usuarios' + '/BJeV7DJFy2ht488k',
      body: {
        "nome": 'Gabriel Ur. Rodrigues',
        "email": 'urquizagabriel21@ebac.com.br',
        "password": 'teste',
        "administrador": 'true'
      }
    })
    .should((response) =>{
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Registro alterado com sucesso')
  }) 
  });

  it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
    cy.request({
      method: 'DELETE',
      url: 'usuarios' + '/rysZ96FIyiRIIk6b'
    }).should(response => {
      expect(response.body.message).to.equal('Registro excluído com sucesso')
      expect(response.status).to.equal(200)
  })
  });

});
