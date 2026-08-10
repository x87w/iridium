import Home from "./pages/home"
import MusicPlayer from "./components/player"
import Sidebar from "./components/sidebar"
import { PlayerProvider } from "./components/context"
import { UiProvider } from "./components/ui"
import MainContent from "./components/main"

export default function Page() {
    return (
        <main className="min-h-screen bg-black text-white">
            <PlayerProvider>
                <UiProvider>
                    <Sidebar />

                    <MainContent>
                        <Home />
                    </MainContent>

                    <MusicPlayer />
                </UiProvider>
            </PlayerProvider>
        </main>
    )
}