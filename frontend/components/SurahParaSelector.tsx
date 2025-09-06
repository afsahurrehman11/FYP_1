import React, { useState } from "react";

// Surah type
type Surah = {
    id: number;
    name: string;
    arabic: string;
    verses: number;
    type: "Meccan" | "Medinan";
};

// Para type
type Para = {
    id: number;
    name: string;
};

// ---------------- Surahs ----------------
const surahs: Surah[] = [
    { id: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, type: "Meccan" },
    { id: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, type: "Medinan" },
    { id: 3, name: "Ali 'Imran", arabic: "آل عمران", verses: 200, type: "Medinan" },
    { id: 4, name: "An-Nisa", arabic: "النساء", verses: 176, type: "Medinan" },
    { id: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120, type: "Medinan" },
    { id: 6, name: "Al-An'am", arabic: "الأنعام", verses: 165, type: "Meccan" },
    { id: 7, name: "Al-A'raf", arabic: "الأعراف", verses: 206, type: "Meccan" },
    { id: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75, type: "Medinan" },
    { id: 9, name: "At-Tawbah", arabic: "التوبة", verses: 129, type: "Medinan" },
    { id: 10, name: "Yunus", arabic: "يونس", verses: 109, type: "Meccan" },
    { id: 11, name: "Hud", arabic: "هود", verses: 123, type: "Meccan" },
    { id: 12, name: "Yusuf", arabic: "يوسف", verses: 111, type: "Meccan" },
    { id: 13, name: "Ar-Ra'd", arabic: "الرعد", verses: 43, type: "Medinan" },
    { id: 14, name: "Ibrahim", arabic: "ابراهيم", verses: 52, type: "Meccan" },
    { id: 15, name: "Al-Hijr", arabic: "الحجر", verses: 99, type: "Meccan" },
    { id: 16, name: "An-Nahl", arabic: "النحل", verses: 128, type: "Meccan" },
    { id: 17, name: "Al-Isra", arabic: "الإسراء", verses: 111, type: "Meccan" },
    { id: 18, name: "Al-Kahf", arabic: "الكهف", verses: 110, type: "Meccan" },
    { id: 19, name: "Maryam", arabic: "مريم", verses: 98, type: "Meccan" },
    { id: 20, name: "Ta-Ha", arabic: "طه", verses: 135, type: "Meccan" },
    { id: 21, name: "Al-Anbiya", arabic: "الأنبياء", verses: 112, type: "Meccan" },
    { id: 22, name: "Al-Hajj", arabic: "الحج", verses: 78, type: "Medinan" },
    { id: 23, name: "Al-Mu'minun", arabic: "المؤمنون", verses: 118, type: "Meccan" },
    { id: 24, name: "An-Nur", arabic: "النور", verses: 64, type: "Medinan" },
    { id: 25, name: "Al-Furqan", arabic: "الفرقان", verses: 77, type: "Meccan" },
    { id: 26, name: "Ash-Shu'ara", arabic: "الشعراء", verses: 227, type: "Meccan" },
    { id: 27, name: "An-Naml", arabic: "النمل", verses: 93, type: "Meccan" },
    { id: 28, name: "Al-Qasas", arabic: "القصص", verses: 88, type: "Meccan" },
    { id: 29, name: "Al-Ankabut", arabic: "العنكبوت", verses: 69, type: "Meccan" },
    { id: 30, name: "Ar-Rum", arabic: "الروم", verses: 60, type: "Meccan" },
    { id: 31, name: "Luqman", arabic: "لقمان", verses: 34, type: "Meccan" },
    { id: 32, name: "As-Sajda", arabic: "السجدة", verses: 30, type: "Meccan" },
    { id: 33, name: "Al-Ahzab", arabic: "الأحزاب", verses: 73, type: "Medinan" },
    { id: 34, name: "Saba", arabic: "سبإ", verses: 54, type: "Meccan" },
    { id: 35, name: "Fatir", arabic: "فاطر", verses: 45, type: "Meccan" },
    { id: 36, name: "Ya-Sin", arabic: "يس", verses: 83, type: "Meccan" },
    { id: 37, name: "As-Saffat", arabic: "الصافات", verses: 182, type: "Meccan" },
    { id: 38, name: "Sad", arabic: "ص", verses: 88, type: "Meccan" },
    { id: 39, name: "Az-Zumar", arabic: "الزمر", verses: 75, type: "Meccan" },
    { id: 40, name: "Ghafir", arabic: "غافر", verses: 85, type: "Meccan" },
    { id: 41, name: "Fussilat", arabic: "فصلت", verses: 54, type: "Meccan" },
    { id: 42, name: "Ash-Shura", arabic: "الشورى", verses: 53, type: "Meccan" },
    { id: 43, name: "Az-Zukhruf", arabic: "الزخرف", verses: 89, type: "Meccan" },
    { id: 44, name: "Ad-Dukhan", arabic: "الدخان", verses: 59, type: "Meccan" },
    { id: 45, name: "Al-Jathiya", arabic: "الجاثية", verses: 37, type: "Meccan" },
    { id: 46, name: "Al-Ahqaf", arabic: "الأحقاف", verses: 35, type: "Meccan" },
    { id: 47, name: "Muhammad", arabic: "محمد", verses: 38, type: "Medinan" },
    { id: 48, name: "Al-Fath", arabic: "الفتح", verses: 29, type: "Medinan" },
    { id: 49, name: "Al-Hujurat", arabic: "الحجرات", verses: 18, type: "Medinan" },
    { id: 50, name: "Qaf", arabic: "ق", verses: 45, type: "Meccan" },
    { id: 51, name: "Adh-Dhariyat", arabic: "الذاريات", verses: 60, type: "Meccan" },
    { id: 52, name: "At-Tur", arabic: "الطور", verses: 49, type: "Meccan" },
    { id: 53, name: "An-Najm", arabic: "النجم", verses: 62, type: "Meccan" },
    { id: 54, name: "Al-Qamar", arabic: "القمر", verses: 55, type: "Meccan" },
    { id: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78, type: "Medinan" },
    { id: 56, name: "Al-Waqia", arabic: "الواقعة", verses: 96, type: "Meccan" },
    { id: 57, name: "Al-Hadid", arabic: "الحديد", verses: 29, type: "Medinan" },
    { id: 58, name: "Al-Mujadila", arabic: "المجادلة", verses: 22, type: "Medinan" },
    { id: 59, name: "Al-Hashr", arabic: "الحشر", verses: 24, type: "Medinan" },
    { id: 60, name: "Al-Mumtahina", arabic: "الممتحنة", verses: 13, type: "Medinan" },
    { id: 61, name: "As-Saff", arabic: "الصف", verses: 14, type: "Medinan" },
    { id: 62, name: "Al-Jumu'a", arabic: "الجمعة", verses: 11, type: "Medinan" },
    { id: 63, name: "Al-Munafiqun", arabic: "المنافقون", verses: 11, type: "Medinan" },
    { id: 64, name: "At-Taghabun", arabic: "التغابن", verses: 18, type: "Medinan" },
    { id: 65, name: "At-Talaq", arabic: "الطلاق", verses: 12, type: "Medinan" },
    { id: 66, name: "At-Tahrim", arabic: "التحريم", verses: 12, type: "Medinan" },
    { id: 67, name: "Al-Mulk", arabic: "الملك", verses: 30, type: "Meccan" },
    { id: 68, name: "Al-Qalam", arabic: "القلم", verses: 52, type: "Meccan" },
    { id: 69, name: "Al-Haqqa", arabic: "الحاقة", verses: 52, type: "Meccan" },
    { id: 70, name: "Al-Ma'arij", arabic: "المعارج", verses: 44, type: "Meccan" },
    { id: 71, name: "Nuh", arabic: "نوح", verses: 28, type: "Meccan" },
    { id: 72, name: "Al-Jinn", arabic: "الجن", verses: 28, type: "Meccan" },
    { id: 73, name: "Al-Muzzammil", arabic: "المزمل", verses: 20, type: "Meccan" },
    { id: 74, name: "Al-Muddathir", arabic: "المدثر", verses: 56, type: "Meccan" },
    { id: 75, name: "Al-Qiyama", arabic: "القيامة", verses: 40, type: "Meccan" },
    { id: 76, name: "Al-Insan", arabic: "الانسان", verses: 31, type: "Medinan" },
    { id: 77, name: "Al-Mursalat", arabic: "المرسلات", verses: 50, type: "Meccan" },
    { id: 78, name: "An-Naba", arabic: "النبإ", verses: 40, type: "Meccan" },
    { id: 79, name: "An-Nazi'at", arabic: "النازعات", verses: 46, type: "Meccan" },
    { id: 80, name: "Abasa", arabic: "عبس", verses: 42, type: "Meccan" },
    { id: 81, name: "At-Takwir", arabic: "التكوير", verses: 29, type: "Meccan" },
    { id: 82, name: "Al-Infitar", arabic: "الإنفطار", verses: 19, type: "Meccan" },
    { id: 83, name: "Al-Mutaffifin", arabic: "المطففين", verses: 36, type: "Meccan" },
    { id: 84, name: "Al-Inshiqaq", arabic: "الإنشقاق", verses: 25, type: "Meccan" },
    { id: 85, name: "Al-Buruj", arabic: "البروج", verses: 22, type: "Meccan" },
    { id: 86, name: "At-Tariq", arabic: "الطارق", verses: 17, type: "Meccan" },
    { id: 87, name: "Al-A'la", arabic: "الأعلى", verses: 19, type: "Meccan" },
    { id: 88, name: "Al-Ghashiya", arabic: "الغاشية", verses: 26, type: "Meccan" },
    { id: 89, name: "Al-Fajr", arabic: "الفجر", verses: 30, type: "Meccan" },
    { id: 90, name: "Al-Balad", arabic: "البلد", verses: 20, type: "Meccan" },
    { id: 91, name: "Ash-Shams", arabic: "الشمس", verses: 15, type: "Meccan" },
    { id: 92, name: "Al-Lail", arabic: "الليل", verses: 21, type: "Meccan" },
    { id: 93, name: "Ad-Duha", arabic: "الضحى", verses: 11, type: "Meccan" },
    { id: 94, name: "Ash-Sharh", arabic: "الشرح", verses: 8, type: "Meccan" },
    { id: 95, name: "At-Tin", arabic: "التين", verses: 8, type: "Meccan" },
    { id: 96, name: "Al-Alaq", arabic: "العلق", verses: 19, type: "Meccan" },
    { id: 97, name: "Al-Qadr", arabic: "القدر", verses: 5, type: "Meccan" },
    { id: 98, name: "Al-Bayyina", arabic: "البينة", verses: 8, type: "Medinan" },
    { id: 99, name: "Az-Zalzala", arabic: "الزلزلة", verses: 8, type: "Medinan" },
    { id: 100, name: "Al-Adiyat", arabic: "العاديات", verses: 11, type: "Meccan" },
    { id: 101, name: "Al-Qari'a", arabic: "القارعة", verses: 11, type: "Meccan" },
    { id: 102, name: "At-Takathur", arabic: "التكاثر", verses: 8, type: "Meccan" },
    { id: 103, name: "Al-Asr", arabic: "العصر", verses: 3, type: "Meccan" },
    { id: 104, name: "Al-Humaza", arabic: "الهمزة", verses: 9, type: "Meccan" },
    { id: 105, name: "Al-Fil", arabic: "الفيل", verses: 5, type: "Meccan" },
    { id: 106, name: "Quraish", arabic: "قريش", verses: 4, type: "Meccan" },
    { id: 107, name: "Al-Ma'un", arabic: "الماعون", verses: 7, type: "Meccan" },
    { id: 108, name: "Al-Kawthar", arabic: "الكوثر", verses: 3, type: "Meccan" },
    { id: 109, name: "Al-Kafirun", arabic: "الكافرون", verses: 6, type: "Meccan" },
    { id: 110, name: "An-Nasr", arabic: "النصر", verses: 3, type: "Medinan" },
    { id: 111, name: "Al-Masad", arabic: "المسد", verses: 5, type: "Meccan" },
    { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, type: "Meccan" },
    { id: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5, type: "Meccan" },
    { id: 114, name: "An-Nas", arabic: "الناس", verses: 6, type: "Meccan" },
];

