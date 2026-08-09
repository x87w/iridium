import Home from "./pages/home"
import MusicPlayer from "./components/player"
import Sidebar from "./components/sidebar"
import { PlayerProvider } from "./components/context"

export default function Page() {
    return (
        <main className="min-h-screen bg-black text-white">
            <PlayerProvider>
                <Sidebar />

                <div className="ml-0 px-3 pt-3 lg:ml-[280px] lg:px-8">
                    <Home />
                </div>

                <MusicPlayer />
            </PlayerProvider>
        </main>
    )
}