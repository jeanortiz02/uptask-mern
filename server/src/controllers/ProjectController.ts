
import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {

    static createProject = async (req: Request, resp: Response) => {
        const project = new Project(req.body);

        try {
            await project.save();
            resp.send('Projecto creado sastifactoriamente');
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProjects = async (req: Request, resp: Response) => {
        try {
            const project = await Project.find({});
            resp.json(project);
        } catch (error) {
            console.log(error)
        }
    }
    static getProjectById = async (req: Request, resp: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error('Projecto no encontrado')
                return resp.status(404).json({error: error.message});
            }
            resp.json(project);
        } catch (error) {
            console.log(error)
        } 
    }


    static updatedProject = async (req: Request, resp: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findByIdAndUpdate(id, req.body);
            
            if (!project) {
                const error = new Error('Projecto no encontrado')
                return resp.status(404).json({error: error.message});
            }
            await project.save();
            resp.send('Projecto actualizado');
        } catch (error) {
            console.log(error)
        } 
    }
    static deleteProject = async (req: Request, resp: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);
            
            if (!project) {
                const error = new Error('Projecto no encontrado')
                return resp.status(404).json({error: error.message});
            }
            
            await project.deleteOne();
            resp.send('Projecto eliminado');    
        } catch (error) {
            console.log(error)
        } 
    }
}