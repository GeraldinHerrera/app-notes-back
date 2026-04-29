import { pool } from '../config/database.js';

export class NoteRepository {
  async createNote(note) {
    const query = `
      INSERT INTO notes (estudiante_id, nota1, nota2, nota3, nota4, definitiva, materia)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [note.estudiante_id, note.nota1, note.nota2, note.nota3, note.nota4, note.definitiva, note.materia];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByStudentId(estudiante_id) {
    const query = `
      SELECT * 
      FROM notes
      WHERE estudiante_id = $1;
    `;
    const result = await pool.query(query, [estudiante_id]);
    return result.rows;
  }
}
