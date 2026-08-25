import React, { useState } from "react";
import {
  Download,
  Printer,
  Copy,
  Check,
  Edit3,
  Eye,
  BookOpen,
  Cpu,
  Globe,
  Award,
  Layers,
  FileSpreadsheet,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Save,
  Plus,
  Trash2
} from "lucide-react";
import type { LessonPlan, LearningActivity, Worksheet } from "../types";
import { exportLessonPlanToDocx } from "../utils/docxExport";

interface KHBDViewerProps {
  plan: LessonPlan;
  onUpdatePlan: (updatedPlan: LessonPlan) => void;
  onBackToForm: () => void;
}

export const KHBDViewer: React.FC<KHBDViewerProps> = ({
  plan,
  onUpdatePlan,
  onBackToForm
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPlan, setEditedPlan] = useState<LessonPlan>(plan);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "objectives" | "equipment" | "activities" | "appendices">("all");
  const [isExporting, setIsExporting] = useState(false);

  // Sync editedPlan when plan prop changes
  React.useEffect(() => {
    setEditedPlan(plan);
  }, [plan]);

  const handleExportWord = async () => {
    try {
      setIsExporting(true);
      await exportLessonPlanToDocx(isEditMode ? editedPlan : plan);
    } catch (err) {
      console.error("Lỗi khi xuất Word:", err);
      alert("Không thể xuất tệp Word. Vui lòng kiểm tra lại dữ liệu.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyMarkdown = () => {
    const p = isEditMode ? editedPlan : plan;
    let md = `# KẾ HOẠCH BÀI DẠY\n## BÀI: ${p.header.lessonTitle.toUpperCase()}\n`;
    md += `**Môn học:** ${p.header.subject} - **Lớp:** ${p.header.grade}\n`;
    md += `**Thời lượng:** ${p.header.numberOfPeriods} tiết - **Bộ sách:** ${p.header.textbookSet}\n\n`;

    md += `### I. MỤC TIÊU\n#### 1. Kiến thức\n`;
    p.objectives.knowledge.forEach((k) => (md += `- ${k}\n`));

    md += `\n#### 2. Năng lực\n`;
    md += `**a) Năng lực chung:**\n`;
    p.objectives.competencies.generalCompetencies.forEach((gc) => {
      md += `- **${gc.name} (${gc.code}):** ${gc.specificBehaviors.join("; ")}\n`;
    });

    md += `**b) Năng lực hóa học:**\n`;
    p.objectives.competencies.chemistryCompetencies.forEach((cc) => {
      md += `- **${cc.name} (${cc.component}):** ${cc.description} (${cc.specificBehaviors.join("; ")})\n`;
    });

    if (p.objectives.competencies.digitalCompetencies?.length) {
      md += `**c) Năng lực số (NLS):**\n`;
      p.objectives.competencies.digitalCompetencies.forEach((dc) => {
        md += `- **Mã ${dc.code} - ${dc.name}:** ${dc.evidence}\n`;
      });
    }

    if (p.objectives.competencies.aiCompetencies?.length) {
      md += `**d) Năng lực AI (QĐ 2422/QĐ-BGDĐT):**\n`;
      p.objectives.competencies.aiCompetencies.forEach((ai) => {
        md += `- **Mã ${ai.code} - ${ai.name}:** ${ai.evidence}\n`;
      });
    }

    md += `\n#### 3. Phẩm chất\n`;
    p.objectives.qualities.forEach((q) => {
      md += `- **${q.name}:** ${q.evidence}\n`;
    });

    md += `\n### II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU\n`;
    md += `- **Giáo viên:** ${p.equipmentAndMaterials.teacher.join("; ")}\n`;
    md += `- **Học sinh:** ${p.equipmentAndMaterials.students.join("; ")}\n\n`;

    md += `### III. TIẾN TRÌNG DẠY HỌC\n`;
    p.learningActivities.forEach((act) => {
      md += `\n#### ${act.typeLabel || act.title} (${act.durationMinutes} phút - Tiết ${act.period})\n`;
      if (act.bigQuestion) md += `*Câu hỏi lớn:* ${act.bigQuestion}\n`;
      md += `- **a) Mục tiêu:** ${act.objective}\n`;
      md += `- **b) Nội dung:** ${act.content}\n`;
      md += `- **c) Sản phẩm:** ${act.product}\n`;
      md += `- **d) Tổ chức thực hiện:**\n\n`;
      md += `| Hoạt động của Giáo viên | Hoạt động của Học sinh |\n|---|---|\n`;
      const maxPhases = Math.max(
        act.organization.teacherActivities.length,
        act.organization.studentActivities.length
      );
      for (let i = 0; i < maxPhases; i++) {
        const t = act.organization.teacherActivities[i] || { phase: "", details: "" };
        const s = act.organization.studentActivities[i] || { phase: "", details: "" };
        md += `| **${t.phase}**: ${t.details.replace(/\n/g, " ")} | **${s.phase}**: ${s.details.replace(/\n/g, " ")} |\n`;
      }
      md += `\n- **e) Đánh giá:** ${act.assessment.method} - ${act.assessment.criteria}\n`;
    });

    if (p.appendices.worksheets?.length) {
      md += `\n### IV. PHỤ LỤC\n`;
      p.appendices.worksheets.forEach((ws) => {
        md += `\n#### ${ws.title}\n${ws.content}\n`;
        if (ws.keyAnswer) md += `*Đáp án/Hướng dẫn:* ${ws.keyAnswer}\n`;
      });
    }

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveChanges = () => {
    onUpdatePlan(editedPlan);
    setIsEditMode(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 no-print">
        
        {/* Left: View Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Toàn văn bài dạy
          </button>
          <button
            onClick={() => setActiveTab("objectives")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "objectives" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            I. Mục tiêu
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "equipment" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            II. Thiết bị
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "activities" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            III. Tiến trình ({plan.learningActivities.length} HĐ)
          </button>
          <button
            onClick={() => setActiveTab("appendices")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "appendices" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            IV. Phụ lục ({plan.appendices.worksheets?.length || 0} Phiếu HT)
          </button>
        </div>

        {/* Right: Export & Editing Tools */}
        <div className="flex items-center gap-2">
          {isEditMode ? (
            <button
              onClick={handleSaveChanges}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Lưu chỉnh sửa</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditMode(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
            >
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>Chỉnh sửa bài dạy</span>
            </button>
          )}

          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
            title="Sao chép nội dung văn bản Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span className="hidden sm:inline">{copied ? "Đã sao chép" : "Sao chép"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
            title="In hoặc Lưu PDF"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">In / PDF</span>
          </button>

          <button
            onClick={handleExportWord}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-98 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "Đang tạo file..." : "Xuất file Word (.docx)"}</span>
          </button>
        </div>

      </div>

      {/* Main Document Content Area */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10 document-preview">
        
        {/* Document Header Table */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="text-center font-serif">
              <p className="font-bold uppercase">{plan.header.schoolName || "TRƯỜNG THPT ...................."}</p>
              <p className="italic">TỔ CHUYÊN MÔN: {plan.header.department || "HÓA HỌC"}</p>
            </div>
            <div className="font-serif pl-4 border-l border-slate-200">
              <p><strong>Họ và tên giáo viên:</strong> {plan.header.teacherName || "................................"}</p>
              <p><strong>Môn học:</strong> {plan.header.subject} - <strong>Lớp:</strong> {plan.header.grade}</p>
              <p className="italic"><strong>Bộ sách:</strong> {plan.header.textbookSet}</p>
            </div>
          </div>

          <div className="text-center mt-6 space-y-1">
            <h2 className="text-xl font-bold font-serif text-blue-900 tracking-wide">
              KẾ HOẠCH BÀI DẠY
            </h2>
            <h3 className="text-lg font-bold font-serif text-slate-900">
              BÀI: {plan.header.lessonTitle.toUpperCase()}
            </h3>
            <p className="text-xs italic text-slate-600">
              Thời lượng: {plan.header.numberOfPeriods} tiết ({plan.header.numberOfPeriods * (plan.header.periodDuration || 45)} phút) • Đối tượng: {plan.header.targetAudience}
            </p>
          </div>
        </div>

        {/* SECTION I: MỤC TIÊU */}
        {(activeTab === "all" || activeTab === "objectives") && (
          <section className="mb-8 space-y-4">
            <h3 className="text-base font-bold text-blue-900 font-serif border-b border-blue-100 pb-1 flex items-center gap-2">
              <span>I. MỤC TIÊU BÀI DẠY</span>
            </h3>

            {/* 1. Kiến thức */}
            <div className="space-y-1.5 pl-2">
              <h4 className="text-sm font-bold text-slate-900">1. Kiến thức:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-800 leading-relaxed pl-2">
                {plan.objectives.knowledge.map((k, idx) => (
                  <li key={idx}>{k}</li>
                ))}
              </ul>
            </div>

            {/* 2. Năng lực */}
            <div className="space-y-3 pl-2">
              <h4 className="text-sm font-bold text-slate-900">2. Năng lực:</h4>

              {/* a) Năng lực chung */}
              <div className="space-y-1.5 pl-2">
                <p className="text-xs font-bold text-slate-900">a) Năng lực chung:</p>
                <div className="space-y-1.5 pl-2">
                  {plan.objectives.competencies.generalCompetencies.map((gc, idx) => (
                    <div key={idx} className="text-xs text-slate-800 leading-relaxed">
                      <span className="font-semibold text-slate-900">• {gc.name} ({gc.code}): </span>
                      <span>{gc.specificBehaviors.join("; ")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* b) Năng lực hóa học */}
              <div className="space-y-1.5 pl-2">
                <p className="text-xs font-bold text-slate-900">b) Năng lực hóa học (theo CT GDPT 2018):</p>
                <div className="space-y-1.5 pl-2">
                  {plan.objectives.competencies.chemistryCompetencies.map((cc, idx) => (
                    <div key={idx} className="text-xs text-slate-800 leading-relaxed">
                      <span className="font-semibold text-emerald-800">• {cc.name} ({cc.component}): </span>
                      <span>{cc.description} <em>(Biểu hiện: {cc.specificBehaviors.join("; ")})</em></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* c) Năng lực số */}
              {plan.objectives.competencies.digitalCompetencies &&
                plan.objectives.competencies.digitalCompetencies.length > 0 && (
                  <div className="space-y-1.5 pl-2">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>c) Năng lực số (NLS):</span>
                    </p>
                    <div className="space-y-1 pl-2">
                      {plan.objectives.competencies.digitalCompetencies.map((dc, idx) => (
                        <div key={idx} className="text-xs text-slate-800 leading-relaxed flex items-start gap-1.5">
                          <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.5 rounded border border-blue-200 text-[11px] shrink-0">
                            {dc.code}
                          </span>
                          <span><strong>{dc.name}:</strong> {dc.evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* d) Năng lực AI theo QĐ 2422 */}
              {plan.objectives.competencies.aiCompetencies &&
                plan.objectives.competencies.aiCompetencies.length > 0 && (
                  <div className="space-y-1.5 pl-2">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-600" />
                      <span>d) Năng lực Trí tuệ nhân tạo (AI theo QĐ 2422/QĐ-BGDĐT):</span>
                    </p>
                    <div className="space-y-1 pl-2">
                      {plan.objectives.competencies.aiCompetencies.map((ai, idx) => (
                        <div key={idx} className="text-xs text-slate-800 leading-relaxed flex items-start gap-1.5">
                          <span className="font-mono font-bold text-purple-700 bg-purple-50 px-1 py-0.5 rounded border border-purple-200 text-[11px] shrink-0">
                            {ai.code}
                          </span>
                          <span><strong>{ai.name}:</strong> {ai.evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* e) Năng lực tiếng Anh */}
              {plan.objectives.competencies.englishCompetencies &&
                plan.objectives.competencies.englishCompetencies.length > 0 && (
                  <div className="space-y-1.5 pl-2">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      <span>e) Năng lực tiếng Anh / Danh pháp quốc tế IUPAC:</span>
                    </p>
                    <div className="space-y-1 pl-2">
                      {plan.objectives.competencies.englishCompetencies.map((eng, idx) => (
                        <div key={idx} className="text-xs text-slate-800 leading-relaxed">
                          <span className="font-semibold text-slate-900">• {eng.aspect}: </span>
                          <span>{eng.evidence} (<em>Thuật ngữ:</em> {eng.terminology.join(", ")})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* 3. Phẩm chất */}
            <div className="space-y-1.5 pl-2">
              <h4 className="text-sm font-bold text-slate-900">3. Phẩm chất:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-800 leading-relaxed pl-2">
                {plan.objectives.qualities.map((q, idx) => (
                  <li key={idx}>
                    <strong className="text-slate-900">{q.name}:</strong> {q.evidence}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* SECTION II: THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU */}
        {(activeTab === "all" || activeTab === "equipment") && (
          <section className="mb-8 space-y-3">
            <h3 className="text-base font-bold text-blue-900 font-serif border-b border-blue-100 pb-1">
              II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
            </h3>
            <div className="space-y-2 pl-2 text-xs text-slate-800 leading-relaxed">
              <p>
                <strong className="text-slate-900">1. Giáo viên:</strong> {plan.equipmentAndMaterials.teacher.join("; ")}
              </p>
              <p>
                <strong className="text-slate-900">2. Học sinh:</strong> {plan.equipmentAndMaterials.students.join("; ")}
              </p>
            </div>
          </section>
        )}

        {/* SECTION III: TIẾN TRÌNH DẠY HỌC */}
        {(activeTab === "all" || activeTab === "activities") && (
          <section className="mb-8 space-y-6">
            <h3 className="text-base font-bold text-blue-900 font-serif border-b border-blue-100 pb-1">
              III. TIẾN TRÌNG DẠY HỌC
            </h3>

            {plan.learningActivities.map((activity, idx) => (
              <div key={activity.id || idx} className="space-y-3 border border-slate-200 rounded-xl p-4 bg-slate-50/40">
                
                {/* Activity Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-600 text-white">
                      Tiết {activity.period}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {activity.typeLabel || activity.title} ({activity.durationMinutes} phút)
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {activity.type === "KHOI_DONG" && "Khởi động"}
                    {activity.type === "HINH_THANH_KIEN_THUC" && "Hình thành kiến thức"}
                    {activity.type === "LUYEN_TAP" && "Luyện tập"}
                    {activity.type === "VAN_DUNG" && "Vận dụng"}
                  </span>
                </div>

                {/* Big Question if any */}
                {activity.bigQuestion && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <span className="font-bold text-amber-700 shrink-0">★ Câu hỏi lớn / Vấn đề:</span>
                    <span className="italic">{activity.bigQuestion}</span>
                  </div>
                )}

                {/* a, b, c specifications */}
                <div className="space-y-1 text-xs text-slate-800 leading-relaxed pl-1">
                  <p><strong className="text-slate-900">a) Mục tiêu:</strong> {activity.objective}</p>
                  <p><strong className="text-slate-900">b) Nội dung:</strong> {activity.content}</p>
                  <p><strong className="text-slate-900">c) Sản phẩm:</strong> {activity.product}</p>
                </div>

                {/* d) Tổ chức thực hiện - 2-Column Table */}
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">d) Tổ chức thực hiện:</p>
                  <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                          <th className="p-2.5 w-1/2 border-r border-slate-300 text-center uppercase tracking-wide">
                            Hoạt động của Giáo viên
                          </th>
                          <th className="p-2.5 w-1/2 text-center uppercase tracking-wide">
                            Hoạt động của Học sinh
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {Array.from({
                          length: Math.max(
                            activity.organization.teacherActivities.length,
                            activity.organization.studentActivities.length
                          )
                        }).map((_, pIdx) => {
                          const tPhase = activity.organization.teacherActivities[pIdx] || { phase: "", details: "" };
                          const sPhase = activity.organization.studentActivities[pIdx] || { phase: "", details: "" };

                          return (
                            <tr key={pIdx} className="hover:bg-slate-50/60">
                              <td className="p-3 w-1/2 border-r border-slate-200 align-top space-y-1">
                                {tPhase.phase && (
                                  <p className="font-bold text-blue-900">• {tPhase.phase}:</p>
                                )}
                                <p className="text-slate-800 whitespace-pre-line leading-relaxed">{tPhase.details}</p>
                              </td>
                              <td className="p-3 w-1/2 align-top space-y-1">
                                {sPhase.phase && (
                                  <p className="font-bold text-indigo-900">• {sPhase.phase}:</p>
                                )}
                                <p className="text-slate-800 whitespace-pre-line leading-relaxed">{sPhase.details}</p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* e) Đánh giá */}
                {activity.assessment && (
                  <div className="text-xs text-slate-700 italic bg-white p-2 rounded border border-slate-200">
                    <strong>e) Đánh giá:</strong> Phương pháp: {activity.assessment.method} | Tiêu chí: {activity.assessment.criteria}
                  </div>
                )}

              </div>
            ))}
          </section>
        )}

        {/* SECTION IV: PHỤ LỤC */}
        {(activeTab === "all" || activeTab === "appendices") && plan.appendices && (
          <section className="space-y-6">
            <h3 className="text-base font-bold text-blue-900 font-serif border-b border-blue-100 pb-1">
              IV. PHỤ LỤC & HỌC LIỆU
            </h3>

            {/* Worksheets */}
            {plan.appendices.worksheets && plan.appendices.worksheets.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">1. Phiếu học tập (Worksheets):</h4>
                {plan.appendices.worksheets.map((ws, wIdx) => (
                  <div key={ws.id || wIdx} className="border border-slate-300 rounded-xl p-4 bg-slate-50/50 space-y-2">
                    <div className="text-center font-bold text-sm text-slate-900 uppercase">
                      {ws.title || `PHIẾU HỌC TẬP SỐ ${wIdx + 1}`}
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                      {ws.content}
                    </div>
                    {ws.keyAnswer && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 leading-relaxed">
                        <span className="font-bold text-emerald-800">Hướng dẫn giải / Đáp án:</span>
                        <div className="whitespace-pre-line mt-1">{ws.keyAnswer}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Rubrics */}
            {plan.appendices.rubrics && plan.appendices.rubrics.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">2. Bảng kiểm đánh giá (Rubrics):</h4>
                {plan.appendices.rubrics.map((rubric, rIdx) => (
                  <div key={rIdx} className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-2xs space-y-2">
                    <p className="font-bold text-xs text-slate-900">{rubric.title}</p>
                    <div className="space-y-1.5">
                      {rubric.criteria.map((crit, cIdx) => (
                        <div key={cIdx} className="text-xs text-slate-700 p-2 bg-slate-50 rounded border border-slate-100">
                          <span className="font-semibold text-slate-900">• Tiêu chí: {crit.name}:</span>
                          <div className="text-[11px] text-slate-600 mt-0.5">{crit.levels.join(" | ")}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Safety Notes */}
            {plan.appendices.safetyNotes && plan.appendices.safetyNotes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">3. Lưu ý an toàn thí nghiệm / Hóa chất:</h4>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                  {plan.appendices.safetyNotes.map((note, nIdx) => (
                    <div key={nIdx} className="flex items-start gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>
        )}

      </div>
    </div>
  );
};
