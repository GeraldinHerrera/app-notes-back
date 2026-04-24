import { Router } from 'express';
import { StudentController } from '../controllers/studentController.js';

const router = Router();
const studentController = new StudentController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - cedula
 *         - nombre
 *         - correo
 *         - celular
 *         - materia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del estudiante
 *         cedula:
 *           type: string
 *           description: Cédula de identidad
 *         nombre:
 *           type: string
 *           description: Nombre del estudiante
 *         correo:
 *           type: string
 *           description: Correo electrónico
 *         celular:
 *           type: string
 *           description: Número de celular
 *         materia:
 *           type: string
 *           description: Materia
 *       example:
 *         cedula: "123456789"
 *         nombre: "Juan Perez"
 *         correo: "juan@example.com"
 *         celular: "3001234567"
 *         materia: "Matemáticas"
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Crea un nuevo estudiante
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: El estudiante fue creado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/students', studentController.createStudent);

/**
 * @swagger
 * /api/students/search:
 *   get:
 *     summary: Obtiene el ID del estudiante por cédula y nombre
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: cedula
 *         schema:
 *           type: string
 *         required: true
 *         description: Cédula del estudiante
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del estudiante
 *     responses:
 *       200:
 *         description: ID del estudiante
 *       400:
 *         description: Cédula y nombre son requeridos
 *       404:
 *         description: Estudiante no encontrado
 */
router.get('/students/search', studentController.searchStudentId);

export default router;
