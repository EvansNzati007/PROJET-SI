import logo from '../assets/logo/Certificate.png'

export default function Navigation() {
  return (
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
  )
}