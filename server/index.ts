import express from "express";
import path from "path";
import multer from "multer";
import mammoth from "mammoth";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { lessonPlanGeminiSchema, type LessonPlan } from "./schema";
import { buildSystemInstruction, buildUserPrompt, type GenerateSettings } from "./prompt";
import {
  formatAICode,
  formatDigitalCompetencyCode,
  removeLegacyCompetencyCode,
  cleanBigQuestion
} from "./competencyHelper";
import {
  CHEMISTRY_COMPETENCY_FRAMEWORK,
  GENERAL_COMPETENCIES,
  DIGITAL_COMPETENCY_FRAMEWORK,
  AI_COMPETENCY_FRAMEWORK_2422,
  CORE_QUALITIES
} from "./reference";

dotenv.config();

// Validation helper for 3-column 4-phase requirement
const STANDARD_PHASES: Array<
  "Chuyển giao nhiệm vụ học tập" | "Thực hiện nhiệm vụ" | "Báo cáo kết quả và thảo luận" | "Kết luận và nhận định"
> = [
  "Chuyển giao nhiệm vụ học tập",
  "Thực hiện nhiệm vụ",
  "Báo cáo kết quả và thảo luận",
  "Kết luận và nhận định"
];

function validateLessonPlan(plan: LessonPlan): string[] {
  const errors: string[] = [];
  if (!plan || !Array.isArray(plan.learningActivities) || plan.learningActivities.length === 0) {
    errors.push("Thiếu danh sách hoạt động dạy học.");
    return errors;
  }

  plan.learningActivities.forEach((act, actIdx) => {
    if (!Array.isArray(act.organization) || act.organization.length === 0) {
      errors.push(`Hoạt động ${actIdx + 1} (${act.title}): Thiếu cấu trúc tổ chức thực hiện 4 pha.`);
      return;
    }

    act.organization.forEach((phase, pIdx) => {
      const phaseName = phase.phase || `Pha ${pIdx + 1}`;
      if (!Array.isArray(phase.teacher) || phase.teacher.length === 0 || phase.teacher.every((t) => !t || !t.trim())) {
        errors.push(`Hoạt động ${actIdx + 1} (${phaseName}): Thiếu nội dung Hoạt động của GV`);
      }
      if (!Array.isArray(phase.student) || phase.student.length === 0 || phase.student.every((s) => !s || !s.trim())) {
        errors.push(`Hoạt động ${actIdx + 1} (${phaseName}): Thiếu nội dung Hoạt động của HS`);
      }
      if (!Array.isArray(phase.boardContent) || phase.boardContent.length === 0 || phase.boardContent.every((b) => !b || !b.trim())) {
        errors.push(`Hoạt động ${actIdx + 1} (${phaseName}): Thiếu Nội dung ghi bảng`);
      }
    });
  });

  return errors;
}

