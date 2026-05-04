export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-[#E8F4FD] px-4 py-14 font-sans">
      <section className="text-center mb-16">
        <h1 className="text-7xl font-black text-[#111827]">Favorites</h1>
        <p className="mt-6 text-2xl text-[#334155]">Your saved restaurants</p>
      </section>

      <div className="w-full max-w-5xl mx-auto bg-white rounded-[30px] shadow-xl p-10">
        <h2 className="text-3xl font-black mb-8">❤️ Saved Places</h2>
        <div className="text-lg text-gray-500">
          No favorites yet — start exploring!
        </div>
      </div>
    </main>
  )
}