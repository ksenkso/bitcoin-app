describe('Тест управления сокетами', () => {
  const WAIT_BEFORE_STOP = 2000
  const WAIT_AFTER_STOP = 4000

  beforeEach(() => {
    cy.visit('/')
  })

  it('новые строки не должны добавляться после того, как была нажата кнопка "Остановка"', () => {
    cy.contains('Запуск').click()
    cy.wait(WAIT_BEFORE_STOP)

    cy.get('table').find('tr').then(rows => {
      const count = Cypress.$(rows).length
      cy.contains('Остановка').click()
      cy.wait(WAIT_AFTER_STOP)
      cy.get('tr').should('have.length', count)
    })
  })

  it('сумма не должна изменяться после того, как была нажата кнопка "Остановка"', () => {
    cy.contains('Запуск').click()
    cy.wait(WAIT_BEFORE_STOP)

    cy.get('table').find('tr').then(() => {
      const sum = Cypress.$('.sum').text()
      cy.contains('Остановка').click()
      cy.wait(WAIT_AFTER_STOP)
      cy.get('.sum').should('have.text', sum)
    })
  })

  it('новые строки должны добавляться после того, как прослушивание было возобновлено', () => {
    cy.contains('Запуск').click()
    cy.wait(WAIT_BEFORE_STOP)

    cy.get('table').find('tr').then(rows => {
      const count = Cypress.$(rows).length
      cy.contains('Остановка').click()
      cy.wait(WAIT_AFTER_STOP)
      cy.contains('Запуск').click()
      cy.wait(WAIT_BEFORE_STOP)
      cy.get('tr').its('length').should('be.gt', count)
    })
  })
})
