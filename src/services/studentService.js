import { StudentRepository } from '../repositories/studentRepository.js';

export class StudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async createStudent(student) {
    return await this.studentRepository.createStudent(student);
  }

  async getStudentIdByCedulaOrNombre(cedula, nombre) {
    const student = await this.studentRepository.findByCedulaOrNombre(cedula, nombre);
    return student?.id || null;
  }
}