function sanitizeAndRepairPlan(plan: LessonPlan): void {
  if (!plan) return;

  // Clean and sanitize objectives
  if (plan.objectives) {
    if (Array.isArray(plan.objectives.knowledge)) {
      plan.objectives.knowledge = plan.objectives.knowledge.map((k) => removeLegacyCompetencyCode(k));
    }

    if (plan.objectives.competencies) {
      if (Array.isArray(plan.objectives.competencies.generalCompetencies)) {
        plan.objectives.competencies.generalCompetencies.forEach((gc) => {
          gc.name = removeLegacyCompetencyCode(gc.name);
          gc.code = ""; // Strip legacy codes like TCTH, GTHT, GQVBSC
          if (Array.isArray(gc.specificBehaviors)) {
            gc.specificBehaviors = gc.specificBehaviors.map((b) => removeLegacyCompetencyCode(b));
          }
        });
      }

      if (Array.isArray(plan.objectives.competencies.chemistryCompetencies)) {
        plan.objectives.competencies.chemistryCompetencies.forEach((cc) => {
          cc.name = removeLegacyCompetencyCode(cc.name);
          cc.component = ""; // Strip legacy codes like NTHH, THTGTN, VDKN
          cc.description = removeLegacyCompetencyCode(cc.description);
          if (Array.isArray(cc.specificBehaviors)) {
            cc.specificBehaviors = cc.specificBehaviors.map((b) => removeLegacyCompetencyCode(b));
          }
        });
      }

      if (Array.isArray(plan.objectives.competencies.digitalCompetencies)) {
        plan.objectives.competencies.digitalCompetencies.forEach((dc) => {
          dc.code = formatDigitalCompetencyCode(dc.code);
          dc.name = removeLegacyCompetencyCode(dc.name);
          dc.evidence = removeLegacyCompetencyCode(dc.evidence);
        });
      }

      if (Array.isArray(plan.objectives.competencies.aiCompetencies)) {
        plan.objectives.competencies.aiCompetencies.forEach((ai) => {
          ai.code = formatAICode(ai.code);
          ai.name = removeLegacyCompetencyCode(ai.name);
          ai.evidence = removeLegacyCompetencyCode(ai.evidence);
        });
      }

      if (Array.isArray(plan.objectives.competencies.englishCompetencies)) {
        plan.objectives.competencies.englishCompetencies.forEach((ec) => {
          ec.aspect = removeLegacyCompetencyCode(ec.aspect);
          ec.evidence = removeLegacyCompetencyCode(ec.evidence);
        });
      }
    }

    if (Array.isArray(plan.objectives.qualities)) {
      plan.objectives.qualities.forEach((q) => {
        q.name = removeLegacyCompetencyCode(q.name);
        q.evidence = removeLegacyCompetencyCode(q.evidence);
      });
    }
  }

  if (!Array.isArray(plan.learningActivities)) return;

  plan.learningActivities.forEach((act, actIdx) => {
    if (act.bigQuestion) {
      act.bigQuestion = cleanBigQuestion(act.bigQuestion);
    }

    // If organization is not an array or has wrong shape (e.g. legacy object)
    if (!Array.isArray(act.organization)) {
      const legacyOrg = act.organization as any;
      if (legacyOrg && Array.isArray(legacyOrg.teacherActivities) && Array.isArray(legacyOrg.studentActivities)) {
        act.organization = STANDARD_PHASES.map((pName, idx) => {
          const tItem = legacyOrg.teacherActivities[idx] || {};
          const sItem = legacyOrg.studentActivities[idx] || {};
          return {
            phase: pName,
            teacher: [tItem.details || tItem.phase || "Giáo viên hướng dẫn và giao nhiệm vụ cho học sinh."],
            student: [sItem.details || sItem.phase || "Học sinh tiếp nhận nhiệm vụ và thực hiện theo hướng dẫn."],
            boardContent: [idx === 0 ? (act.bigQuestion || act.title) : idx === 3 ? act.product || "Chuẩn hóa kiến thức trọng tâm." : "Dữ liệu và phân tích."]
          };
        });
      } else {
        act.organization = STANDARD_PHASES.map((pName, idx) => ({
          phase: pName,
          teacher: ["Giáo viên triển khai nội dung bài học theo tiến trình sư phạm."],
          student: ["Học sinh chủ động tiếp nhận và thực hiện nhiệm vụ học tập."],
          boardContent: [idx === 0 ? (act.bigQuestion || act.title) : idx === 3 ? "Kiến thức trọng tâm bài học." : "Nội dung ghi bảng."]
        }));
      }
    }

    // Ensure all 4 standard phases exist
    if (act.organization.length < 4) {
      const existingPhases = act.organization.map((p) => p.phase);
      STANDARD_PHASES.forEach((stdPhase, idx) => {
        if (!existingPhases.includes(stdPhase)) {
          act.organization.push({
            phase: stdPhase,
            teacher: ["Giáo viên hướng dẫn học sinh thực hiện nhiệm vụ."],
            student: ["Học sinh tích cực tham gia hoạt động học tập."],
            boardContent: [idx === 0 ? (act.bigQuestion || act.title) : idx === 3 ? "Kiến thức chuẩn hóa cần ghi vở." : "Nội dung thảo luận/dữ liệu."]
          });
        }
      });
    }

    // Sanitize each phase
    act.organization.forEach((phase, idx) => {
      // Normalize phase name if not in standard list
      if (!STANDARD_PHASES.includes(phase.phase as any)) {
        phase.phase = STANDARD_PHASES[Math.min(idx, 3)];
      }

      // Ensure teacher array
      if (!Array.isArray(phase.teacher) || phase.teacher.length === 0) {
        phase.teacher = typeof (phase as any).teacher === "string" && (phase as any).teacher.trim()
          ? [(phase as any).teacher]
          : ["Giáo viên hướng dẫn và chuyển giao nhiệm vụ học tập."];
      }

      // Ensure student array
      if (!Array.isArray(phase.student) || phase.student.length === 0) {
        phase.student = typeof (phase as any).student === "string" && (phase as any).student.trim()
          ? [(phase as any).student]
          : ["Học sinh tiếp nhận và tích cực thực hiện nhiệm vụ."];
      }

      // Ensure boardContent array and non-empty
      if (!Array.isArray(phase.boardContent) || phase.boardContent.length === 0 || phase.boardContent.every((b) => !b || !b.trim())) {
        if (typeof (phase as any).boardContent === "string" && (phase as any).boardContent.trim()) {
          phase.boardContent = [(phase as any).boardContent];
        } else {
          if (phase.phase === "Chuyển giao nhiệm vụ học tập") {
            phase.boardContent = [act.bigQuestion ? act.bigQuestion : `Nhiệm vụ: ${act.title}`];
          } else if (phase.phase === "Thực hiện nhiệm vụ") {
            phase.boardContent = ["Dữ liệu thực nghiệm / Giả thuyết / Phương trình hóa học"];
          } else if (phase.phase === "Báo cáo kết quả và thảo luận") {
            phase.boardContent = ["Kết quả báo cáo của các nhóm & nội dung phản biện"];
          } else {
            phase.boardContent = [act.product || "Kiến thức chuẩn hóa bài học (khái niệm, quy luật, PTHH)."];
          }
        }
      }
    });
  });
}

