import { pool } from '../config/database.js';

export class StudentRepository {
  async createStudent(student) {
    const query = `
      INSERT INTO students (cedula, nombre, correo, celular, materia)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, cedula, nombre, correo, celular, materia;
    `;
    const values = [student.cedula, student.nombre, student.correo, student.celular, student.materia];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByCedulaAndNombre(cedula, nombre) {
    const query = `
      SELECT * FROM students
      WHERE cedula = $1 AND nombre = $2;
    `;
    const result = await pool.query(query, [cedula, nombre]);
    return result.rows.length ? result.rows[0] : null;
  }
}
