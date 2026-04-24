import { NoteRepository } from '../repositories/noteRepository.js';

export class NoteService {
  constructor() {
    this.noteRepository = new NoteRepository();
  }

  async createNote(noteData) {
    const { nota1 = 0, nota2 = 0, nota3 = 0, nota4 = 0 } = noteData;
    const definitiva = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)) / 4;
    
    const newNote = {
      estudiante_id: noteData.estudiante_id,
      nota1: Number(nota1),
      nota2: Number(nota2),
      nota3: Number(nota3),
      nota4: Number(nota4),
      definitiva
    };

    return await this.noteRepository.createNote(newNote);
  }

  async getNotesByStudentId(estudiante_id) {
    return await this.noteRepository.findByStudentId(estudiante_id);
  }
}
