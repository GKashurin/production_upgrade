describe('Пользователь зашел на стр со статьями', () => {
  beforeEach(() => {
    cy.login().then(() => {
        cy.visit('articles');
      })
  })

  it('и статьи успешно подгружаются', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3); // больше 3
  })

  it('На стабах (фикстурах)', () => {
    cy.intercept('GET', '**/articles?*', {fixture: 'articles.json'})
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  })

  it('и фильтрует статьи по тегам', () => {
    cy.getByTestId('ArticleList')
    cy.getByTestId('Tubs.ECONOMICS').click()
    cy.getByTestId('ArticleListItem').should('have.length.lessThan', 3); // меньше 3
  })
})