// ---------------- Paras ----------------
const paras: Para[] = [
    { id: 1, name: "Juz 1" },
    { id: 2, name: "Juz 2" },
    { id: 3, name: "Juz 3" },
    { id: 4, name: "Juz 4" },
    { id: 5, name: "Juz 5" },
    { id: 6, name: "Juz 6" },
    { id: 7, name: "Juz 7" },
    { id: 8, name: "Juz 8" },
    { id: 9, name: "Juz 9" },
    { id: 10, name: "Juz 10" },
    { id: 11, name: "Juz 11" },
    { id: 12, name: "Juz 12" },
    { id: 13, name: "Juz 13" },
    { id: 14, name: "Juz 14" },
    { id: 15, name: "Juz 15" },
    { id: 16, name: "Juz 16" },
    { id: 17, name: "Juz 17" },
    { id: 18, name: "Juz 18" },
    { id: 19, name: "Juz 19" },
    { id: 20, name: "Juz 20" },
    { id: 21, name: "Juz 21" },
    { id: 22, name: "Juz 22" },
    { id: 23, name: "Juz 23" },
    { id: 24, name: "Juz 24" },
    { id: 25, name: "Juz 25" },
    { id: 26, name: "Juz 26" },
    { id: 27, name: "Juz 27" },
    { id: 28, name: "Juz 28" },
    { id: 29, name: "Juz 29" },
    { id: 30, name: "Juz 30" },
];


