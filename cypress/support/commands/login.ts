import {USER_LOCALSTORAGE_KEY} from "../../../src/shared/const/localstorage";

export const login = (username: string, password: string) => {
  cy.request({ //https://docs.cypress.io/guides/end-to-end-testing/auth0-authentication#Programmatic-Login
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      username,
      password,
    },
  }).then(({body}) => {

    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))

    cy.visit('/')
  })
}