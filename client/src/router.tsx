import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import DasboardView from "@/views/DasboardView";
import CreateProjectView from "./views/project/CreateProjectView";
import EditProjectView from "./views/project/EditProjectView";
import ProjectDetailView from "./views/project/ProjectDetailView";
import AuthLayout from "./layout/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/project/ProjectTeamView";


export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                /** Projects */
                <Route element={<AppLayout/>} >
                    <Route path="/" element={<DasboardView/>} index />
                    <Route path="/projects/create" element={<CreateProjectView/>} />
                    <Route path="/projects/:projectId" element={<ProjectDetailView/>} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView/>} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView/>} />
                </Route>
                
                /** Authentication */
                <Route element={<AuthLayout/>} >
                    <Route path="/auth/login" element={<LoginView/>}/>
                    <Route path="/auth/register" element={<RegisterView/>}/>
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView/>}/>
                    <Route path="/auth/request-code" element={<RequestNewCodeView/>}/>
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView/>}/>
                    <Route path="/auth/new-password" element={<NewPasswordView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}