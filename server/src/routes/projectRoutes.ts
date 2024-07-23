import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongToProject, taskExists } from "../middleware/task";

const router = Router();

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

router.put('/:id', 
    
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del projecto es requerido'),
    body('clientName')
        .notEmpty().withMessage('El cliente es requerido'),
    body('description')
        .notEmpty().withMessage('La descripcion del projecto es requerida'),
    handleInputErrors,
    ProjectController.updatedProject

);

router.delete('/:id', 
    
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.deleteProject

);

/** Routes for task */
router.param('projectId', projectExists)

router.post('/:projectId/tasks', 
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
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('name')
    .notEmpty().withMessage('El nombre de la tarea es requerido'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es requerida'),
    handleInputErrors,
    TaskController.updatedTask
)

router.delete('/:projectId/tasks/:taskId', 
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

export default router;