const app = express();
const PORT = 3000;

// Configure multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 45 * 1024 * 1024, // 45 MB per file
    files: 8
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "text/markdown",
      "text/csv",
      "image/png",
      "image/jpeg",
      "image/webp"
    ];
    const allowedExtensions = [".pdf", ".docx", ".txt", ".md", ".csv", ".png", ".jpg", ".jpeg", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Định dạng tệp "${file.originalname}" không được hỗ trợ. Chỉ hỗ trợ PDF, DOCX, TXT, MD, CSV, PNG, JPG, WEBP.`));
    }
  }
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, status: "ok", timestamp: new Date().toISOString() });
});

// Reference Framework API
app.get("/api/reference", (_req, res) => {
  res.json({
    ok: true,
    chemistryCompetencies: CHEMISTRY_COMPETENCY_FRAMEWORK,
    generalCompetencies: GENERAL_COMPETENCIES,
    digitalCompetencies: DIGITAL_COMPETENCY_FRAMEWORK,
    aiCompetencies: AI_COMPETENCY_FRAMEWORK_2422,
    coreQualities: CORE_QUALITIES
  });
});

// Generate Lesson Plan API
app.post("/api/generate", upload.array("files", 8), async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: "Chưa cấu hình GEMINI_API_KEY trong biến môi trường hoặc Settings. Vui lòng thiết lập GEMINI_API_KEY để tiếp tục."
      });
    }

    let settings: GenerateSettings;
    try {
      settings = typeof req.body.settings === "string" ? JSON.parse(req.body.settings) : req.body.settings;
    } catch {
      return res.status(400).json({ ok: false, error: "Dữ liệu settings JSON không hợp lệ." });
    }

    if (!settings || !settings.lessonTitle) {
      return res.status(400).json({ ok: false, error: "Tên bài dạy không được để trống." });
    }

    const files = (req.files as Express.Multer.File[]) || [];
    let extractedTextFromDocs = "";
    const inlineGeminiParts: Array<{ inlineData: { data: string; mimeType: string } }> = [];

    for (const file of files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const mime = file.mimetype;

      if (mime === "application/pdf" || ext === ".pdf") {
        inlineGeminiParts.push({
          inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: "application/pdf"
          }
        });
      } else if (
        mime.startsWith("image/") ||
        [".png", ".jpg", ".jpeg", ".webp"].includes(ext)
      ) {
        let imageMime = mime;
        if (!imageMime || imageMime === "application/octet-stream") {
          if (ext === ".png") imageMime = "image/png";
          else if (ext === ".webp") imageMime = "image/webp";
          else imageMime = "image/jpeg";
        }
        inlineGeminiParts.push({
          inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: imageMime
          }
        });
      } else if (
        ext === ".docx" ||
        mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        try {
          const result = await mammoth.extractRawText({ buffer: file.buffer });
          extractedTextFromDocs += `\n--- NỘI DUNG TỆP DOCX: ${file.originalname} ---\n${result.value}\n`;
        } catch (docxErr) {
          console.warn(`Lỗi khi đọc file DOCX ${file.originalname}:`, docxErr);
        }
      } else {
        // TXT, MD, CSV, etc.
        const textContent = file.buffer.toString("utf-8");
        extractedTextFromDocs += `\n--- NỘI DUNG TỆP VĂN BẢN: ${file.originalname} ---\n${textContent}\n`;
      }
    }

    const ai = new GoogleGenAI({ apiKey });
    const primaryModel = settings.model || "gemini-3.6-flash";
    const systemInstruction = buildSystemInstruction();
    const userPromptText = buildUserPrompt(settings, extractedTextFromDocs);

    const contents: any[] = [];
    
    // Add inline files first if any
    for (const inlinePart of inlineGeminiParts) {
      contents.push(inlinePart);
    }
    
    // Add text prompt
    contents.push({ text: userPromptText });

    // Fallback list of models if 429 quota or 404 is hit on a specific model
    const candidateModels = [
      primaryModel,
      "gemini-3.6-flash",
      "gemini-3.7-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.1-pro-preview"
    ].filter((m, idx, arr) => arr.indexOf(m) === idx);

    let response: any = null;
    let usedModel = primaryModel;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        console.log(`Đang gọi mô hình Gemini: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: lessonPlanGeminiSchema,
            temperature: 0.3
          }
        });
        usedModel = modelName;
        break; // Success
      } catch (err: any) {
        lastError = err;
        const errStr = err?.toString?.() || "";
        console.warn(`Lỗi khi gọi mô hình ${modelName}:`, errStr);
        // If it's a 429 quota error, 404 model not found, or model overload error, try fallback model
        const isRetryable =
          errStr.includes("429") ||
          errStr.includes("RESOURCE_EXHAUSTED") ||
          errStr.includes("Quota exceeded") ||
          errStr.includes("404") ||
          errStr.includes("NOT_FOUND") ||
          errStr.includes("503") ||
          errStr.includes("overloaded") ||
          err?.status === 429 ||
          err?.status === 404;

        if (isRetryable) {
          continue;
        } else {
          // Break on fatal error (e.g. invalid API key)
          break;
        }
      }
    }

    if (!response || !response.text) {
      const errStr = lastError?.toString?.() || "";
      if (errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("Quota exceeded")) {
        return res.status(429).json({
          ok: false,
          error: "Hạn mức yêu cầu miễn phí (Free Tier Quota) của mô hình AI tạm thời đạt giới hạn (Lỗi 429). Vui lòng đợi khoảng 30 - 60 giây rồi nhấn 'Tạo Kế hoạch bài dạy' lại, hoặc chọn mô hình khác trong mục Cấu hình.",
          details: errStr
        });
      }
      throw lastError || new Error("Không nhận được nội dung phản hồi từ mô hình Gemini.");
    }

    const responseText = response.text;
    let lessonPlan: LessonPlan;
    try {
      lessonPlan = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Lỗi parse JSON từ Gemini:", responseText);
      return res.status(500).json({
        ok: false,
        error: "Không thể phân tích dữ liệu JSON từ mô hình. Vui lòng thử lại.",
        rawText: responseText
      });
    }

    // Always sanitize and guarantee 3-column & 4-phase standard in-place without wasting extra quota calls
    if (!lessonPlan.header) {
      (lessonPlan as any).header = {};
    }
    if (settings.organizationType) {
      lessonPlan.header.organizationType = settings.organizationType;
    }
    if (settings.lessonTitle || settings.lessonName) {
      lessonPlan.header.lessonTitle = settings.lessonTitle || settings.lessonName || lessonPlan.header.lessonTitle;
      lessonPlan.header.lessonName = lessonPlan.header.lessonTitle;
    }
    if (settings.grade) {
      lessonPlan.header.grade = settings.grade;
    }
    if (settings.numberOfPeriods) {
      lessonPlan.header.numberOfPeriods = settings.numberOfPeriods;
    }
    sanitizeAndRepairPlan(lessonPlan);

    return res.json({
      ok: true,
      success: true,
      lessonPlan,
      modelUsed: usedModel
    });
  } catch (error: any) {
    console.error("Lỗi khi tạo KHBD:", error);
    const errStr = error?.toString?.() || error?.message || "";
    let userFriendlyMsg = error.message || "Đã xảy ra lỗi khi tạo Kế hoạch bài dạy.";

    if (errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("Quota exceeded")) {
      userFriendlyMsg = "Hạn mức gọi AI tạm thời đạt giới hạn (Rate Limit / Quota Exceeded). Vui lòng đợi 30 - 60 giây và bấm tạo lại.";
    }

    return res.status(error?.status || 500).json({
      ok: false,
      error: userFriendlyMsg,
      details: errStr
    });
  }
});

// Multer and API Error Handling Middleware
app.use("/api", (err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        ok: false,
        error: "Kích thước tệp vượt quá giới hạn cho phép (tối đa 45 MB mỗi tệp)."
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        ok: false,
        error: "Số lượng tệp tải lên vượt quá giới hạn cho phép (tối đa 8 tệp)."
      });
    }
    return res.status(400).json({ ok: false, error: `Lỗi tải tệp: ${err.message}` });
  } else if (err) {
    return res.status(err.status || 400).json({ ok: false, error: err.message || "Đã xảy ra lỗi khi xử lý yêu cầu." });
  }
  next();
});

// Strict 404 for all undefined /api/* routes - NEVER return index.html
app.all("/api/*", (_req, res) => {
  res.status(404).json({ ok: false, error: "Đường dẫn API không tồn tại." });
});

// Setup Vite / Static handling
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Kế hoạch bài dạy Hóa học THPT đang chạy trên port ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Không thể khởi động server:", err);
  process.exit(1);
});
