import { StudentService } from '../services/studentService.js';

export class StudentController {
  constructor() {
    this.studentService = new StudentService();
  }

  createStudent = async (req, res) => {
    try {
      const student = await this.studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear estudiante', details: error.message });
    }
  };

  searchStudentId = async (req, res) => {
    try {
      const cedula = req.query.cedula;
      const nombre = req.query.nombre;

      if (!cedula || !nombre) {
        res.status(400).json({ error: 'Cédula y nombre son requeridos' });
        return;
      }

      const id = await this.studentService.getStudentIdByCedulaAndNombre(cedula, nombre);
      if (id) {
        res.status(200).json({ estudiante_id: id });
      } else {
        res.status(404).json({ error: 'Estudiante no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar estudiante', details: error.message });
    }
  };
}
