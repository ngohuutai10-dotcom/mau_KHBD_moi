import React, { useState } from "react";
import { X, BookOpen, Cpu, Globe, Award, HelpCircle, CheckCircle2, Search } from "lucide-react";
import {
  CHEMISTRY_COMPETENCY_FRAMEWORK,
  GENERAL_COMPETENCIES,
  DIGITAL_COMPETENCY_FRAMEWORK,
  AI_COMPETENCY_FRAMEWORK_2422,
  CORE_QUALITIES
} from "../../server/reference";

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceModal: React.FC<ReferenceModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"chem" | "general" | "nls" | "ai" | "qualities" | "cv5512">("ai");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Sổ tay Tra cứu Khung Năng lực & Cấu trúc KHBD
              </h2>
              <p className="text-xs text-slate-500">
                Chương trình GDPT 2018 & Quyết định 2422/QĐ-BGDĐT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto gap-2 py-2">
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "ai"
                ? "bg-purple-100 text-purple-800 border border-purple-300"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>Năng lực AI (QĐ 2422)</span>
          </button>

          <button
            onClick={() => setActiveTab("nls")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "nls"
                ? "bg-blue-100 text-blue-800 border border-blue-300"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Năng lực số (NLS)</span>
          </button>

          <button
            onClick={() => setActiveTab("chem")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "chem"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Năng lực Hóa học</span>
          </button>

          <button
            onClick={() => setActiveTab("general")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "general"
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Năng lực chung</span>
          </button>

          <button
            onClick={() => setActiveTab("qualities")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "qualities"
                ? "bg-rose-100 text-rose-800 border border-rose-300"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
            <span>5 Phẩm chất</span>
          </button>

          <button
            onClick={() => setActiveTab("cv5512")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "cv5512"
                ? "bg-slate-800 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Cấu trúc CV 5512</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* TAB: Năng lực AI theo QĐ 2422 */}
          {activeTab === "ai" && (
            <div className="space-y-4">
              <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 leading-relaxed">
                <p className="font-semibold text-purple-950 mb-1">
                  Quyết định 2422/QĐ-BGDĐT ngày 30/08/2024 của Bộ GD&ĐT:
                </p>
                Khung năng lực Trí tuệ nhân tạo (AI) cho học sinh THPT gồm 5 miền năng lực (AI1 - AI5). Trong bài dạy Hóa học, tích hợp AI giúp học sinh sử dụng công cụ mô phỏng phân tử, kiểm chứng thông tin, phát hiện ảo giác AI và hình thành tư duy đạo đức học thuật.
              </div>

              <div className="grid gap-3">
                {AI_COMPETENCY_FRAMEWORK_2422.components.map((comp) => (
                  <div key={comp.code} className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-bold text-xs">
                        {comp.code}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">{comp.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-2.5">{comp.description}</p>
                    <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {comp.subCodes.map((sub) => (
                        <div key={sub.code} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="font-mono font-semibold text-purple-700 bg-purple-50 px-1 rounded border border-purple-200 shrink-0">
                            {sub.code}
                          </span>
                          <span>{sub.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Năng lực Số NLS */}
          {activeTab === "nls" && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                <p className="font-semibold text-blue-950 mb-1">
                  Khung Năng lực Số (NLS) cho học sinh phổ thông:
                </p>
                Gồm 6 miền năng lực từ NLS1 đến NLS6. Trong môn Hóa học, NLS được thể hiện qua việc tra cứu số liệu độ tan/nhiệt động, dùng phần mềm mô phỏng PhET/MolView, xử lý bảng tính thực nghiệm, và hợp tác trực tuyến.
              </div>

              <div className="grid gap-3">
                {DIGITAL_COMPETENCY_FRAMEWORK.components.map((comp) => (
                  <div key={comp.code} className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-bold text-xs">
                        {comp.code}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">{comp.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-2.5">{comp.description}</p>
                    <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {comp.subCodes.map((sub) => (
                        <div key={sub.code} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="font-mono font-semibold text-blue-700 bg-blue-50 px-1 rounded border border-blue-200 shrink-0">
                            {sub.code}
                          </span>
                          <span>{sub.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Năng lực Hóa học */}
          {activeTab === "chem" && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
                <p className="font-semibold text-emerald-950 mb-1">
                  Khung Năng lực Hóa học chuyên biệt (CT GDPT 2018):
                </p>
                Gồm 3 thành phần cốt lõi: Nhận thức hóa học (NTHH), Tìm hiểu thế giới tự nhiên dưới góc độ hóa học (THTGTN), và Vận dụng kiến thức, kĩ năng đã học (VDKN). Mỗi thành phần được biểu hiện bằng các hành vi học tập cụ thể, có thể đo lường và đánh giá được.
              </div>

              <div className="grid gap-3">
                {CHEMISTRY_COMPETENCY_FRAMEWORK.components.map((comp) => (
                  <div key={comp.code} className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-xs">
                        {comp.code}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">{comp.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-2.5">{comp.description}</p>
                    <ul className="space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {comp.indicators.map((ind, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Năng lực chung */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                <p className="font-semibold text-amber-950 mb-1">
                  3 Năng lực chung cốt lõi theo CT GDPT 2018:
                </p>
                Tự chủ và tự học (TCTH), Giao tiếp và hợp tác (GTHT), Giải quyết vấn đề và sáng tạo (GQVBSC) được rèn luyện xuyên suốt qua các pha hoạt động học tập, làm việc nhóm và nghiên cứu hóa học.
              </div>

              <div className="grid gap-3">
                {GENERAL_COMPETENCIES.map((comp) => (
                  <div key={comp.code} className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-amber-600 text-white font-bold text-xs">
                        {comp.code}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">{comp.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-2.5">{comp.description}</p>
                    <ul className="space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {comp.indicators.map((ind, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: 5 Phẩm chất */}
          {activeTab === "qualities" && (
            <div className="space-y-4">
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 leading-relaxed">
                <p className="font-semibold text-rose-950 mb-1">
                  5 Phẩm chất chủ yếu của học sinh THPT:
                </p>
                Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm. Chỉ ghi nhận phẩm chất nào có hoạt động thực nghiệm, thảo luận hoặc tình huống minh chứng rõ ràng trong bài dạy.
              </div>

              <div className="grid gap-3">
                {CORE_QUALITIES.map((q) => (
                  <div key={q.name} className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0">
                      ♥
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1">{q.name}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{q.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Cấu trúc CV 5512 */}
          {activeTab === "cv5512" && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-xl font-medium">
                Cấu trúc chuẩn của một Kế hoạch bài dạy theo Công văn 5512/BGDĐT-GDTrH:
              </div>

              <div className="space-y-3">
                <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">I. MỤC TIÊU</h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
                    <li><strong>1. Kiến thức:</strong> Các kiến thức cốt lõi, chuẩn cần đạt.</li>
                    <li><strong>2. Năng lực:</strong> Năng lực chung + Năng lực Hóa học + Năng lực số/AI/Tiếng Anh (nếu có).</li>
                    <li><strong>3. Phẩm chất:</strong> Phẩm chất được bồi dưỡng qua các nhiệm vụ.</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
                    <li><strong>1. Giáo viên:</strong> Giáo án, slide, hóa chất, dụng cụ thí nghiệm, phần mềm số, video.</li>
                    <li><strong>2. Học sinh:</strong> SGK, vở ghi, thiết bị thông minh, bài chuẩn bị trước ở nhà.</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">III. TIẾN TRÌNH DẠY HỌC</h4>
                  <p className="text-slate-600 mb-2">Mỗi hoạt động gồm 4 mục: a) Mục tiêu, b) Nội dung, c) Sản phẩm, d) Tổ chức thực hiện (gồm 4 pha: Chuyển giao - Thực hiện - Báo cáo thảo luận - Kết luận nhận định).</p>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 rounded-lg text-slate-700 text-center font-medium">
                    <div className="p-2 bg-white rounded border border-slate-200">Hoạt động của Giáo viên</div>
                    <div className="p-2 bg-white rounded border border-slate-200">Hoạt động của Học sinh</div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">IV. PHỤ LỤC</h4>
                  <p className="text-slate-600">Phiếu học tập, đề cương nhiệm vụ, bảng kiểm Rubric, đáp án bài tập và hướng dẫn an toàn.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Hệ thống tự động liên kết các mã năng lực vào từng hoạt động KHBD.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
