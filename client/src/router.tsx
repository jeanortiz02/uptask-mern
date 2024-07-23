import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import DasboardView from "@/views/DasboardView";


export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>} >
                    <Route path="/" element={<DasboardView/>} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}