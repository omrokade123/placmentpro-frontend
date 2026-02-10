export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex bg-black text-white items-center justify-center">

        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold">
            PlacementPro 🚀
          </h1>

          <p className="text-gray-300 text-lg">
            Crack placements with AI-powered practice,
            adaptive tests, and real interview insights.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-50">
        {children}
      </div>

    </div>
  );
}
