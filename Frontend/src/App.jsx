import './App.css'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      {/* <LoginPage /> */}
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Bienvenue 🚀</h2>
            <p>React + Tailwind v4 + DaisyUI fonctionne !</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Clique moi</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
