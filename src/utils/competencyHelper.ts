/**
 * Helpers for formatting competencies according to CT GDPT 2018 & QD 2422/QD-BGDDT
 */

export function formatAICode(code: string): string {
  if (!code) return "";
  return code
    .trim()
    .replace(/^(\d{1,2})\.([A-D]\d)\.(MR\d+|\d+)$/i, "$1$2.$3");
}

export function formatDigitalCompetencyCode(code: string): string {
  if (!code) return "";
  return code
    .trim()
    .replace(/\s+/g, "")
    .replace(/-/g, "");
}

export function removeLegacyCompetencyCode(text: string): string {
  if (!text) return "";

  let result = text.trim();

  // Xóa dạng: (TCTH): TCTH.1;2;3 hoặc (NTHH): NTHH.1;2;3
  result = result.replace(
    /^\s*\*{0,2}\((TCTH|GTHT|GQVBSC|NTHH|THTGTN|VDKN)\)\*{0,2}\s*:?\s*(?:\1[\d.;]*)?\s*:?\s*/i,
    ""
  );

  // Xóa dạng không có ngoặc: TCTH.1;2;3: hoặc NTHH.1: hoặc (TCTH)
  result = result.replace(
    /^\s*(TCTH|GTHT|GQVBSC|NTHH|THTGTN|VDKN)[.\d;]*\s*:?\s*/i,
    ""
  );

  // Xóa ngoặc đơn chứa mã cũ nếu còn sót ở đầu chuỗi: (TCTH), (NTHH)
  result = result.replace(
    /^\s*\((TCTH|GTHT|GQVBSC|NTHH|THTGTN|VDKN)\)\s*:?\s*/i,
    ""
  );

  // Xóa dấu bullet cũ nếu có
  result = result.replace(/^[•●○▪◦]\s*/, "");

  // Xóa dấu "-" cũ để tránh thành "--"
  result = result.replace(/^-\s*/, "");

  return result.trim();
}

export function toDashLine(text: string): string {
  const clean = removeLegacyCompetencyCode(text);
  if (!clean) return "";
  return `- ${clean}`;
}

export const PHASE_PREFIXES = [
  "Chuyển giao nhiệm vụ học tập",
  "Thực hiện nhiệm vụ",
  "Báo cáo kết quả và thảo luận",
  "Kết luận và nhận định",
  "Chuyển giao nhiệm vụ",
  "Báo cáo thảo luận",
  "Báo cáo và thảo luận",
  "Kết luận nhận định"
];

export function removePhasePrefix(value: string): string {
  if (!value) return "";

  let result = value.trim();

  for (const prefix of PHASE_PREFIXES) {
    const regex = new RegExp(`^\\*{0,2}${prefix}\\*{0,2}\\s*[:：-]?\\s*`, "i");
    result = result.replace(regex, "");
  }

  return result.trim();
}

export function cleanBigQuestion(value?: string): string {
  if (!value) return "";

  return value
    .trim()
    .replace(/^[★•●○▪◦-]\s*/, "")
    .replace(
      /^\*{0,2}(Câu hỏi lớn\s*[\/\\-]\s*Vấn đề(?:\s*cốt\s*lõi|\s*lớn)?|Vấn đề(?:\s*lớn|\s*cốt\s*lõi)?\s*[\/\\-]\s*Câu hỏi lớn|Câu hỏi lớn\s*\/\s*Vấn đề lớn|Câu hỏi lớn|Vấn đề lớn|Vấn đề cốt lõi)\*{0,2}\s*[:：-]?\s*/i,
      ""
    )
    .trim();
}

export function displayOrDots(
  value: string | number | undefined | null,
  dots = "........................................................................"
): string {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return dots;
  }

  return String(value);
}
