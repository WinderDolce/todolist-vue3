describe('Todo List', () => {
  // Prueba: Visita la URL principal de la aplicación
  it('Visits the app root url', () => {
    cy.visit('http://localhost:5173');
  });

  // Prueba: Intenta crear una tarea vacía y verificar la aparición del mensaje de error
  it('Crear tarea vacía y mostrar mensaje de error', () => {
    cy.get('.form-task_button').click();
    cy.get('.error-message').contains('Debe indicar la tarea a almacenar').should('be.visible');
    cy.wait(2000);
    cy.get('.error-message').should('not.exist');
  });

  // Prueba: Crea una nueva tarea y verificar su aparición en la lista
  it('Crear nueva tarea', () => {
    cy.get('.form-task_input').type('Nueva tarea desde CYPRESS');
    cy.get('.form-task_button').click();
    cy.get('.card-task_name').contains('Nueva tarea').should('exist');
  });

  // Prueba: Edita una tarea desde la caja de texto
  it('Editar tarea desde la caja de texto', () => {
    cy.get('.card-task_button-edit').should('exist').click();
    cy.get('.card-task_input-edition').type('SE HA EDITADO DESDE CYPRESS');
    cy.get('.card-task_button-save').click();
  });
  
  // Prueba: Edita una tarea y cancelar la edición
  it('Editar tarea y cancelar la edición', () => {
    cy.get('.card-task_button-edit').should('exist').click();
    cy.get('.card-task_input-edition').type('CANCELANDO EDICIÓN DESDE CYPRESS');
    cy.get('.card-task_button-cancel').click();
  });

  // Prueba: Marca una tarea como realizada
  it('Marcar tarea como realizada', () => {
    cy.get('.card-task_checkbox').first().check();
    cy.get('.card-task_name').first().should('have.class', 'done');
  });

  // Prueba: Elimina una tarea
  it('Eliminar tarea', () => {
    cy.get('.card-task_button').first().click();
    cy.get('.card-task_name').should('not.exist');
  });
});
