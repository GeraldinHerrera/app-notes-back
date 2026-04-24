import { NoteService } from '../services/noteService.js';
import { StudentService } from '../services/studentService.js';

export class NoteController {
  constructor() {
    this.noteService = new NoteService();
    this.studentService = new StudentService();
  }

  createNote = async (req, res) => {
    try {
      const { estudiante_id, nota1, nota2, nota3, nota4 } = req.body;
      if (!estudiante_id) {
        res.status(400).json({ error: 'El estudiante_id es obligatorio' });
        return;
      }
      
      const newNote = await this.noteService.createNote({
        estudiante_id,
        nota1,
        nota2,
        nota3,
        nota4
      });
      res.status(201).json(newNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear nota', details: error.message });
    }
  };

  getNotesByStudent = async (req, res) => {
    try {
      const cedula = req.query.cedula;
      const nombre = req.query.nombre;

      if (!cedula || !nombre) {
        res.status(400).json({ error: 'Cédula y nombre son requeridos' });
        return;
      }

      const estudiante_id = await this.studentService.getStudentIdByCedulaAndNombre(cedula, nombre);
      if (!estudiante_id) {
        res.status(404).json({ error: 'Estudiante no encontrado' });
        return;
      }

      const notes = await this.noteService.getNotesByStudentId(estudiante_id);
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al consultar notas', details: error.message });
    }
  };
}
