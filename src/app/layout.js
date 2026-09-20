import "./globals.css"

export const metadata = {
  title: "Interactive Friendship Story",
  description: "A guided interactive story for presenting a friendship message through multiple pages, animations, and a final appreciation flow.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
