import { Link } from "react-router-dom";


export default function DasboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis Projectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Maneja y Administra tus Projectos</p>

      <nav className="my-5">
        
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl cursor-pointer transition-colors"
          to='/projects/create'
        >
          Nuevo Projecto
        </Link>

      </nav>
    </>
  )
}
