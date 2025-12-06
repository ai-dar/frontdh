import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Block */}
      <section className="bg-[#5dc7c5] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Сравнивай университеты легко и удобно
          </h1>

          <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
            Наш сервис позволяет быстро находить университеты, изучать их историю,
            достижения и ключевые параметры — проходные баллы, стоимость обучения,
            рейтинги и многое другое. Построй своё идеальное сравнение и выбирай лучшее!
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              to="/universities"
              className="bg-white text-[#5dc7c5] font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
            >
              Начать поиск
            </Link>

            <Link
              to="/compare"
              className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#5dc7c5] transition"
            >
              Сравнить университеты
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="py-20 px-6 bg-gray-50 flex-1">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14 text-gray-800">
            Что может наш сервис
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-[#5dc7c5]">Поиск университетов</h3>
              <p className="text-gray-600">
                Ищи университеты по стране, городу, направлению, рейтингу и другим параметрам.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-[#5dc7c5]">Подробные профили</h3>
              <p className="text-gray-600">
                Изучай историю, достижения, статистику поступлений, стоимость обучения и карьерные результаты выпускников.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-[#5dc7c5]">Умное сравнение</h3>
              <p className="text-gray-600">
                Сравнивай несколько университетов по ключевым метрикам в удобной и понятной таблице.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#5dc7c5] text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Готов выбрать лучший университет?
        </h2>
        <p className="text-lg md:text-xl opacity-90">
          Исследуй, анализируй и сравнивай — всё в одном месте.
        </p>

        <Link
          to="/universities"
          className="mt-8 inline-block bg-white text-[#5dc7c5] font-semibold px-10 py-4 rounded-full shadow hover:bg-gray-100 transition"
        >
          Перейти к списку университетов →
        </Link>
      </section>

    </div>
  );
}
