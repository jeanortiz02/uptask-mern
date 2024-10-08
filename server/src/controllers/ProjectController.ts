
import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {

    static createProject = async (req: Request, resp: Response) => {
        const project = new Project(req.body);

        // Asignar un manager
        project.manager = req.user.id;

        try {
            await project.save();
            resp.send('Projecto creado sastifactoriamente');
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProjects = async (req: Request, resp: Response) => {
        try {
            const project = await Project.find({
                $or : [
                    {manager: {$in: req.user.id}},
                    {team: {$in: req.user.id}}
                ]
            });
            resp.json(project);
        } catch (error) {
            console.log(error)
        }
    }
    
    static getProjectById = async (req: Request, resp: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id).populate('tasks');

            if (!project) {
                const error = new Error('Projecto no encontrado')
                return resp.status(404).json({error: error.message});
            }

            if( project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)) {
                const error = new Error('Action no valida')
                return resp.status(404).json({error: error.message});
            }

            resp.json(project);
        } catch (error) {
            console.log(error)
        } 
    }


    static updatedProject = async (req: Request, resp: Response) => {
        try {

            req.project.projectName = req.body.projectName;
            req.project.clientName = req.body.clientName;
            req.project.description = req.body.description;

            
            await req.project.save();
            resp.send('Projecto actualizado');
        } catch (error) {
            console.log(error)
        } 
    }
    static deleteProject = async (req: Request, resp: Response) => {
        try {           
            await req.project.deleteOne();
            resp.send('Projecto eliminado');    
        } catch (error) {
            console.log(error)
        } 
    }
}