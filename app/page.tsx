import MusicPlayer from "./components/player"
import Sidebar from "./components/sidebar"

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Sidebar />

            <div className="ml-0 lg:ml-[280px]">
                <div className="p-8">
                </div>
            </div>

            <MusicPlayer />
        </main>
    )
}