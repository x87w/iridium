import Home from "./pages/home"
import MusicPlayer from "./components/player"
import Sidebar from "./components/sidebar"

export default function Page() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Sidebar />

            <div className="ml-0 p-8 lg:ml-[280px]">
                <Home />
            </div>

            <MusicPlayer />
        </main>
    )
}