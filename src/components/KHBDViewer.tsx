import React, { useState, useEffect } from "react";
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
  Trash2,
  RotateCcw,
  ArrowLeft
} from "lucide-react";
import type { LessonPlan, LearningActivity, Worksheet, OrganizationPhase } from "../types";
import { exportLessonPlanToDocx } from "../utils/docxExport";
import {
  formatAICode,
  formatDigitalCompetencyCode,
  removeLegacyCompetencyCode,
  removePhasePrefix,
  cleanBigQuestion,
  displayOrDots,
  cleanCompetencyDescription
} from "../utils/competencyHelper";
import {
  normalizeWorksheetTasks,
  sanitizeWorksheetContent,
  DEFAULT_GROUP_ASSESSMENT_CRITERIA
} from "../utils/worksheetHelper";

interface TextListProps {
  items?: string[];
  useDash?: boolean;
}

function TextList({ items = [], useDash = false }: TextListProps) {
  if (!Array.isArray(items)) return null;

  return (
    <div className="space-y-1">
      {items
        .filter(Boolean)
        .map((item, index) => {
          const clean = removeLegacyCompetencyCode(item);
          return (
            <p
              key={index}
              style={{
                margin: 0,
                padding: 0,
                lineHeight: 1.25
              }}
              className="text-xs text-slate-900"
            >
              {useDash ? "- " : ""}
              {clean}
            </p>
          );
        })}
    </div>
  );
}

interface NormalizedPhase {
  phase: string;
  teacher: string[];
  student: string[];
  boardContent: string[];
}

function normalizePhases(org: any): NormalizedPhase[] {
  if (Array.isArray(org)) {
    return org.map((p) => ({
      phase: p.phase || "",
      teacher: Array.isArray(p.teacher) ? p.teacher : p.teacher ? [p.teacher] : [],
      student: Array.isArray(p.student) ? p.student : p.student ? [p.student] : [],
      boardContent: Array.isArray(p.boardContent) ? p.boardContent : p.boardContent ? [p.boardContent] : []
    }));
  }
  if (org && Array.isArray(org.teacherActivities) && Array.isArray(org.studentActivities)) {
    const maxLen = Math.max(org.teacherActivities.length, org.studentActivities.length);
    const result: NormalizedPhase[] = [];
    for (let i = 0; i < maxLen; i++) {
      const t = org.teacherActivities[i] || {};
      const s = org.studentActivities[i] || {};
      result.push({
        phase: t.phase || s.phase || `Pha ${i + 1}`,
        teacher: t.details ? [t.details] : [],
        student: s.details ? [s.details] : [],
        boardContent: []
      });
    }
    return result;
  }
  return [];
}

interface KHBDViewerProps {
  plan: LessonPlan;
  onUpdatePlan: (updatedPlan: LessonPlan) => void;
  onBackToForm: () => void;
  onNewLesson?: () => void;
}

