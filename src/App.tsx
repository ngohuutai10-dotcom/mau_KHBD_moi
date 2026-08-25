import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { KHBDForm } from "./components/KHBDForm";
import { KHBDViewer } from "./components/KHBDViewer";
import { ReferenceModal } from "./components/ReferenceModal";
import type { GenerateSettings, LessonPlan } from "./types";

export type AppView = "editor" | "result";

const DEFAULT_SETTINGS: GenerateSettings = {
  lessonTitle: "",
  grade: "11",
  textbookSet: "Cánh Diều",
  numberOfPeriods: 2,
  periodDuration: 45,
  targetAudience: "Học sinh THPT đại trà (kết hợp phân hóa)",
  teacherName: "Giáo viên Hóa học",
  schoolName: "Trường THPT",
  department: "Tổ Hóa học",
  enableDigitalCompetency: true,
  enableAICompetency: true,
  enableEnglishCompetency: true,
  model: "gemini-3.6-flash",
  specialRequests: ""
};

const STORAGE_KEYS = [
  "khbd_hoa_hoc_draft",
  "khbdResult",
  "khbd_result",
  "currentKHBD",
  "generatedKHBD"
];

const clearSavedKHBD = () => {
  STORAGE_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch {
      // ignore
    }
  });
};

export const App: React.FC = () => {
  const [view, setView] = useState<AppView>("editor");
  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(null);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<GenerateSettings>(DEFAULT_SETTINGS);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load last saved draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("khbd_hoa_hoc_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.header && parsed.learningActivities) {
          setCurrentPlan(parsed);
          setView("result");
        }
      }
    } catch (e) {
      console.warn("Không thể tải bản nháp từ localStorage:", e);
    }
  }, []);

  // Update localStorage when currentPlan changes
  const handleUpdatePlan = (updatedPlan: LessonPlan) => {
    setCurrentPlan(updatedPlan);
    try {
      localStorage.setItem("khbd_hoa_hoc_draft", JSON.stringify(updatedPlan));
    } catch (e) {
      console.warn("Không thể lưu bản nháp vào localStorage:", e);
    }
  };

  const handleGenerateSuccess = (newPlan: LessonPlan) => {
    handleUpdatePlan(newPlan);
    setError(null);
    setIsLoading(false);
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSample = (samplePlan: LessonPlan) => {
    handleUpdatePlan(samplePlan);
    setError(null);
    setIsLoading(false);
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // "Chỉnh sửa bài dạy" -> Quay về form nhưng GIỮ nguyên dữ liệu bài hiện tại
  const handleEditLesson = () => {
    setView("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // "Soạn bài mới" -> Xóa kết quả, xóa cache bài cũ, reset dữ liệu bài riêng nhưng giữ thông tin giáo viên/trường
  const handleNewLesson = () => {
    // 1. Giữ lại thông tin trường, tổ, giáo viên, bộ sách
    const persistentSettings: Partial<GenerateSettings> = {
      schoolName: settings.schoolName || "Trường THPT",
      department: settings.department || "Tổ Hóa học",
      teacherName: settings.teacherName || "Giáo viên Hóa học",
      textbookSet: settings.textbookSet || "Cánh Diều",
      grade: settings.grade || "11",
      periodDuration: settings.periodDuration || 45,
      model: settings.model || "gemini-3.6-flash",
      enableDigitalCompetency: settings.enableDigitalCompetency,
      enableAICompetency: settings.enableAICompetency,
      enableEnglishCompetency: settings.enableEnglishCompetency
    };

    // 2. Reset các thông tin riêng của bài học cũ
    setSettings({
      ...DEFAULT_SETTINGS,
      ...persistentSettings,
      lessonTitle: "",
      numberOfPeriods: 2,
      targetAudience: "Học sinh THPT đại trà (kết hợp phân hóa)",
      specialRequests: ""
    });

    // 3. Reset danh sách file đính kèm
    setFiles([]);

    // 4. Xóa kết quả KHBD trong state
    setCurrentPlan(null);

    // 5. Xóa thông báo lỗi & reset loading
    setError(null);
    setIsLoading(false);

    // 6. Xóa cache lưu trữ localStorage / sessionStorage
    clearSavedKHBD();

    // 7. Chuyển ngay về màn hình form nhập liệu
    setView("editor");

    // 8. Cuộn mượt mà lên đầu trang
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* Navigation Header */}
      <Header
        onOpenReference={() => setIsReferenceModalOpen(true)}
        onNewPlan={handleNewLesson}
        hasCurrentPlan={currentPlan !== null || view === "result"}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {view === "result" && currentPlan ? (
          <KHBDViewer
            plan={currentPlan}
            onUpdatePlan={handleUpdatePlan}
            onBackToForm={handleEditLesson}
            onNewLesson={handleNewLesson}
          />
        ) : (
          <KHBDForm
            settings={settings}
            setSettings={setSettings}
            files={files}
            setFiles={setFiles}
            errorMessage={error}
            setErrorMessage={setError}
            onGenerateSuccess={handleGenerateSuccess}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSelectSample={handleSelectSample}
          />
        )}
      </main>

      {/* Reference Modal */}
      <ReferenceModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 no-print">
        <p>
          Ứng dụng Soạn Kế hoạch bài dạy Hóa học THPT • Chuẩn hóa theo Chương trình GDPT 2018 & Quyết định 2422/QĐ-BGDĐT
        </p>
      </footer>

    </div>
  );
};

export default App;
