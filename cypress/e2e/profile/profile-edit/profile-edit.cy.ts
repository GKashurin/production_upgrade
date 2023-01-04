let profileId = ''

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login()
      .then((data) => { // data - то, что вернет запрос
        profileId = data.id;
        cy.visit(`profile/${data.id}`);
      })
  })
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('и профиль успешно загружается', () => {
    cy
      .getByTestId('Profilecard.firstname')
      .should('have.value', 'test')
    cy
      .getByTestId('Profilecard.lastname')
      .should('have.value', 'user')

  })
  it('и редактирует его', () => {
    const newName = 'newFirstName'
    const newLastName = 'newLastName'
    cy.updateProfile(newName, newLastName);
    cy.getByTestId('Profilecard.firstname').should('have.value', newName);
    cy.getByTestId('Profilecard.lastname').should('have.value', newLastName);
  })
})