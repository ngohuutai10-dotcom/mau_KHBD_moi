/**
 * Tiện ích chuẩn hóa và kiểm tra mã Năng lực số (NLS)
 * Chuẩn định dạng: [miền].[thành phần]NC[bậc][ký hiệu] (Ví dụ: 1.2NC2a)
 */

export function formatDigitalCompetencyCode(value: string): string {
  if (!value) return "";

  return String(value)
    .trim()
    .replace(/\s+/g, "")
    .replace(/_/g, "")
    .replace(
      /^(\d+\.\d+)[-]?NC(\d+[a-z])$/i,
      "$1NC$2"
    );
}

export function isValidDigitalCompetencyCode(value: string): boolean {
  const code = formatDigitalCompetencyCode(value);
  return /^\d+\.\d+NC\d+[a-z]$/i.test(code);
}

export function cleanDigitalCompetencyDescription(
  code: string,
  description: string
): string {
  if (!description) return "";

  const normalizedCode = formatDigitalCompetencyCode(code);
  let text = String(description).trim();

  if (normalizedCode) {
    const escapedCode = normalizedCode.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    text = text.replace(
      new RegExp(
        `^\\s*${escapedCode}\\s*[:：-]?\\s*`,
        "i"
      ),
      ""
    );
  }

  // Also remove any leading variations such as "1.2 NC2a:", "1.2-NC2a -", etc.
  text = text.replace(
    /^\s*\d+\.\d+\s*[-_]?\s*NC\s*\d+[a-zA-Z]\s*[:：-]?\s*/i,
    ""
  );

  return text.trim();
}
