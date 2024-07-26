import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import DasboardView from "@/views/DasboardView";
import CreateProjectView from "./views/project/CreateProjectView";
import EditProjectView from "./views/project/EditProjectView";
import ProjectDetailView from "./views/project/ProjectDetailView";


export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>} >
                    <Route path="/" element={<DasboardView/>} index />
                    <Route path="/projects/create" element={<CreateProjectView/>} />
                    <Route path="/projects/:projectId" element={<ProjectDetailView/>} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}