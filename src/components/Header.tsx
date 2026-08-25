import React from "react";
import { BookOpen, Sparkles, FileText, Info, HelpCircle, RotateCcw } from "lucide-react";

interface HeaderProps {
  onOpenReference: () => void;
  onNewPlan: () => void;
  hasCurrentPlan: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReference,
  onNewPlan,
  hasCurrentPlan
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  Soạn KHBD Hóa học THPT
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  GDPT 2018 & QĐ 2422
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Chuẩn hóa mục tiêu, 4 pha tổ chức thực hiện, Năng lực số & AI, xuất file Word (.docx)
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onOpenReference}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors"
              title="Tra cứu Khung Năng lực Hóa học, Năng lực Số và Năng lực AI theo QĐ 2422"
            >
              <Info className="w-4 h-4 text-blue-600" />
              <span className="hidden md:inline">Tra cứu Khung Năng lực</span>
            </button>

            {hasCurrentPlan && (
              <button
                type="button"
                onClick={onNewPlan}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                title="Soạn bài dạy mới"
              >
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span>Soạn bài mới</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
