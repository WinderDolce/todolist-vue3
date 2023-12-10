describe('Todo List', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:5173');
  });

  it('Crear tarea vacía y mostrar mensaje de error', () => {
    cy.get('.form-task_button').click();
    cy.get('.error-message').contains('Debe indicar la tarea a almacenar').should('be.visible');
    cy.wait(2000);
    cy.get('.error-message').should('not.exist');
  });

  it('Crear nueva tarea', () => {
    cy.get('.form-task_input').type('Nueva tarea');
    cy.get('.form-task_button').click();
    cy.get('.card-task_name').contains('Nueva tarea').should('exist');
  });

  it('Marcar tarea como realizada', () => {
    cy.get('.card-task_checkbox').first().check();
    cy.get('.card-task_name').first().should('have.class', 'done');
  });

  it('Eliminar tarea', () => {
    cy.get('.card-task_button').first().click();
    cy.get('.card-task_name').should('not.exist');
  });

});
