describe('App Basic Functionality', () => {
  beforeEach(() => {
    cy.visit('/'); // Replace with your app's URL or localhost port
  });

  it('should load the application and display posts', () => {
    // Check if the posts are rendered
    cy.get('ul > li').should('have.length.greaterThan', 1);

    // Validate the first post's title and body (optional: replace with your expected data)
    cy.get('ul > li')
      .first()
      .within(() => {
        cy.get('h3').should('be.visible');
        cy.get('p').should('be.visible');
        cy.get('button').should('contain', 'Remove');
      });
  });

  it('should allow the user to search for posts', () => {
    // Type in the search bar
    cy.get('input[placeholder="Search posts..."]')
      .type('qui')
      .should('have.value', 'qui');

    // Verify filtered posts contain the search term
    cy.get('ul > li').each(($post) => {
      cy.wrap($post).within(() => {
        cy.get('h3').should('contain.text', 'qui');
      });
    });
  });

  it('should allow the user to delete a post', () => {
    // Capture the initial number of posts
    cy.get('ul > li').then(($posts) => {
      const initialPostCount = $posts.length;

      // Click the remove button on the first post
      cy.get('ul > li')
        .first()
        .within(() => {
          cy.get('button').click();
        });

      // Ensure the post count decreases by 1
      cy.get('ul > li').should('have.length', initialPostCount - 1);
    });
  });

  it('should display a message if no posts match the search term', () => {
    // Enter a search term that doesn't exist
    cy.get('input[placeholder="Search posts..."]').type(
      'nonexistentsearchterm'
    );

    // Verify "No posts found" message is displayed
    cy.get('p').should('contain', 'No posts found.');
  });
});
