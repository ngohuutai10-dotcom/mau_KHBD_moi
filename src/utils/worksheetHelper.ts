/**
 * Helper utilities for Worksheet (Phiếu học tập) and Assessment Checklist (Bảng kiểm đánh giá)
 */

import type { Worksheet, WorksheetTask } from "../types";

export const DEFAULT_GROUP_ASSESSMENT_CRITERIA: string[] = [
  "Tham gia đầy đủ vào hoạt động nhóm",
  "Thực hiện đúng nhiệm vụ được phân công",
  "Chủ động trao đổi và đóng góp ý kiến",
  "Lắng nghe và tôn trọng ý kiến của thành viên khác",
  "Sử dụng bằng chứng để giải thích hoặc bảo vệ ý kiến",
  "Tham gia phản biện và điều chỉnh kết quả khi cần",
  "Hợp tác để hoàn thành sản phẩm đúng thời gian"
];

/**
 * Remove solutions, hints, answer keys from worksheet text
 */
export function sanitizeWorksheetContent(content: string): string {
  if (!content) return "";

  let text = String(content);

  // Patterns indicating start of solutions/answers
  const solutionPatterns = [
    /\n*\s*(?:Hướng dẫn giải|Hướng dẫn thực hiện|Gợi ý giải|Đáp án gợi ý|Đáp án chi tiết|Đáp án|Lời giải|Gợi ý|Cách giải|Solution|Answer key|Key answer)\s*[:：\-–—][\s\S]*$/i,
    /\n*\s*\*{1,2}(?:Hướng dẫn giải|Gợi ý giải|Đáp án|Lời giải)\*{1,2}\s*[:：\-–—]?[\s\S]*$/i
  ];

  for (const pattern of solutionPatterns) {
    text = text.replace(pattern, "");
  }

  // Remove lines that explicitly give away answers
  const lines = text.split("\n");
  const filteredLines: string[] = [];
  let skippingSolutionBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (
      /^(?:Hướng dẫn giải|Gợi ý giải|Đáp án gợi ý|Đáp án|Lời giải|Gợi ý|Cách giải)\s*[:：\-–—]/i.test(
        trimmed
      ) ||
      /^\*{1,2}(?:Hướng dẫn giải|Gợi ý giải|Đáp án|Lời giải)\*{1,2}/i.test(trimmed)
    ) {
      skippingSolutionBlock = true;
      continue;
    }

    if (skippingSolutionBlock) {
      // If we encounter another task/question, stop skipping
      if (/^(?:Nhiệm vụ|Câu \d+|Bài \d+|\d+\.)/i.test(trimmed)) {
        skippingSolutionBlock = false;
        filteredLines.push(line);
      }
      continue;
    }

    filteredLines.push(line);
  }

  return filteredLines.join("\n").trim();
}

/**
 * Normalizes worksheet into structured tasks if only raw content is provided
 */
export function normalizeWorksheetTasks(worksheet: Worksheet): WorksheetTask[] {
  if (Array.isArray(worksheet.tasks) && worksheet.tasks.length > 0) {
    return worksheet.tasks.map((task) => ({
      title: task.title?.trim() || undefined,
      instruction: task.instruction?.trim() || undefined,
      questions: Array.isArray(task.questions)
        ? task.questions.map((q) => sanitizeWorksheetContent(q).trim()).filter(Boolean)
        : []
    }));
  }

  if (!worksheet.content) {
    return [];
  }

  const cleanContent = sanitizeWorksheetContent(worksheet.content);
  const lines = cleanContent.split("\n").map((l) => l.trim()).filter(Boolean);

  const tasks: WorksheetTask[] = [];
  let currentTask: WorksheetTask = {
    title: undefined,
    instruction: undefined,
    questions: []
  };

  for (const line of lines) {
    if (/^Nhiệm vụ\s*\d+/i.test(line) || /^Phần\s*\d+/i.test(line)) {
      if (currentTask.questions.length > 0 || currentTask.instruction || currentTask.title) {
        tasks.push(currentTask);
      }
      currentTask = {
        title: line,
        instruction: undefined,
        questions: []
      };
      continue;
    }

    if (/^Câu\s*\d+[:\.]/i.test(line) || /^\d+[\.:]\s+/i.test(line)) {
      currentTask.questions.push(line);
      continue;
    }

    if (currentTask.questions.length === 0 && !currentTask.instruction) {
      currentTask.instruction = line;
    } else {
      currentTask.questions.push(line);
    }
  }

  if (currentTask.questions.length > 0 || currentTask.instruction || currentTask.title) {
    tasks.push(currentTask);
  }

  return tasks.length > 0
    ? tasks
    : [
        {
          title: undefined,
          instruction: undefined,
          questions: lines
        }
      ];
}
