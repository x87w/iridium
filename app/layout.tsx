import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrains = JetBrains_Mono({
    variable: "--font-jetbrains",
    subsets: ["latin"]
})

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${jetbrains.variable} font-mono`}>
                {children}
            </body>
        </html>
    )
}