import Home from "./pages/home"
import MusicPlayer from "./components/player"
import Sidebar from "./components/music"

export default function Page() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Sidebar />

            <div className="ml-0 px-3 pt-3 lg:ml-[280px] lg:px-8">
                <Home />
            </div>

            <MusicPlayer />
        </main>
    )
}