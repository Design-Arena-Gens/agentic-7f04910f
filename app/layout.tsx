export const metadata = {
  title: 'Baby Song - Interactive',
  description: 'Baby, baby, don\'t you cry!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