const SurahParaSelector: React.FC = () => {
    const [mode, setMode] = useState<"surah" | "para">("surah");
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide  r-color-jwli3a">
                📖 Select Surah or Para
            </h2>


            {/* Toggle Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md ${mode === "surah"
                        ? "bg-gradient-to-r from-green-500 to-green-700 text-white scale-105"
                        : "bg-gray-700 hover:bg-gray-600"
                        }`}
                    onClick={() => {
                        setMode("surah");
                        setSelected(null);
                    }}
                >
                    Surahs
                </button>
                <button
                    className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md ${mode === "para"
                        ? "bg-gradient-to-r from-green-500 to-green-700 text-white scale-105"
                        : "bg-gray-700 hover:bg-gray-600"
                        }`}
                    onClick={() => {
                        setMode("para");
                        setSelected(null);
                    }}
                >
                    Paras
                </button>
            </div>

            {/* Dropdown */}
            <select
                className="w-full p-3 rounded-lg text-black font-medium shadow-inner border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                value={selected ?? ""}
                onChange={(e) => setSelected(Number(e.target.value))}
            >
                <option value="">
                    -- Select {mode === "surah" ? "Surah" : "Para"} --
                </option>

                {mode === "surah"
                    ? surahs.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.id}. {s.name} ({s.verses} Verses, {s.type})
                        </option>
                    ))
                    : paras.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
            </select>

            {/* Display Selection */}
            {selected && (
                <div className="mt-6 p-5 bg-gray-800 rounded-xl text-center shadow-lg border border-green-700">
                    {mode === "surah" ? (
                        <div>
                            <h3 className="text-xl font-bold text-green-400">
                                {surahs.find((s) => s.id === selected)?.name}
                            </h3>
                            <p className="text-2xl mt-1 font-arabic text-white">
                                {surahs.find((s) => s.id === selected)?.arabic}
                            </p>
                            <p className="text-sm mt-2 text-gray-300 italic">
                                {surahs.find((s) => s.id === selected)?.verses} Verses —{" "}
                                {surahs.find((s) => s.id === selected)?.type}
                            </p>
                        </div>
                    ) : (
                        <h3 className="text-lg font-semibold text-green-400">
                            {paras.find((p) => p.id === selected)?.name}
                        </h3>
                    )}
                </div>
            )}
        </div>
    );
};

export default SurahParaSelector;
