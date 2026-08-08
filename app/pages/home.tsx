export default function Home() {
    return (
        <div className="mb-3 flex justify-center">
            <div className="relative h-[770px] w-full max-w-[1400px] overflow-hidden rounded-[28px] border border-white/[0.14] bg-white/[0.055] shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-150">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-1/2 rounded-full bg-white/[0.04] blur-3xl" />

                <div className="relative p-8">
                    <h1 className="text-3xl font-bold text-white underline">
                        Home
                    </h1>
                </div>
            </div>
        </div>
    )
}