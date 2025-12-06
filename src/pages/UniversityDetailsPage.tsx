import { Link, useParams } from "react-router-dom";
import {
    Award,
    MapPin,
    Calendar,
    GraduationCap,
    Globe,
    Users,
} from "lucide-react";
import universitiesData from "../constant/universites.json";

type University = (typeof universitiesData)[number];

export default function UniversityDetailsPage() {
    const { id } = useParams();
    const universityId = Number(id);

    const university: University | undefined = universitiesData.find(
        (u) => u.id === universityId
    );

    if (!university) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-md p-8 max-w-lg w-full text-center">
                    <h1 className="text-2xl font-bold mb-3 text-gray-900">
                        Университет не найден
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Возможно, вы перешли по устаревшей ссылке или такого университета
                        пока нет в базе.
                    </p>
                    <Link
                        to="/universities"
                        className="inline-block px-6 py-3 bg-[#5dc7c5] text-white font-semibold rounded-xl hover:bg-[#4db5b3] transition"
                    >
                        Вернуться к списку университетов
                    </Link>
                </div>
            </div>
        );
    }

    const {
        name,
        city,
        location,
        foundedYear,
        universityLevel,
        direction,
        description,
        achievements,
        passingScore,
        studentCount,
        employmentRate,
        tuitionPerYear,
        faculties,
        websiteUrl,
        coverImageUrl,
        partnerships,
        tour3dUrl,
        internationalPartners,
    } = university;

    // Приведём internationalPartners к списку строк, если это строка с перечислением
    let internationalPartnersList: string[] | null = null;
    if (Array.isArray(internationalPartners)) {
        internationalPartnersList = internationalPartners.map((s) =>
            String(s).trim()
        ).filter(Boolean);
    } else if (typeof internationalPartners === "string" && internationalPartners.trim()) {
        // Разделяем по запятым или точке с запятой, чтобы поддержать перечисления
        internationalPartnersList = internationalPartners
            .split(/[,;]+/)
            .map((s) => s.trim())
            .filter(Boolean);
    }

    const cover =
        coverImageUrl ||
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop";

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
                {/* Картинка + название */}
                <div className="relative h-72 w-full overflow-hidden">
                    <img
                        src={cover}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
                <span className="inline-flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4 text-[#5dc7c5]" />
                    {location || city}
                </span>
                                {universityLevel && (
                                    <span className="inline-flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full">
                    <Award className="w-4 h-4 text-[#5dc7c5]" />
                                        {universityLevel}
                  </span>
                                )}
                            </div>
                        </div>

                        {websiteUrl && (
                            <a
                                href={websiteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2.5 bg-[#5dc7c5] text-white text-sm font-semibold rounded-xl shadow-md hover:bg-[#4db5b3] transition"
                            >
                                Официальный сайт
                            </a>
                        )}
                    </div>
                </div>

                {/* Контент */}
                <div className="p-8 md:p-10 space-y-10">
                    {/* Общая инфа */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                            <GraduationCap className="text-[#5dc7c5]" />
                            Общая информация
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
                            {foundedYear && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#5dc7c5]" />
                                    <span>
                    Основан: <strong>{foundedYear} год</strong>
                  </span>
                                </div>
                            )}

                            {direction && (
                                <div className="flex items-start gap-2">
                                    <Globe className="w-5 h-5 text-[#5dc7c5] mt-0.5" />
                                    <span>{direction}</span>
                                </div>
                            )}

                            {typeof studentCount === "number" && (
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#5dc7c5]" />
                                    <span>
                    Студентов:{" "}
                                        <strong>
                      {studentCount.toLocaleString("ru-RU")}+
                    </strong>
                  </span>
                                </div>
                            )}

                            {typeof employmentRate === "number" && (
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-[#5dc7c5]" />
                                    <span>
                    Трудоустройство:{" "}
                                        <strong>{employmentRate}% выпускников</strong>
                  </span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Описание */}
                    {description && (
                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-gray-900">
                                Описание
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                                {description}
                            </p>
                        </section>
                    )}

                    {/* Достижения */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                                <Award className="text-[#5dc7c5]" />
                                Достижения
                            </h2>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm md:text-base">
                                {achievements.map((a, idx) => (
                                    <li key={idx}>{a}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Метрики */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">
                            Ключевые показатели
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {passingScore && (
                                <div className="bg-[#5dc7c5] text-white rounded-xl p-5 shadow-md">
                                    <p className="text-sm uppercase tracking-wide mb-1">
                                        Проходной балл ЕНТ
                                    </p>
                                    <p className="text-base">{passingScore}</p>
                                </div>
                            )}

                            {tuitionPerYear && (
                                <div className="bg-[#5dc7c5] text-white rounded-xl p-5 shadow-md">
                                    <p className="text-sm uppercase tracking-wide mb-1">
                                        Стоимость обучения
                                    </p>
                                    <p className="text-base">{tuitionPerYear}</p>
                                </div>
                            )}

                            {typeof employmentRate === "number" && (
                                <div className="bg-[#5dc7c5] text-white rounded-xl p-5 shadow-md">
                                    <p className="text-sm uppercase tracking-wide mb-1">
                                        Трудоустройство
                                    </p>
                                    <p className="text-2xl font-bold">{employmentRate}%</p>
                                    <p className="text-xs mt-1 opacity-90">
                                        доля выпускников, нашедших работу по специальности
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Факультеты */}
                    {faculties && faculties.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-gray-900">
                                Факультеты и школы
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm md:text-base">
                                {faculties.map((f, idx) => (
                                    <li
                                        key={idx}
                                        className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
                                    >
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Партнёры */}
                    {partnerships && partnerships.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-gray-900">
                                Партнёрства и сотрудничество
                            </h2>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm md:text-base">
                                {partnerships.map((p, idx) => (
                                    <li key={idx}>{p}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Международные партнёры (новое поле) */}
                    {internationalPartnersList && internationalPartnersList.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                                <Globe className="text-[#5dc7c5]" />
                                Международные партнёры
                            </h2>

                            {/* Если это один элемент — просто выводим в абзаце, иначе — список */}
                            {internationalPartnersList.length === 1 ? (
                                <p className="text-gray-700 text-sm md:text-base">
                                    {internationalPartnersList[0]}
                                </p>
                            ) : (
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm md:text-base">
                                    {internationalPartnersList.map((p, idx) => (
                                        <li
                                            key={idx}
                                            className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
                                        >
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    )}

                    {/* 3D-тур по кампусу */}
                    <section className="mt-10 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">
                            3D-тур по кампусу
                        </h2>
                        {tour3dUrl ? (
                            <>
                                <div className="w-full max-w-[800px] h-[600px] md:h-[800px] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-black/10">
                                    <iframe
                                        src={tour3dUrl}
                                        title="3D-тур кампуса"
                                        className="w-full h-full"
                                        loading="lazy"
                                        allowFullScreen
                                        allow="xr-spatial-tracking; gyroscope; accelerometer"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="w-full max-w-[800px] h-[600px] md:h-[800px] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-gray-100 flex items-center justify-center">
                                <div className="text-center px-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-base md:text-lg font-medium">
                                        3D-тур пока недоступен
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Интерактивный тур по кампусу будет добавлен в ближайшее время
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Кнопки внизу */}
                    <section className="flex flex-wrap gap-4 justify-center pt-4">
                        <button className="px-8 py-3 bg-[#5dc7c5] text-white text-sm md:text-base font-semibold rounded-2xl shadow-md hover:bg-[#4db5b3] hover:shadow-lg transition-all">
                            Добавить к сравнению
                        </button>
                        <Link
                            to="/compare"
                            className="px-8 py-3 border border-[#5dc7c5] text-[#5dc7c5] text-sm md:text-base font-semibold rounded-2xl hover:bg-[#5dc7c5] hover:text-white transition-all"
                        >
                            Перейти к сравнению
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
}