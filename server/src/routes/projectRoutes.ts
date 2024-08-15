import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { hasAuthorization, taskBelongToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from '../controllers/NoteController';

const router = Router();

// Valida que para usar los endpoints esten autenticado
router.use(authenticate);

/* Routes for Projects */

router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El nombre del projecto es requerido'),
    body('clientName')
        .notEmpty().withMessage('El cliente es requerido'),
    body('description')
        .notEmpty().withMessage('La descripcion del projecto es requerida'),

    handleInputErrors,

    ProjectController.createProject)


router.get('/', ProjectController.getAllProjects);


router.get('/:id', 
    
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.getProjectById

);

router.param('projectId', projectExists)

router.put('/:projectId', 
    
    param('projectId').isMongoId().withMessage('ID no valido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del projecto es requerido'),
    body('clientName')
        .notEmpty().withMessage('El cliente es requerido'),
    body('description')
        .notEmpty().withMessage('La descripcion del projecto es requerida'),
    handleInputErrors,
    hasAuthorization,
    ProjectController.updatedProject

);

router.delete('/:projectId', 
    
    param('projectId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    hasAuthorization,
    ProjectController.deleteProject

);

/** Routes for task */


router.post('/:projectId/tasks', 
    hasAuthorization,
    body('name')
    .notEmpty().withMessage('El nombre de la tarea es requerido'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es requerida'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks', 
    TaskController.getProjectTask
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongToProject)

router.get('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.getTaskById
)
router.put('/:projectId/tasks/:taskId', 
    hasAuthorization,
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('name')
    .notEmpty().withMessage('El nombre de la tarea es requerido'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es requerida'),
    handleInputErrors,
    TaskController.updatedTask
)

router.delete('/:projectId/tasks/:taskId', 
    hasAuthorization,
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.deleteTask
)

/* Check Status  */ 
router.post('/:projectId/tasks/:taskId/status', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus

)

/** Routes for Teams */
router.post('/:projectId/team/find',
    
    body('email')
        .isEmail().toLowerCase().withMessage('E-mail no valido'),
    handleInputErrors,

    TeamMemberController.findMember

)

router.get('/:projectId/team',
    TeamMemberController.getProjectTeam
)

router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId',
    param('userId')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TeamMemberController.removeMemberById
)

/** Routes for Notes */

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage('El contenido de la nota es obligatorio'),
        handleInputErrors,
    NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getTaskNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId')
        .isMongoId().withMessage('ID no valido'),
        handleInputErrors,

    NoteController.deleteNote
)

export default router;