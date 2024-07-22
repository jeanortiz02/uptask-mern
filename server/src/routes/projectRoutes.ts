import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router();

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
router.param('projectId', validateProjectExists)

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
router.get('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.getTaskById
)

export default router;