import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";


type NoteAPIType = {
    formData: NoteFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
    noteId: Note['_id'];
}

export const createNote = async ({projectId, taskId, formData} : Pick< NoteAPIType, 'projectId' | 'taskId' | 'formData'>) => {

    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const deleteNote = async({projectId, taskId, noteId} : Pick < NoteAPIType, 'projectId' | 'taskId' | 'noteId' >) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}