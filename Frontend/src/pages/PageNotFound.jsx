import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen">
            <p className="text-4xl font-bold">Erreur 404 : Page not Found</p>
            <Link to="/">        
                <button className="btn btn-primary">Go Home</button>
            </Link>
        </div>
    )
}