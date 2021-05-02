describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name:'Jenni Puhakka', username: 'jenni', password: 'salasana'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jenni')
      cy.get('#password').type('salasana')
      cy.contains('login').click()

      cy.get('#error').contains('welcome jenni')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jenni')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('#error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jenni', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new Blog')
      cy.get('#author').type('new author')
      cy.get('#url').type('www.url.fi')
      cy.get('#create').click()

      cy.contains('new Blog')
      cy.get('#error')
        .should('contain', 'a new blog new Blog by new author added')
      cy.get('#blogs').contains('new Blog')

    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new Blog')
      cy.get('#author').type('new author')
      cy.get('#url').type('www.url.fi')
      cy.get('#create').click()

      cy.contains('view').click()

      cy.contains('new Blog new author').parent()
        .find('#likes').contains('likes 0')
        .contains('like').click()
      cy.contains('new Blog new author').parent()
        .find('#likes').contains('likes 1')

    })

    describe('and blogs exists', function () {
      beforeEach(function () {
        cy.create({ title:'first blog', author:'author', url:'www.mmm.com', likes:5 })
        cy.create({ title:'second blog', author:'author', url:'www.mmjjm.com', likes:9 })
      })

      it('a blog can be deleted by its creator', function() {
        cy.contains('second blog').parent().as('blogToRemove')
        cy.get('@blogToRemove').contains('view').click()
        cy.get('@blogToRemove').contains('remove').click()
        cy.get('#blogs').should('not.contain', 'second blog')
      })

      describe('and many blogs exists', function () {
        beforeEach(function () {
          cy.create({ title:'fourth blog', author:'author', url:'www.mmjjm.com', likes:8 })
          cy.create({ title:'third blog', author:'author', url:'www.mmjjm.com', likes:81 })
        })

        it('blogs are in order by their likes', function() {
          const likesInOrder = [81, 9, 8, 5]
          //The order should be third, second, fourth, first
          for (let i = 0; i < likesInOrder.length; i++) {
            cy.get('.blog').eq(i).contains('view').click()
            cy.get('.blog').eq(i).should('contain.text', `likes ${likesInOrder[i]}`)
          }
        })
      })
    })
  })
})