import React, { useState, useRef } from "react";
import {
  Sparkles,
  Upload,
  FileText,
  Trash2,
  Cpu,
  Globe,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FolderPlus,
  Layers,
  GraduationCap,
  Building,
  User,
  Sliders
} from "lucide-react";
import type { GenerateSettings, LessonPlan } from "../types";
import { SAMPLE_LESSON_PLAN_EQUILIBRIUM } from "./SampleLessonPlans";

interface KHBDFormProps {
  onGenerateSuccess: (plan: LessonPlan) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSelectSample: (plan: LessonPlan) => void;
}

export const KHBDForm: React.FC<KHBDFormProps> = ({
  onGenerateSuccess,
  isLoading,
  setIsLoading,
  onSelectSample
}) => {
  const [settings, setSettings] = useState<GenerateSettings>({
    lessonTitle: "Cân bằng hóa học",
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
    model: "gemini-3.7-flash",
    specialRequests: ""
  });

  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const samplePresets = [
    {
      title: "Cân bằng hóa học",
      grade: "11",
      book: "Cánh Diều",
      periods: 2,
      desc: "Bản chất cân bằng động, hằng số Kc, Le Chatelier & phản ứng Haber-Bosch"
    },
    {
      title: "Alkane",
      grade: "11",
      book: "Kết nối tri thức",
      periods: 2,
      desc: "Đồng phân, danh pháp IUPAC, phản ứng thế halogen, khí biogas và bảo vệ môi trường"
    },
    {
      title: "Năng lượng hóa học",
      grade: "10",
      book: "Chân trời sáng tạo",
      periods: 2,
      desc: "Biến thiên enthalpy phản ứng, phản ứng tỏa nhiệt/thu nhiệt, năng lượng liên kết"
    },
    {
      title: "Pin điện và điện phân",
      grade: "12",
      book: "Cánh Diều",
      periods: 3,
      desc: "Thế điện cực chuẩn, pin Galvani, quá trình mạ điện và ứng dụng xe điện xanh"
    }
  ];

  const handleApplyPreset = (preset: typeof samplePresets[0]) => {
    setSettings((prev) => ({
      ...prev,
      lessonTitle: preset.title,
      grade: preset.grade,
      textbookSet: preset.book,
      numberOfPeriods: preset.periods,
      specialRequests: `Tập trung vào: ${preset.desc}`
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (files.length + selectedFiles.length > 8) {
        setErrorMessage("Bạn chỉ được tải lên tối đa 8 tệp tài liệu cùng lúc.");
        return;
      }
      setFiles((prev) => [...prev, ...selectedFiles].slice(0, 8));
      setErrorMessage(null);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (files.length + droppedFiles.length > 8) {
        setErrorMessage("Bạn chỉ được tải lên tối đa 8 tệp tài liệu cùng lúc.");
        return;
      }
      setFiles((prev) => [...prev, ...droppedFiles].slice(0, 8));
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!settings.lessonTitle.trim()) {
      setErrorMessage("Vui lòng nhập tên bài dạy.");
      return;
    }

    setIsLoading(true);
    setLoadingStep(1);

    // Simulated progress steps for better user transparency
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 4500);

    try {
      const formData = new FormData();
      formData.append("settings", JSON.stringify(settings));

      for (const file of files) {
        formData.append("files", file);
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error(data.error || "Không thể tạo Kế hoạch bài dạy. Vui lòng kiểm tra lại cấu hình.");
      }

      if (data.success && data.lessonPlan) {
        onGenerateSuccess(data.lessonPlan);
      } else {
        throw new Error("Dữ liệu phản hồi từ máy chủ không đúng định dạng.");
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error("Lỗi:", err);
      setErrorMessage(err.message || "Đã xảy ra lỗi trong quá trình tạo Kế hoạch bài dạy.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner / Quick Presets */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-blue-100 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Công nghệ Trợ lý Sư phạm AI THPT
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Soạn Kế hoạch bài dạy Hóa học chuẩn GDPT 2018
            </h2>
            <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed">
              Tự động hóa xây dựng mục tiêu 3 thành phần Năng lực Hóa học, Năng lực số, Năng lực AI theo QĐ 2422/QĐ-BGDĐT, tiến trình 4 pha sư phạm 2 cột và xuất file Word (.docx) chuẩn mực.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onSelectSample(SAMPLE_LESSON_PLAN_EQUILIBRIUM)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs shadow-md transition-all active:scale-98"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Xem mẫu KHBD Cân bằng hóa học</span>
            </button>
          </div>
        </div>

        {/* Quick Lesson Presets */}
        <div className="mt-5 pt-4 border-t border-white/15">
          <p className="text-xs font-semibold text-blue-200 mb-2">Gợi ý bài dạy mẫu nhanh:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-xs flex flex-col justify-between"
              >
                <div className="font-bold text-white truncate w-full">{preset.title}</div>
                <div className="text-[11px] text-blue-200 mt-0.5">
                  Lớp {preset.grade} • {preset.periods} tiết
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Generation Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Đã xảy ra lỗi:</p>
              <p className="text-xs leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Section 1: Lesson Overview */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Thông tin cơ bản bài dạy</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Lesson Title */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Tên bài dạy <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={settings.lessonTitle}
                onChange={(e) => setSettings({ ...settings, lessonTitle: e.target.value })}
                placeholder="VD: Cân bằng hóa học, Alkane, Năng lượng hóa học..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                required
              />
            </div>

            {/* Grade */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Khối lớp</label>
              <select
                value={settings.grade}
                onChange={(e) => setSettings({ ...settings, grade: e.target.value as any })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="10">Lớp 10 (THPT)</option>
                <option value="11">Lớp 11 (THPT)</option>
                <option value="12">Lớp 12 (THPT)</option>
              </select>
            </div>

            {/* Periods */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Thời lượng (Số tiết)</label>
              <select
                value={settings.numberOfPeriods}
                onChange={(e) => setSettings({ ...settings, numberOfPeriods: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value={1}>1 tiết (45 phút)</option>
                <option value={2}>2 tiết (90 phút)</option>
                <option value={3}>3 tiết (135 phút)</option>
                <option value={4}>4 tiết (180 phút)</option>
                <option value={5}>5 tiết (Chuyên đề/Dự án)</option>
              </select>
            </div>

            {/* Textbook Set */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Bộ sách giáo khoa</label>
              <select
                value={settings.textbookSet}
                onChange={(e) => setSettings({ ...settings, textbookSet: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Cánh Diều">Cánh Diều</option>
                <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống</option>
                <option value="Chân trời sáng tạo">Chân trời sáng tạo</option>
                <option value="Tổng hợp 3 bộ sách (Cánh Diều + Kết nối + Chân trời)">
                  Tích hợp liên bộ sách
                </option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="md:col-span-8 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Đối tượng học sinh</label>
              <input
                type="text"
                value={settings.targetAudience}
                onChange={(e) => setSettings({ ...settings, targetAudience: e.target.value })}
                placeholder="VD: Học sinh đại trà, Học sinh chọn định hướng KHTN..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Header Metadata */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Thông tin đơn vị & Giáo viên</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Tên trường THPT</label>
              <input
                type="text"
                value={settings.schoolName}
                onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                placeholder="VD: Trường THPT Chu Văn An"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Tổ chuyên môn</label>
              <input
                type="text"
                value={settings.department}
                onChange={(e) => setSettings({ ...settings, department: e.target.value })}
                placeholder="VD: Tổ Hóa học"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Họ và tên giáo viên</label>
              <input
                type="text"
                value={settings.teacherName}
                onChange={(e) => setSettings({ ...settings, teacherName: e.target.value })}
                placeholder="VD: Nguyễn Thị Mai"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Feature Toggles (NLS, AI 2422, English) */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Tích hợp Năng lực Đặc thù</h3>
              <p className="text-xs text-slate-500">Tự động gắn mã năng lực chuẩn và minh chứng hành vi vào từng hoạt động</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* AI Competency Toggle */}
            <label
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                settings.enableAICompetency
                  ? "bg-purple-50/80 border-purple-300 shadow-xs"
                  : "bg-slate-50 border-slate-200 opacity-70"
              }`}
            >
              <input
                type="checkbox"
                checked={settings.enableAICompetency}
                onChange={(e) => setSettings({ ...settings, enableAICompetency: e.target.checked })}
                className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-900">Năng lực AI (QĐ 2422)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Tích hợp mã AI1 - AI5: Prompt học tập, mô phỏng chất, phản biện ảo giác AI.
                </p>
              </div>
            </label>

            {/* Digital Competency Toggle */}
            <label
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                settings.enableDigitalCompetency
                  ? "bg-blue-50/80 border-blue-300 shadow-xs"
                  : "bg-slate-50 border-slate-200 opacity-70"
              }`}
            >
              <input
                type="checkbox"
                checked={settings.enableDigitalCompetency}
                onChange={(e) => setSettings({ ...settings, enableDigitalCompetency: e.target.checked })}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">Năng lực Số (NLS)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Tích hợp mã NLS1 - NLS6: Phần mềm PhET, MolView, xử lý bảng tính thực nghiệm.
                </p>
              </div>
            </label>

            {/* English Competency Toggle */}
            <label
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                settings.enableEnglishCompetency
                  ? "bg-emerald-50/80 border-emerald-300 shadow-xs"
                  : "bg-slate-50 border-slate-200 opacity-70"
              }`}
            >
              <input
                type="checkbox"
                checked={settings.enableEnglishCompetency}
                onChange={(e) => setSettings({ ...settings, enableEnglishCompetency: e.target.checked })}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900">Tiếng Anh & IUPAC</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Chuẩn hóa danh pháp quốc tế IUPAC và thuật ngữ chuyên ngành Hóa học.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Section 4: Source Documents Upload */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Tài liệu nguồn tham khảo (Tùy chọn)</h3>
                <p className="text-xs text-slate-500">Tải lên tối đa 8 file (PDF, DOCX, TXT, MD, CSV, PNG, JPG, WEBP - tối đa 20MB/file)</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
              {files.length}/8 tệp
            </span>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 rounded-2xl p-6 text-center transition-all cursor-pointer bg-slate-50/50"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.docx,.txt,.md,.csv,.png,.jpg,.jpeg,.webp,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,text/csv,image/*"
              className="hidden"
            />
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-800">
              Nhấp để chọn tệp hoặc kéo thả tài liệu vào đây
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Gemini đọc trực tiếp PDF và hình ảnh scan, trích xuất bảng biểu từ DOCX
            </p>
          </div>

          {/* Uploaded Files Tag List */}
          {files.length > 0 && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-medium text-slate-800 truncate" title={file.name}>
                      {file.name}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(idx);
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 5: Model Selection & Special Pedagogical Requests */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              5
            </div>
            <h3 className="font-bold text-slate-900 text-base">Cấu hình mô hình AI & Yêu cầu sư phạm</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Mô hình AI Gemini</label>
              <select
                value={settings.model}
                onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="gemini-3.7-flash">gemini-3.7-flash (Mặc định - Nhanh & Chuẩn xác)</option>
                <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Suy luận sư phạm nâng cao)</option>
              </select>
            </div>

            <div className="md:col-span-8 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Ghi chú / Yêu cầu sư phạm đặc biệt của giáo viên (Tùy chọn)
              </label>
              <input
                type="text"
                value={settings.specialRequests}
                onChange={(e) => setSettings({ ...settings, specialRequests: e.target.value })}
                placeholder="VD: Tăng cường câu hỏi phản biện, thiết kế phiếu học tập dạng KWL, thí nghiệm PhET..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Submit Button & Progress */}
        <div className="pt-4 border-t border-slate-200">
          {isLoading ? (
            <div className="p-6 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white animate-spin">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-base">
                  Đang khởi tạo Kế hoạch bài dạy Hóa học...
                </h4>
                <p className="text-xs text-slate-600">
                  {loadingStep === 1 && "Đang tiếp nhận và trích xuất nội dung tài liệu nguồn..."}
                  {loadingStep === 2 && "Đang đối chiếu Khung Năng lực Hóa học, NLS và QĐ 2422/QĐ-BGDĐT..."}
                  {loadingStep === 3 && "Đang thiết kế 4 pha tổ chức thực hiện 2 cột (Giáo viên - Học sinh)..."}
                  {loadingStep === 4 && "Đang hoàn thiện hệ thống Phiếu học tập, Rubrics và chuẩn hóa tài liệu..."}
                </p>
              </div>

              {/* Progress bar steps */}
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto pt-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      step <= loadingStep ? "bg-blue-600" : "bg-blue-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>BẮT ĐẦU SOẠN KẾ HOẠCH BÀI DẠY VỚI GEMINI AI</span>
            </button>
          )}
        </div>

      </form>
    </div>
  );
};
