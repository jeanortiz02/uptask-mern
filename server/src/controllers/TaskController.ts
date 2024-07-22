

import type { Request, Response} from 'express';
import Task from '../models/Task';

export class TaskController {
    static createTask = async (req: Request, resp: Response) => {

        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await Promise.allSettled([task.save(), req.project.save()])
            resp.send('Tarea creada correctamente');

            
        } catch (error) {
            resp.status(500).json({ error: 'Hubo un error'});
        }
    }

    static getProjectTask = async (req: Request, res: Response) => {

        try {
            const task = await Task.find({ project: req.project.id }).populate('project');
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error'});
        }
    }
    static getTaskById = async (req: Request, res: Response) => {

        try {
            const { taskId } = req.params;
            const task = await Task.findById(taskId);

            if ( !task ) {
                const error = new Error('Tarea no encontrada');
                return res.status(404).json({ error: error.message });
            }
            
            if (task.project.toString() !== req.project.id) {
                const error = new Error('No tienes permisos para ver esta tarea');
                return res.status(403).json({ error: error.message });
            }

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error'});
        }
    }
}