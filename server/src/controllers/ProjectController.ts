
import type { Request, Response } from "express"

export class ProjectController {

    static getAllProjects = async (req: Request, resp: Response) => {
        resp.send('Todos los projectos')
    }
}