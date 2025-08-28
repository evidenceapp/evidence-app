import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-5xl font-bold mb-4 text-yellow-600">404</h1>
      <p className="text-lg mb-6 text-gray-700">Página não encontrada.</p>
      <Link
        href="/"
        className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
