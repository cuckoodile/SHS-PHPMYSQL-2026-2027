import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-slate-950 text-white text-6xl min-h-screen flex flex-col">
      <Header />

      <main className="bg-slate-900 p-3 flex-1 pt-18">
        {/* <Dashboard /> */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
