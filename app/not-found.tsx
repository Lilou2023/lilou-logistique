export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-4">Oups ! Page introuvable</h1>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Désolé, cette page n’existe pas ou plus.
      </p>
      <a href="/" className="mt-4 text-blue-600 hover:underline">
        Retour à l’accueil
      </a>
    </main>
  )
}
