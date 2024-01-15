describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matt Testman',
      username: 'mattiest',
      password: '333'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('username')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mattiest')
      cy.get('#password').type('333')
      cy.get('#login-button').click()
      cy.contains('Matt Testman logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mary')
      cy.get('#password').type('555')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
      cy.get('.showMsg-red').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in and create new blog', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('mattiest')
      cy.get('#password').type('333')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('.new-blog-btn').click()
      cy.get('#title-input').type('My Blog Is Pretty Neat')
      cy.get('#author-input').type('Henrique Blogster')
      cy.get('#url-input').type('www.henriquesblogs.blogs.com')
      cy.get('.create-btn').click()
      cy.contains('A new blog My Blog Is Pretty Neat by Henrique Blogster added').should('be.visible')
    })
  })

  describe('Interacting with blogpost', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('mattiest')
      cy.get('#password').type('333')
      cy.get('#login-button').click()
      cy.get('.new-blog-btn').click()
      cy.get('#title-input').type('My Blog Is Pretty Neat')
      cy.get('#author-input').type('Henrique Blogster')
      cy.get('#url-input').type('www.henriquesblogs.blogs.com')
      cy.get('.create-btn').click()
    })

    it('A blog can be liked', function() {
      cy.contains('View').click()
      cy.get('.like-btn').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted by the user who created it', function() {
      cy.contains('View').click()
      cy.contains('www.henriquesblogs.blogs.com')
      cy.contains('remove').click()
      cy.contains('www.henriquesblogs.blogs.com').should('not.exist')
    })

    it('A blogs remove button can only be viewed by the user who made it', function() {
      cy.contains('View').click()
      cy.contains('www.henriquesblogs.blogs.com')
      cy.contains('remove')
      cy.contains('logout').click()
      const user2 = {
        name: 'Matt Testman2',
        username: 'mattiest2',
        password: '222'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.contains('log in').click()
      cy.get('#username').type('mattiest2')
      cy.get('#password').type('222')
      cy.get('#login-button').click()
      cy.contains('View').click()
      cy.contains('www.henriquesblogs.blogs.com')
      cy.contains('remove').should('not.exist')
    })

    it('Blogs are ordered by highest to lowest likes', function() {
      cy.contains('View').click()
      cy.get('.like-btn').click()
      cy.get('.like-btn').click()

      cy.get('.new-blog-btn').click()
      cy.get('#title-input').type('My Blog Is Pretty Neat2')
      cy.get('#author-input').type('Henrique Blogster2')
      cy.get('#url-input').type('www.henriquesblogs2.blogs.com')
      cy.get('.create-btn').click()
      cy.contains('A new blog My Blog Is Pretty Neat2 by Henrique Blogster2 added').should('be.visible')
      cy.contains('View').click()
      cy.contains('www.henriquesblogs2.blogs.com')
      cy.get('.like-btn').click({ multiple: true })

      cy.get('.blog-text').eq(0).should('contain', 'My Blog Is Pretty Neat')
      cy.get('.blog-text').eq(1).should('contain', 'My Blog Is Pretty Neat2')
    })

  })
})