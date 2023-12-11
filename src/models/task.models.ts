// Interfaz para representar la estructura de una tarea
export interface Task {
    id: string;        // Identificador único de la tarea
    name: string;      // Nombre de la tarea
    done: boolean;     // Estado de finalización de la tarea
    editedName?: string;  // Nombre editado de la tarea (opcional)
}
