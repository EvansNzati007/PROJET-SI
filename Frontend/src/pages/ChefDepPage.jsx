import NavigationAdmin from "../components/NavigationAdmin";
import Header from "../components/Header";
import AbsencesAdmin from "../components/AbsencesAdmin";
import Layout from "../components/Layout";

export default function ChefDepPage() {
    return (
        <Layout
            sidebar={<NavigationAdmin />}
            header={<Header />}
            page={<AbsencesAdmin />}
        />
    )
}