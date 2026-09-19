import "./globals.css"

export const metadata = {
  Sample Message
  description: "Sample Message",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
