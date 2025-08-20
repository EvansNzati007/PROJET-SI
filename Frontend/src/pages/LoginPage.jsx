import logo from "../assets/logo/Certificate.png";
import image from "../assets/images/IMG_2243.jpeg";

export default function LoginPage() {
  document.title = "Se connecter";
  return (
    <section className="flex flex-col relative px-4 h-screen">
      <header className="flex justify-between">
        <div className="flex py-4">
          <p className="text-[#fe0503] text-3xl">ESGIS</p>
          <img src={logo} alt="Logo certificat" className="w-[40px]" />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[#fe0503] font-bold">Avez-vous un compte ?</p>
          <button className="bg-[#fe0503] btn btn-md text-white text-lg hover:bg-white hover:text-[#fe0503] border-[#fe0503]">
            S'inscrire
          </button>
        </div>
      </header>

      <div className="flex justify-between h-[88%] ">
        <div className="w-1/2 bg-black text-red-200">
			<img 
			src={image} 
			alt="Deux étudiants en face d'un ordinateur" 
			className="h-full object-cover"
			/>
		</div>

        {/* Formulaire */}
        <div className="w-1/2 flex flex-col items-center">
			<div className="flex border-2 border-l-8 border-[#fe0503] py-5 px-2 mt-20 mb-15">
				<h3 className="text-4xl font-bold">Connectez-vous à votre compte</h3>
			</div>

			<form action=""
			className="flex flex-col items-center gap-5 w-lg"
			>
				<label className="input validator">
				<svg
					className="h-[1em] opacity-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<g
					strokeLinejoin="round"
					strokeLinecap="round"
					strokeWidth="2.5"
					fill="none"
					stroke="currentColor"
					>
					<rect width="20" height="16" x="2" y="4" rx="2"></rect>
					<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
					</g>
				</svg>
				<input type="email" placeholder="mail@site.com" required />
				</label>
				<div className="validator-hint hidden">
				Enter valid email address
				</div>

				<label className="input validator">
				<svg
					className="h-[1em] opacity-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<g
					strokeLinejoin="round"
					strokeLinecap="round"
					strokeWidth="2.5"
					fill="none"
					stroke="currentColor"
					>
					<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
					<circle
						cx="16.5"
						cy="7.5"
						r=".5"
						fill="currentColor"
					></circle>
					</g>
				</svg>
				<input
					type="password"
					required
					placeholder="Password"
					minlength="8"
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
				/>
				</label>
				<p className="validator-hint hidden">
				Must be more than 8 characters, including
				<br />
				At least one number <br />
				At least one lowercase letter <br />
				At least one uppercase letter
				</p>
				<div className="flex justify-center">
					<button className="bg-[#fe0503] text-white btn btn-md hover:bg-white
						hover:text-[#fe0503] border-[#fe0503]
					">Se connecter</button>
				</div>
			</form>
        </div>
      </div>
    </section>
  );
}