export const KHBDViewer: React.FC<KHBDViewerProps> = ({
  plan,
  onUpdatePlan,
  onBackToForm,
  onNewLesson
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPlan, setEditedPlan] = useState<LessonPlan>(plan);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "objectives" | "equipment" | "activities" | "appendices">("all");
  const [isExporting, setIsExporting] = useState(false);

  // Sync editedPlan when plan prop changes
  useEffect(() => {
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
    const lessonName = p.header.lessonName || p.header.lessonTitle;
    const periodsText = p.header.numberOfPeriods ? `${p.header.numberOfPeriods} tiết` : ".......... tiết";

    let md = `KẾ HOẠCH BÀI DẠY MÔN HOÁ HỌC\n\n`;
    md += `Tên Bài học/Chủ đề: ${displayOrDots(lessonName)}\n`;
    md += `Loại hình tổ chức: ${displayOrDots(p.header.organizationType, "......................................................................")}\n`;
    md += `Lớp: ${displayOrDots(p.header.grade, "...............")}\n`;
    md += `Thời gian thực hiện: ${periodsText}\n\n`;

    md += `### I. MỤC TIÊU\n#### 1. Kiến thức\n`;
    p.objectives.knowledge.forEach((k) => (md += `- ${removeLegacyCompetencyCode(k)}\n`));

    md += `\n#### 2. Năng lực\n`;
    md += `**a) Năng lực chung:**\n`;
    p.objectives.competencies.generalCompetencies.forEach((gc) => {
      const cleanName = removeLegacyCompetencyCode(gc.name);
      const cleanBehaviors = gc.specificBehaviors.map((b) => removeLegacyCompetencyCode(b)).join("; ");
      md += `- **${cleanName}:** ${cleanBehaviors}\n`;
    });

    md += `\n**b) Năng lực hóa học (theo CT GDPT 2018):**\n`;
    p.objectives.competencies.chemistryCompetencies.forEach((cc) => {
      const cleanName = removeLegacyCompetencyCode(cc.name);
      const cleanDesc = removeLegacyCompetencyCode(cc.description);
      const cleanBehaviors = cc.specificBehaviors.map((b) => removeLegacyCompetencyCode(b)).join("; ");
      const fullDesc = cleanDesc && cleanBehaviors ? `${cleanDesc} (Biểu hiện: ${cleanBehaviors})` : cleanDesc || cleanBehaviors;
      md += `- **${cleanName}:** ${fullDesc}\n`;
    });

    if (p.objectives.competencies.digitalCompetencies?.length) {
      md += `\n**c) Năng lực số (lồng ghép nếu có):**\n`;
      p.objectives.competencies.digitalCompetencies.forEach((dc) => {
        const code = formatDigitalCompetencyCode(dc.code);
        const rawDesc = removeLegacyCompetencyCode(dc.evidence || dc.name);
        const desc = cleanCompetencyDescription(code, rawDesc);
        md += `- **${code}:** ${desc}\n`;
      });
    }

    if (p.objectives.competencies.aiCompetencies?.length) {
      md += `\n**d) Năng lực AI (theo QĐ 2422/QĐ-BGDĐT):**\n`;
      p.objectives.competencies.aiCompetencies.forEach((ai) => {
        const code = formatAICode(ai.code);
        const rawDesc = removeLegacyCompetencyCode(ai.evidence || ai.name);
        const desc = cleanCompetencyDescription(code, rawDesc);
        md += `- **${code}:** ${desc}\n`;
      });
    }

    if (p.objectives.competencies.englishCompetencies?.length) {
      md += `\n**e) Năng lực tiếng Anh / Danh pháp quốc tế IUPAC:**\n`;
      p.objectives.competencies.englishCompetencies.forEach((eng) => {
        const aspect = removeLegacyCompetencyCode(eng.aspect);
        const evidence = removeLegacyCompetencyCode(eng.evidence);
        const terms = eng.terminology?.length ? ` (Thuật ngữ: ${eng.terminology.join(", ")})` : "";
        md += `- **${aspect}:** ${evidence}${terms}\n`;
      });
    }

    md += `\n#### 3. Phẩm chất\n`;
    p.objectives.qualities.forEach((q) => {
      md += `- **${removeLegacyCompetencyCode(q.name)}:** ${removeLegacyCompetencyCode(q.evidence)}\n`;
    });

    md += `\n### II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU\n`;
    md += `- **Giáo viên:** ${p.equipmentAndMaterials.teacher.map(t => removeLegacyCompetencyCode(t)).join("; ")}\n`;
    md += `- **Học sinh:** ${p.equipmentAndMaterials.students.map(s => removeLegacyCompetencyCode(s)).join("; ")}\n\n`;

    md += `### IV. TIẾN TRÌNG DẠY HỌC\n`;
    p.learningActivities.forEach((act) => {
      md += `\n#### ${act.typeLabel || act.title} (${act.durationMinutes} phút - Tiết ${act.period})\n`;
      if (act.bigQuestion && cleanBigQuestion(act.bigQuestion)) {
        md += `- **Câu hỏi lớn:** ${cleanBigQuestion(act.bigQuestion)}\n`;
      }
      md += `- **a) Mục tiêu:** ${act.objective}\n`;
      md += `- **b) Nội dung:** ${act.content}\n`;
      md += `- **c) Sản phẩm:** ${act.product}\n`;
      md += `- **d) Tổ chức thực hiện:**\n\n`;
      md += `| HOẠT ĐỘNG CỦA GV | HOẠT ĐỘNG CỦA HS | NỘI DUNG GHI BẢNG |\n|---|---|---|\n`;
      const phases = normalizePhases(act.organization);
      phases.forEach((phase) => {
        const tText = `**${phase.phase}:** ` + phase.teacher.map(removeLegacyCompetencyCode).join(" ").replace(/\|/g, "\\|").replace(/\n/g, " ");
        const sText = phase.student.map(removePhasePrefix).map(removeLegacyCompetencyCode).join(" ").replace(/\|/g, "\\|").replace(/\n/g, " ");
        const bText = phase.boardContent.map(removePhasePrefix).map(removeLegacyCompetencyCode).join("; ").replace(/\|/g, "\\|").replace(/\n/g, " ");
        md += `| ${tText} | ${sText} | ${bText} |\n`;
      });
    });

    if (p.appendices.worksheets?.length) {
      md += `\n### V. PHỤ LỤC\n`;
      md += `\n#### 1. Phiếu học tập (Worksheets):\n`;
      p.appendices.worksheets.forEach((ws, wIdx) => {
        md += `\n---\n**${ws.title || `PHIẾU HỌC TẬP SỐ ${wIdx + 1}`}**\n`;
        if (ws.activityName) md += `**Tên hoạt động:** ${ws.activityName}\n`;
        md += `**Nhóm:** ....................................\n**Lớp:** ....................................\n\n`;
        const tasks = normalizeWorksheetTasks(ws);
        tasks.forEach((task, tIdx) => {
          if (task.title) md += `**${task.title}**\n`;
          if (task.instruction) md += `${task.instruction}\n`;
          task.questions.forEach((q, qIdx) => {
            const formattedQ = /^Câu\s*\d+/i.test(q) || /^\d+[\.:]/i.test(q) ? q : `Câu ${qIdx + 1}. ${q}`;
            md += `${formattedQ}\n........................................................................\n........................................................................\n`;
          });
        });
        md += `\n**Kết luận của nhóm:**\n........................................................................\n........................................................................\n---\n`;
      });
    }

    md += `\n#### 2. Bảng kiểm đánh giá hoạt động và thảo luận nhóm:\n\n`;
    md += `| STT | Tiêu chí đánh giá | Đạt | Chưa đạt | Ghi chú |\n|---|---|:---:|:---:|---|\n`;
    const checkCriteria = p.appendices.rubrics?.find(r => r.title?.toUpperCase().includes("BẢNG KIỂM"))?.checklistCriteria || DEFAULT_GROUP_ASSESSMENT_CRITERIA;
    checkCriteria.forEach((crit, cIdx) => {
      md += `| ${cIdx + 1} | ${crit} | □ | □ | |\n`;
    });

    if (p.appendices.safetyNotes?.length) {
      md += `\n#### 3. Lưu ý an toàn thí nghiệm / Hóa chất:\n`;
      p.appendices.safetyNotes.forEach((note) => {
        md += `- ${note}\n`;
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
            IV. Tiến trình ({plan.learningActivities.length} HĐ)
          </button>
          <button
            onClick={() => setActiveTab("appendices")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "appendices" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            V. Phụ lục ({plan.appendices.worksheets?.length || 0} Phiếu HT)
          </button>
        </div>

        {/* Right: Export & Editing Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {onNewLesson && (
            <button
              type="button"
              onClick={onNewLesson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300 transition-colors shadow-2xs"
              title="Xóa bài hiện tại và mở form để soạn bài dạy mới"
            >
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>Soạn bài mới</span>
            </button>
          )}

          <button
            type="button"
            onClick={onBackToForm}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
            title="Quay lại form nhập liệu để điều chỉnh thông tin bài dạy"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Quay lại form</span>
          </button>

          {isEditMode ? (
            <button
              type="button"
              onClick={handleSaveChanges}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Lưu chỉnh sửa</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold rounded-lg border border-blue-200 transition-colors"
            >
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>Chỉnh sửa trực tiếp</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
            title="Sao chép nội dung văn bản Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span className="hidden sm:inline">{copied ? "Đã sao chép" : "Sao chép"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
            title="In hoặc Lưu PDF"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">In / PDF</span>
          </button>

          <button
            type="button"
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
        
        {/* Document Header */}
        <div className="khbd-document-header pb-4 mb-6 border-b border-slate-200">
          <h1 className="khbd-main-title">
            KẾ HOẠCH BÀI DẠY MÔN HOÁ HỌC
          </h1>

          <p>
            <strong>Tên Bài học/Chủ đề: </strong>
            {displayOrDots(plan.header.lessonName || plan.header.lessonTitle)}
          </p>

          <p>
            <strong>Loại hình tổ chức: </strong>
            {displayOrDots(plan.header.organizationType, "......................................................................")}
          </p>

          <p>
            <strong>Lớp: </strong>
            {displayOrDots(plan.header.grade, "...............")}
          </p>

          <p>
            <strong>Thời gian thực hiện: </strong>
            {plan.header.numberOfPeriods
              ? `${plan.header.numberOfPeriods} tiết`
              : ".......... tiết"}
          </p>
        </div>

        {/* SECTION I: MỤC TIÊU */}
        {(activeTab === "all" || activeTab === "objectives") && (
          <section className="mb-8 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif border-b border-slate-200 pb-1 flex items-center gap-2">
              <span>I. MỤC TIÊU</span>
            </h3>

            {/* 1. Kiến thức */}
            <div className="space-y-1.5 pl-2">
              <h4 className="text-sm font-bold text-slate-900">1. Kiến thức:</h4>
              <div className="space-y-1 text-xs text-slate-800 leading-relaxed pl-2">
                {plan.objectives.knowledge.map((k, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-slate-500 shrink-0">-</span>
                    <span>{removeLegacyCompetencyCode(k)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Năng lực */}
            <div className="space-y-3 pl-2">
              <h4 className="text-sm font-bold text-slate-900">2. Năng lực:</h4>

              {/* a) Năng lực chung */}
              <div className="space-y-1.5 pl-2">
                <p className="text-xs font-bold text-slate-900">a) Năng lực chung:</p>
                <div className="space-y-1.5 pl-2">
                  {plan.objectives.competencies.generalCompetencies.map((gc, idx) => {
                    const cleanName = removeLegacyCompetencyCode(gc.name);
                    const cleanBehaviors = gc.specificBehaviors.map((b) => removeLegacyCompetencyCode(b)).join("; ");
                    return (
                      <div key={idx} className="text-xs text-slate-800 leading-relaxed flex items-start gap-1.5">
                        <span className="text-slate-500 shrink-0">-</span>
                        <div>
                          <strong className="text-slate-900">{cleanName}: </strong>
                          <span>{cleanBehaviors}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* b) Năng lực hóa học */}
              <div className="space-y-1.5 pl-2">
                <p className="text-xs font-bold text-slate-900">b) Năng lực hóa học (theo CT GDPT 2018):</p>
                <div className="space-y-1.5 pl-2">
                  {plan.objectives.competencies.chemistryCompetencies.map((cc, idx) => {
                    const cleanName = removeLegacyCompetencyCode(cc.name);
                    const cleanDesc = removeLegacyCompetencyCode(cc.description);
                    const cleanBehaviors = cc.specificBehaviors.map((b) => removeLegacyCompetencyCode(b)).join("; ");
                    return (
                      <div key={idx} className="text-xs text-slate-800 leading-relaxed flex items-start gap-1.5">
                        <span className="text-emerald-700 shrink-0">-</span>
                        <div>
                          <strong className="text-emerald-800">{cleanName}: </strong>
                          <span>{cleanDesc}</span>
                          {cleanBehaviors && <span className="italic text-slate-600"> (Biểu hiện: {cleanBehaviors})</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* c) Năng lực số */}
              {plan.objectives.competencies.digitalCompetencies &&
                plan.objectives.competencies.digitalCompetencies.length > 0 && (
                  <div className="space-y-1.5 pl-2">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>c) Năng lực số (lồng ghép nếu có):</span>
                    </p>
                    <div className="space-y-1 pl-2">
                      {plan.objectives.competencies.digitalCompetencies.map((dc, idx) => {
                        const code = formatDigitalCompetencyCode(dc.code);
                        const rawDesc = removeLegacyCompetencyCode(dc.evidence || dc.name);
                        const cleanDescription = cleanCompetencyDescription(code, rawDesc);
                        return (
                          <div key={idx} className="text-xs text-slate-800 leading-relaxed flex items-start gap-1.5">
                            <span className="text-blue-600 shrink-0">-</span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 text-[11px]">
                                {code}
                              </span>
                              <span>: {cleanDescription}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* d) Năng lực AI theo QĐ 2422 */}
              {plan.objectives.competencies.aiCompetencies &&
                plan.objectives.competencies.aiCompetencies.length > 0 && (
                  <div className="space-y-1.5 pl-2">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-600" />
                      <span>d) Năng lực AI (theo QĐ 2422/QĐ-BGDĐT):</span>
                    </p>
                    <div className="space-y-1 pl-2">
                      {plan.objectives.competencies.aiCompetencies.map((ai, idx) => {
                        const code = formatAICode(ai.code);
                        const rawDesc = removeLegacyCompetencyCode(ai.evidence || ai.name);
                        const cleanDescription = cleanCompetencyDescription(code, rawDesc);
                        return (
                          <div key={idx} className="text-xs text-slate-800 leading-relaxed flex items-start gap-1.5">
                            <span className="text-purple-600 shrink-0">-</span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="font-mono font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 text-[11px]">
                                {code}
                              </span>
                              <span>: {cleanDescription}</span>
                            </div>
                          </div>
                        );
                      })}
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
                      {plan.objectives.competencies.englishCompetencies.map((eng, idx) => {
                        const aspect = removeLegacyCompetencyCode(eng.aspect);
                        const evidence = removeLegacyCompetencyCode(eng.evidence);
                        return (
                          <div key={idx} className="text-xs text-slate-800 leading-relaxed flex items-start gap-1.5">
                            <span className="text-emerald-700 shrink-0">-</span>
                            <div>
                              <strong className="text-slate-900">{aspect}: </strong>
                              <span>{evidence}</span>
                              {eng.terminology?.length ? (
                                <span className="italic text-slate-600"> (Thuật ngữ: {eng.terminology.join(", ")})</span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>

            {/* 3. Phẩm chất */}
            <div className="space-y-1.5 pl-2">
              <h4 className="text-sm font-bold text-slate-900">3. Phẩm chất:</h4>
              <div className="space-y-1 text-xs text-slate-800 leading-relaxed pl-2">
                {plan.objectives.qualities.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-slate-500 shrink-0">-</span>
                    <div>
                      <strong className="text-slate-900">{removeLegacyCompetencyCode(q.name)}: </strong>
                      <span>{removeLegacyCompetencyCode(q.evidence)}</span>
                    </div>
                  </div>
                ))}
              </div>
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

        {/* SECTION IV: TIẾN TRÌNG DẠY HỌC */}
        {(activeTab === "all" || activeTab === "activities") && (
          <section className="mb-8 space-y-6">
            <h3 className="text-base font-bold text-blue-900 font-serif border-b border-blue-100 pb-1">
              IV. TIẾN TRÌNG DẠY HỌC
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
                {activity.bigQuestion && cleanBigQuestion(activity.bigQuestion) && (
                  <div className="p-2.5 bg-amber-50/90 border border-amber-200 rounded-lg text-xs text-amber-950 flex items-start gap-2">
                    <strong className="font-bold text-amber-900 shrink-0">Câu hỏi lớn:</strong>
                    <span className="italic">{cleanBigQuestion(activity.bigQuestion)}</span>
                  </div>
                )}

                {/* a, b, c specifications */}
                <div className="space-y-1 text-xs text-slate-800 leading-relaxed pl-1">
                  <p><strong className="text-slate-900">a) Mục tiêu:</strong> {activity.objective}</p>
                  <p><strong className="text-slate-900">b) Nội dung:</strong> {activity.content}</p>
                  <p><strong className="text-slate-900">c) Sản phẩm:</strong> {activity.product}</p>
                </div>

                {/* d) Tổ chức thực hiện - 3-Column Table */}
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">d) Tổ chức thực hiện:</p>
                  <div className="overflow-x-auto">
                    <table className="org-table">
                      <thead>
                        <tr>
                          <th style={{ width: "36%" }}>HOẠT ĐỘNG CỦA GV</th>
                          <th style={{ width: "36%" }}>HOẠT ĐỘNG CỦA HS</th>
                          <th style={{ width: "28%" }}>NỘI DUNG GHI BẢNG</th>
                        </tr>
                      </thead>
                      <tbody>
                        {normalizePhases(activity.organization).map((phase, pIdx) => {
                          const teacherItems = Array.isArray(phase.teacher) ? phase.teacher : [];
                          const studentItems = Array.isArray(phase.student)
                            ? phase.student.map(removePhasePrefix)
                            : [];
                          const boardItems = Array.isArray(phase.boardContent)
                            ? phase.boardContent.map(removePhasePrefix)
                            : [];

                          return (
                            <tr key={`${phase.phase}-${pIdx}`}>
                              {/* Cột 1: Hoạt động của GV */}
                              <td>
                                <p className="font-bold text-slate-900 mb-1">
                                  {phase.phase}:
                                </p>
                                <TextList items={teacherItems} useDash={false} />
                              </td>

                              {/* Cột 2: Hoạt động của HS (không lặp lại tên pha) */}
                              <td>
                                <TextList items={studentItems} useDash={false} />
                              </td>

                              {/* Cột 3: Nội dung ghi bảng */}
                              <td>
                                <TextList items={boardItems} useDash={false} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ))}
          </section>
        )}

        {/* SECTION V: PHỤ LỤC */}
        {(activeTab === "all" || activeTab === "appendices") && plan.appendices && (
          <section className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 font-serif border-b border-slate-300 pb-1">
              V. PHỤ LỤC & HỌC LIỆU
            </h3>

            {/* Worksheets (Phiếu học tập) */}
            {plan.appendices.worksheets && plan.appendices.worksheets.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">1. Phiếu học tập (Worksheets):</h4>
                {plan.appendices.worksheets.map((ws, wIdx) => {
                  const tasks = normalizeWorksheetTasks(ws);
                  return (
                    <div key={ws.id || wIdx} className="worksheet-box shadow-xs">
                      <div className="worksheet-title uppercase">
                        {ws.title || `PHIẾU HỌC TẬP SỐ ${wIdx + 1}`}
                      </div>

                      {ws.activityName && (
                        <p className="worksheet-meta font-bold">
                          Tên hoạt động: {ws.activityName}
                        </p>
                      )}

                      <div className="worksheet-meta space-y-1">
                        <p><strong>Nhóm: </strong>....................................</p>
                        <p><strong>Lớp: </strong>....................................</p>
                      </div>

                      {tasks.map((task, tIdx) => (
                        <div key={tIdx} className="worksheet-task">
                          {task.title && (
                            <p className="font-bold text-black mb-1">{task.title}</p>
                          )}
                          {task.instruction && (
                            <p className="text-black text-justify mb-2">{task.instruction}</p>
                          )}
                          {task.questions.map((q, qIdx) => {
                            const formattedQ = /^Câu\s*\d+/i.test(q) || /^\d+[\.:]/i.test(q)
                              ? q
                              : `Câu ${qIdx + 1}. ${q}`;
                            return (
                              <div key={qIdx} className="worksheet-question">
                                <p className="text-black">{formattedQ}</p>
                                <div className="answer-space">
                                  ........................................................................................................................
                                  <br />
                                  ........................................................................................................................
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}

                      <div className="worksheet-task mt-2">
                        <p className="font-bold text-black mb-1">Kết luận của nhóm:</p>
                        <div className="answer-space">
                          ........................................................................................................................
                          <br />
                          ........................................................................................................................
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bảng kiểm đánh giá hoạt động và thảo luận nhóm */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">2. Bảng kiểm đánh giá hoạt động và thảo luận nhóm:</h4>
              
              {(() => {
                const groupRubric = plan.appendices.rubrics?.find(
                  (r) => r.title?.toUpperCase().includes("BẢNG KIỂM") || r.checklistCriteria?.length
                );
                const criteria = groupRubric?.checklistCriteria?.length
                  ? groupRubric.checklistCriteria
                  : DEFAULT_GROUP_ASSESSMENT_CRITERIA;

                return (
                  <div className="overflow-x-auto">
                    <p className="text-center font-bold text-sm text-black mb-2 uppercase font-serif">
                      {groupRubric?.title || "BẢNG KIỂM ĐÁNH GIÁ HOẠT ĐỘNG VÀ THẢO LUẬN NHÓM"}
                    </p>
                    <table className="assessment-checklist-table">
                      <thead>
                        <tr>
                          <th style={{ width: "7%" }}>STT</th>
                          <th style={{ width: "55%" }}>Tiêu chí đánh giá</th>
                          <th style={{ width: "10%" }}>Đạt</th>
                          <th style={{ width: "14%" }}>Chưa đạt</th>
                          <th style={{ width: "14%" }}>Ghi chú</th>
                        </tr>
                      </thead>
                      <tbody>
                        {criteria.map((criterion, cIdx) => (
                          <tr key={cIdx}>
                            <td className="text-center">{cIdx + 1}</td>
                            <td className="text-justify">{removeLegacyCompetencyCode(criterion)}</td>
                            <td className="text-center font-bold text-base">□</td>
                            <td className="text-center font-bold text-base">□</td>
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}

              {/* Other Rubrics with multi-level criteria */}
              {plan.appendices.rubrics && plan.appendices.rubrics.filter(r => !r.title?.toUpperCase().includes("BẢNG KIỂM") && Array.isArray(r.criteria) && r.criteria.length > 0).map((rubric, rIdx) => (
                <div key={rIdx} className="overflow-x-auto mt-4">
                  <p className="text-center font-bold text-sm text-black mb-2 uppercase font-serif">
                    {rubric.title}
                  </p>
                  <table className="khbd-table">
                    <thead>
                      <tr>
                        <th style={{ width: "7%" }}>STT</th>
                        <th style={{ width: "28%" }}>Tiêu chí</th>
                        <th style={{ width: "65%" }}>Mô tả các mức độ đạt được</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rubric.criteria?.map((crit, cIdx) => {
                        const cName = typeof crit === "string" ? crit : crit.name;
                        const cLevels = typeof crit === "string" || !Array.isArray(crit.levels) ? [] : crit.levels;
                        return (
                          <tr key={cIdx}>
                            <td className="text-center">{cIdx + 1}</td>
                            <td className="font-semibold text-justify">{removeLegacyCompetencyCode(cName)}</td>
                            <td>
                              <ul className="space-y-1 text-justify">
                                {cLevels.map((lvl, lIdx) => (
                                  <li key={lIdx}>- {removeLegacyCompetencyCode(lvl)}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Safety Notes */}
            {plan.appendices.safetyNotes && plan.appendices.safetyNotes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">3. Lưu ý an toàn thí nghiệm / Hóa chất:</h4>
                <div className="p-3 bg-white border border-slate-900 rounded-none text-xs text-black space-y-1 font-serif">
                  {plan.appendices.safetyNotes.map((note, nIdx) => (
                    <div key={nIdx} className="flex items-start gap-1.5">
                      <span className="font-bold">-</span>
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
