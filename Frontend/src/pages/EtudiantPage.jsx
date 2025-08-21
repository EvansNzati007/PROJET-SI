import Layout from "../components/Layout";
import Absences from "../components/Absences";
import Header from "../components/Header";
import Navigation from "../components/Navigation";


export default function EtudiantPage() {
    return (
        <Layout 
            sidebar={<Navigation />}
            header={<Header />}
            page={<Absences />}
        />
    )
}