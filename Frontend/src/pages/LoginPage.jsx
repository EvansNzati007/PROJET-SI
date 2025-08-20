import logo from '../assets/Certificate.png'

export default function LoginPage() {
  return (
    <section className='px-4 h-screen bg-amber-200'>
        <header className='flex justify-between'>
            <div>
                <h1>ESGIS</h1>
                <img src={logo} alt="Logo certificat" className='w-[40px]' />
            </div>
            <div className='flex items-center gap-3'>
                <p className='text-[#fe0503] font-bold'>Avez-vous un compte ?</p>
                <button className='bg-[#fe0503] px-2 text-white rounded-sm'>S'inscrire</button>
            </div>
        </header>
        <div className="flex justify-between border-1">
            <div className='w-1/2 bg-black text-red-200'>
            
            </div>
            <div className='w-1/2'>droit</div>
        </div>
    </section>
  )
}