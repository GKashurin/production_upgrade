import {selectByTestId} from "../../helpers/selectByTestId";

describe('Роутинг', () => {
  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login('admin', '123')
    })
    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');
      cy
        .get(selectByTestId('ProfilePage'))
        .should('exist')
    })
    it('Переход на страницу со статьями', () => {
      cy.visit('/articles');
      cy
        .get(selectByTestId('ArticlesPage'))
        .should('exist')
    })
  })
  describe('Пользователь не авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/');
      cy
        .get(selectByTestId('MainPage'))
        .should('exist') // список чейнеров https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    })
    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');
      cy
        .get(selectByTestId('MainPage'))
        .should('exist')
    })
    it('Переход на несуществующий маршрут', () => {
      cy.visit('/kfdl');
      cy
        .get(selectByTestId('NotFoundPage'))
        .should('exist')
    })
  })
})