import { Router } from 'express';
import { NoteController } from '../controllers/noteController.js';

const router = Router();
const noteController = new NoteController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - estudiante_id
 *       properties:
 *         id:
 *           type: integer
 *         estudiante_id:
 *           type: integer
 *         nota1:
 *           type: number
 *         nota2:
 *           type: number
 *         nota3:
 *           type: number
 *         nota4:
 *           type: number
 *         definitiva:
 *           type: number
 *       example:
 *         estudiante_id: 1
 *         nota1: 4.5
 *         nota2: 3.8
 *         nota3: 4.0
 *         nota4: 4.2
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Crea las notas para un estudiante
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: Notas creadas exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error en el servidor
 */
router.post('/notes', noteController.createNote);

/**
 * @swagger
 * /api/notes/student:
 *   get:
 *     summary: Obtiene las notas de un estudiante buscado por cédula y nombre
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: cedula
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de notas del estudiante
 *       400:
 *         description: Cédula y nombre son requeridos
 *       404:
 *         description: Estudiante no encontrado
 */
router.get('/notes/student', noteController.getNotesByStudent);

export default router;
