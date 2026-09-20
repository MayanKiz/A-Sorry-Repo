import "./globals.css"

export const metadata = {
  title: "Project Interface",
  description: "Sample Message",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
