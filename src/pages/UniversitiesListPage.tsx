import { Link } from "react-router-dom";
import { MapPin, GraduationCap, Award } from "lucide-react";

// Дефолтная картинка
const defaultImage =
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop";

// Мок-данные
const allUniversities = [
    { id: 1, name: "Астана IT University", city: "Астана", image: "https://avatars.mds.yandex.net/i?id=bc58b2ab5e7a7728e79d53d89499f8b26c8da2e7-4872489-images-thumbs&n=13" },
    { id: 2, name: "КБТУ (KBTU)", city: "Алматы", image: "/KBTU.webp" },
    { id: 3, name: "МУИТ (IITU)", city: "Алматы", image: "https://the-tech.kz/wp-content/uploads/2023/10/1200px-zdanie_mezhdunarodnogo_universiteta_informaczionnyh_tehnologij.jpeg" },
    { id: 4, name: "КазНУ им. аль-Фараби", city: "Алматы", image: "/KazNu.webp" },
    { id: 5, name: "ЕНУ им. Л.Н. Гумилёва", city: "Астана", image: "/ENU.webp" },
    { id: 6, name: "Satbayev University", city: "Алматы", image: "/Satbayev.webp" },
    { id: 7, name: "АУЭС", city: "Алматы", image: "https://dixinews.kz/wp-content/uploads/2024/09/800x600.webp" },
    { id: 8, name: "Каспийский университет", city: "Алматы", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7p4BVEylb65DgAfYwCdxXEPMzbwJEQ621mQ&s" },
    { id: 9, name: "С.Сейфуллин КазАТУ", city: "Астана", image: "https://avatars.mds.yandex.net/i?id=863d276b6ed6b6df26772ac4e010a9f37cc40a8d-5231753-images-thumbs&n=13" },
    { id: 10, name: "Карагандинский технический университет", city: "Караганда", image: "https://qaragandy.ru/upload/000/u1/4/f/karagandinskii-tehnicheskii-universitet-im-a-saginova-photo-place-images.webp" },
    { id: 12, name: "Университет Нархоз", city: "Алматы", image: "https://backend.narxozedu.kz/uploads/February2025/003cdf57-b459-4cfc-a92c-9065541fbf07.webp" },
    { id: 13, name: "KIMEP University", city: "Алматы", image: "https://erasmusmundus-ceeres.eu/wp-content/uploads/2024/09/CEERES002-1.webp" },
];

// Фильтруем только университеты с изображениями
const universities = allUniversities.filter(u => u.image !== defaultImage);

export default function UniversitiesListPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Заголовок */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5dc7c5] rounded-full mb-4 shadow-lg">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Университеты Казахстана
                    </h1>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Выберите университет, чтобы посмотреть подробную информацию, историю, достижения и параметры сравнения
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Award className="w-4 h-4" />
                        <span>{universities.length} университетов с фотографиями</span>
                    </div>
                </div>

                {/* Grid карточек */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {universities.map((u) => (
                        <Link
                            key={u.id}
                            to={`/universities/${u.id}`}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                        >
                            {/* Фото */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <img
                                    src={u.image}
                                    alt={u.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Оверлей */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Город */}
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                                    <MapPin className="w-3.5 h-3.5 text-[#5dc7c5]" />
                                    <span className="text-xs font-medium text-gray-700">{u.city}</span>
                                </div>
                            </div>

                            {/* Информация */}
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#5dc7c5] transition-colors">
                                    {u.name}
                                </h2>

                                {/* Кнопка */}
                                <div>
                                    <span className="inline-flex items-center gap-2 bg-[#5dc7c5] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-[#4db5b3] transition-all">
                                        Подробнее
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Низ страницы */}
                <div className="mt-16 text-center text-gray-400 text-sm">
                    Больше университетов скоро
                </div>
            </div>
        </div>
    );
}
