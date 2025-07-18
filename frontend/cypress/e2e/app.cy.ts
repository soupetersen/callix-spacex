describe('SpaceX Launches App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the application header', () => {
    cy.get('h1').should('contain', 'SpaceX')
    cy.get('h1').should('be.visible')
  })

  it('should display the refresh button', () => {
    cy.get('button').contains('Atualizar Dados').should('be.visible')
    cy.get('button').contains('Atualizar Dados').should('not.be.disabled')
  })

  it('should display all four launch sections', () => {
    cy.get('h2').should('have.length', 4)
    cy.get('h2').should('contain', 'Próximo Lançamento')
    cy.get('h2').should('contain', 'Último Lançamento')
    cy.get('h2').should('contain', 'Próximos Lançamentos')
    cy.get('h2').should('contain', 'Lançamentos Passados')
  })

  it('should refresh data when refresh button is clicked', () => {
    cy.get('[data-testid="loading-state"]', { timeout: 10000 }).should('not.exist')
    
    cy.get('button').contains('Atualizar Dados').click()
    
    cy.get('button').contains('Atualizando...').should('be.disabled')
    
    cy.get('button').contains('Atualizar Dados', { timeout: 10000 }).should('not.be.disabled')
  })
})