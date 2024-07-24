import ProjectForm from "@/components/project/ProjectForm";
import { createProject } from "@/api/ProjectAPI";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ProjectFormData } from "@/types/index";




export default function CreateProjectView() {

    const navigate = useNavigate();

    const initialValue : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValue})

    const handleForm = async(formData : ProjectFormData) => {
        const data = await createProject(formData)
        toast.success(data);
        navigate('/')
    }


  return (
    
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Crear Projecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un projecto</p>
            <nav className="my-5">
                <Link
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl cursor-pointer transition-colors"
                to='/'
                >
                    Volver a projecto
                </Link>
            </nav>

            <form 
                className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm
                    register={register}
                    errors={errors}
                />
                <input 
                    type="submit" 
                    value='Crear Projecto'
                    className="bg-fuchsia-400 hover:bg-fuchsia-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                />
            </form>
        </div>



    </>
  )
}
