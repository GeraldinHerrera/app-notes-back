import { pool } from '../config/database.js';

export class StudentRepository {
  async createStudent(student) {
    const query = `
      INSERT INTO students (cedula, nombre, correo, celular)
      VALUES ($1, $2, $3, $4)
      RETURNING id, cedula, nombre, correo, celular;
    `;
    const values = [student.cedula, student.nombre, student.correo, student.celular];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByCedulaOrNombre(cedula, nombre) {
    let query = 'SELECT * FROM students WHERE 1=1';
    const values = [];
    let counter = 1;

    if (cedula) {
      query += ` AND cedula = $${counter}`;
      values.push(cedula);
      counter++;
    }

    if (nombre) {
      query += ` AND nombre = $${counter}`;
      values.push(nombre);
      counter++;
    }

    const result = await pool.query(query, values);
    return result.rows.length ? result.rows[0] : null;
  }
}
