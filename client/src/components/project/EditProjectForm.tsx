import { Link } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";


type EditProjectFormData = {
  data: ProjectFormData,
  projectId: Project['_id'],
}

export default function EditProjectForm({data, projectId} : EditProjectFormData) {


    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description
  }})

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: () => {

    },
    onSuccess: () => {

    }
  }) 

    const handleForm = (formData: ProjectFormData) => {
      const data = {
        formData, 
        projectId
      }
      mutate(data);
    }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Projecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para editar el projecto
        </p>
        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl cursor-pointer transition-colors"
            to="/"
          >
            Volver a projecto
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Guardar cambios"
            className="bg-fuchsia-400 hover:bg-fuchsia-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
