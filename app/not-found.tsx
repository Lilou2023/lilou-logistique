import Link from 'next/link'

export const metadata = {
  title: 'Page non trouvée',
}

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold">Page non trouvée</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
        Désolé, nous n’avons pas pu trouver la page demandée.
      </p>
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Retour à l’accueil
      </Link>
    </main>
  )
}
