import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// если вынесешь JSON в отдельный файл:
// import { universities } from "../data/universities";
// Вариант: просто вставь сюда свой массив из сообщения вместо []
import universities from "../constant/universites.json";
import { useCompare } from "../store/compareSlice.tsx";
import UniversityAiAgent from "../UniversityAiAgent";
import { X } from "lucide-react";

// Базовый тип, выводимый из JSON
type RawUniversity = (typeof universities)[number];

// Расширяем тип, чтобы явно указать новое поле internationalPartners
type University = RawUniversity & {
    internationalPartners?: string | string[] | null;
};

const MAX_SELECTED = 4;

export default function ComparePage() {
    const { compareState, toggleUniversityId, setSelectedUniversityIds } = useCompare();
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    // Инициализация: если нет выбранных, выбираем первые 3 по умолчанию
    useEffect(() => {
        if (compareState.selectedUniversityIds.length === 0) {
            const defaultIds = universities.slice(0, 3).map((u) => String(u.id));
            setSelectedUniversityIds(defaultIds);
        }
    }, [compareState.selectedUniversityIds.length, setSelectedUniversityIds]);

    const toggleUniversity = (id: number) => {
        const idString = String(id);
        const currentIds = compareState.selectedUniversityIds;

        // Проверка лимита при добавлении
        if (!currentIds.includes(idString) && currentIds.length >= MAX_SELECTED) {
            return; // лимит достигнут
        }

        toggleUniversityId(idString);
    };

    // Конвертируем строковые ID обратно в числа для фильтрации
    const selectedIds = compareState.selectedUniversityIds.map((id) => Number(id));
    const selected: University[] = (universities as RawUniversity[]).filter((u) =>
        selectedIds.includes(u.id)
    ) as University[];

    // Нормализует поле internationalPartners (поддержка string или array)
    function getInternationalPartnersList(raw: unknown): string[] {
        if (Array.isArray(raw)) {
            return raw.map((s) => String(s).trim()).filter(Boolean);
        }
        if (typeof raw === "string" && raw.trim()) {
            return raw
                .split(/[,;]+/)
                .map((s) => s.trim())
                .filter(Boolean);
        }
        return [];
    }

    function getInternationalPartnersDisplay(u: University): string {
        const list = getInternationalPartnersList(u.internationalPartners);
        if (list.length === 0) return "-";
        if (list.length <= 3) return list.join(", ");
        return list.slice(0, 3).join(", ") + " и др.";
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Sticky кнопка AI */}
                <button
                    onClick={() => setIsAssistantOpen(true)}
                    className="fixed bottom-6 right-[14px] z-40 flex items-center gap-1.5 bg-[#6bd6d4] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#5cc6c3] transition shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Спросить AI
                </button>

                {/* Заголовок */}
                <header className="mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Сравнение университетов
                        </h1>
                        <p className="text-gray-600">
                            Выбери до {MAX_SELECTED} университетов для сравнения по ключевым
                            параметрам: город, год основания, уровень, студенты, трудоустройство,
                            проходной балл, стоимость обучения и др.
                        </p>
                    </div>
                </header>

                {/* Выбор университетов */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Выберите университеты для сравнения
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {universities.map((uRaw) => {
                            const u = uRaw as University;
                            const isActive = selectedIds.includes(u.id);
                            return (
                                <button
                                    key={u.id}
                                    type="button"
                                    onClick={() => toggleUniversity(u.id)}
                                    className={[
                                        "px-3 py-1.5 rounded-full text-sm border transition",
                                        isActive
                                            ? "bg-[#6bd6d4] text-white border-[#6bd6d4] shadow"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                                    ].join(" ")}
                                >
                                    {u.name}
                                </button>
                            );
                        })}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        Выбрано: {selectedIds.length} / {MAX_SELECTED}
                    </p>
                </section>

                {/* Если мало выбранных */}
                {selected.length < 2 && (
                    <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 text-gray-600 text-sm">
                        Выберите минимум два университета, чтобы увидеть таблицу сравнения.
                    </div>
                )}

                {/* Таблица сравнения */}
                {selected.length >= 2 && (
                    <section className="bg-white rounded-2xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left text-xs md:text-sm font-semibold text-gray-700 px-4 py-3 border-b w-48">
                                        Параметр
                                    </th>
                                    {selected.map((u) => (
                                        <th
                                            key={u.id}
                                            className="text-left text-xs md:text-sm font-semibold text-gray-800 px-4 py-3 border-b min-w-[180px]"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span>{u.name}</span>
                                                <span className="text-xs text-gray-500">
                            {u.city}
                          </span>
                                                <Link
                                                    to={`/universities/${u.id}`}
                                                    className="text-xs text-[#6bd6d4] hover:underline"
                                                >
                                                    Открыть профиль
                                                </Link>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="text-xs md:text-sm">
                                {/* Город / локация */}
                                <TableRow label="Город">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>{u.city}</Cell>
                                    ))}
                                </TableRow>

                                <TableRow label="Локация">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>{u.location || "-"}</Cell>
                                    ))}
                                </TableRow>

                                {/* Год основания */}
                                <TableRow label="Основан">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>
                                            {u.foundedYear ? `${u.foundedYear} г.` : "-"}
                                        </Cell>
                                    ))}
                                </TableRow>

                                {/* Уровень университета */}
                                <TableRow label="Статус / уровень">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>{u.universityLevel || "-"}</Cell>
                                    ))}
                                </TableRow>

                                {/* Основное направление */}
                                <TableRow label="Основное направление">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>{u.direction || "-"}</Cell>
                                    ))}
                                </TableRow>

                                {/* Студенты */}
                                <TableRow label="Число студентов (≈)">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>
                                            {typeof u.studentCount === "number"
                                                ? u.studentCount.toLocaleString("ru-RU")
                                                : "-"}
                                        </Cell>
                                    ))}
                                </TableRow>

                                {/* Трудоустройство */}
                                <TableRow label="Трудоустройство выпускников">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>
                                            {typeof u.employmentRate === "number"
                                                ? `${u.employmentRate}%`
                                                : "-"}
                                        </Cell>
                                    ))}
                                </TableRow>

                                {/* Проходной балл */}
                                <TableRow label="Проходной балл ЕНТ (описание)">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>{u.passingScore || "-"}</Cell>
                                    ))}
                                </TableRow>

                                {/* Стоимость обучения */}
                                <TableRow label="Стоимость обучения (описание)">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>{u.tuitionPerYear || "-"}</Cell>
                                    ))}
                                </TableRow>

                                {/* Факультеты (кратко) */}
                                <TableRow label="Примеры факультетов / школ">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>
                                            {u.faculties && u.faculties.length > 0
                                                ? u.faculties.slice(0, 3).join(", ") +
                                                (u.faculties.length > 3 ? " и др." : "")
                                                : "-"}
                                        </Cell>
                                    ))}
                                </TableRow>

                                {/* Отраслевые партнёрства (раньше "Партнёрства / международка") */}
                                <TableRow label="Отраслевые партнёрства">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>
                                            {u.partnerships && u.partnerships.length > 0
                                                ? u.partnerships[0]
                                                : "-"}
                                        </Cell>
                                    ))}
                                </TableRow>

                                {/* Международные партнёры (новое поле) */}
                                <TableRow label="Международные партнёры">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>
                                            {getInternationalPartnersDisplay(u)}
                                        </Cell>
                                    ))}
                                </TableRow>

                                {/* Сайт */}
                                <TableRow label="Сайт">
                                    {selected.map((u) => (
                                        <Cell key={u.id}>
                                            {u.websiteUrl ? (
                                                <a
                                                    href={u.websiteUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[#6bd6d4] hover:underline"
                                                >
                                                    Открыть
                                                </a>
                                            ) : (
                                                "-"
                                            )}
                                        </Cell>
                                    ))}
                                </TableRow>
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Модальное окно ассистента */}
                {isAssistantOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsAssistantOpen(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Заголовок модалки */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">AI-ассистент по университетам</h2>
                                <button
                                    onClick={() => setIsAssistantOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition"
                                    aria-label="Закрыть"
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            {/* Контент модалки */}
                            <div className="overflow-y-auto flex-1 p-6">
                                <UniversityAiAgent selectedIds={selectedIds.length > 0 ? selectedIds : undefined} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Вспомогательные компоненты для читаемости

function TableRow({
                      label,
                      children,
                  }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <tr className="odd:bg-white even:bg-gray-50">
            <th className="align-top text-left font-semibold text-gray-700 px-4 py-3 border-t w-48">
                {label}
            </th>
            {children}
        </tr>
    );
}

function Cell({ children }: { children: React.ReactNode }) {
    return <td className="align-top px-4 py-3 border-t text-gray-700">{children}</td>;
}