export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          🚚 Lilou Logistique
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Plateforme de gestion logistique intelligente et connectée
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">🔐 Sécurisé</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Authentification via NextAuth.js
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">⚡ Temps Réel</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Base de données Supabase
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">🤖 Intelligent</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Intégration OpenAI
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}