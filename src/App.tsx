import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { KHBDForm } from "./components/KHBDForm";
import { KHBDViewer } from "./components/KHBDViewer";
import { ReferenceModal } from "./components/ReferenceModal";
import type { LessonPlan } from "./types";

export const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(null);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load last saved draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("khbd_hoa_hoc_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.header && parsed.learningActivities) {
          setCurrentPlan(parsed);
        }
      }
    } catch (e) {
      console.warn("Không thể tải bản nháp từ localStorage:", e);
    }
  }, []);

  // Save current plan to localStorage when updated
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSample = (samplePlan: LessonPlan) => {
    handleUpdatePlan(samplePlan);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewPlan = () => {
    if (currentPlan) {
      const confirmNew = window.confirm(
        "Bạn có chắc muốn chuyển sang soạn bài dạy mới? Bản nháp hiện tại vẫn được lưu trên trình duyệt."
      );
      if (!confirmNew) return;
    }
    setCurrentPlan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* Navigation Header */}
      <Header
        onOpenReference={() => setIsReferenceModalOpen(true)}
        onNewPlan={handleNewPlan}
        hasCurrentPlan={currentPlan !== null}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentPlan ? (
          <KHBDViewer
            plan={currentPlan}
            onUpdatePlan={handleUpdatePlan}
            onBackToForm={() => setCurrentPlan(null)}
          />
        ) : (
          <KHBDForm
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
