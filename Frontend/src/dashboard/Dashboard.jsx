import image from '../assets/images/IMG_2243.jpeg'
import logo from '../assets/logo/Certificate.png'

export default function Dashboard() {
  return (
    <>
      <main className='p-4 relative h-screen flex flex-row gap-4 bg-base-300'>

        <section className='w-72 bg-base-100 shadow-sm rounded-md'>
            <div className='flex flex-col items-center py-4'>
                <img 
                    src={logo} 
                    alt="Logo certificat" 
                    className='w-40 bg-[#ffebeb] my-2.5 rounded-md'
                />
                <p className='text-center font-semibold'>Ecole Supérieur de Gestion d'Informatique et des Sciences</p>
            </div>
            <div className='border-1 border-gray-300'></div>
            <nav className='flex justify-center pt-2.5'>
                <ul className="menu gap-2 w-full [&_li>*]:rounded-none px-2.5">
                    <li className='bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white 
                        hover:border-[#fe0503] hover:rounded-md hover:border-1'><a className='hover:bg-white hover:rounded-md'>Tableau de bord</a></li>
                    <li className='bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white 
                        hover:border-[#fe0503] hover:rounded-md hover:border-1'><a className='hover:bg-white hover:rounded-md'>Profil</a></li>
                    <li className='bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white 
                        hover:border-[#fe0503] hover:rounded-md hover:border-1'><a className='hover:bg-white hover:rounded-md'>Emploie du temps</a></li>
                    <li className='bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white 
                        hover:border-[#fe0503] hover:rounded-md hover:border-1'><a className='hover:bg-white hover:rounded-md'>Absences</a></li>
                    <li className='bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white 
                        hover:border-[#fe0503] hover:rounded-md hover:border-1'><a className='hover:bg-white hover:rounded-md'>Messages</a></li>
                </ul>
            </nav>
        </section>
        <section className='flex flex-col flex-1 gap-y-4'>
            
            <header className="navbar bg-base-100 shadow-sm rounded-md">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                    >
                        {" "}
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                        ></path>{" "}
                    </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <p className="text-xl font-semibold">Tableau de bord</p>
                </div>
                <div className="dropdown dropdown-end">
                    <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                            alt="Tailwind CSS Navbar component"
                            src={image}
                            />
                        </div>
                    </div>
                    <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </header>

            <section className='bg-base-100 shadow-sm h-full rounded-md'>
                
            </section>
        </section>
      </main>
    </>
  );
}
