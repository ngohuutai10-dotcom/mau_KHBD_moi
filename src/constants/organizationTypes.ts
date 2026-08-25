import type { OrganizationType } from "../types";

export interface OrganizationTypeOption {
  value: OrganizationType;
  label: string;
  description: string;
}

export const ORGANIZATION_TYPES: OrganizationTypeOption[] = [
  {
    value: "Dạy học trên lớp",
    label: "Dạy học trên lớp",
    description: "Giáo viên tổ chức bài học trong lớp học thông thường."
  },
  {
    value: "Hoạt động nhóm",
    label: "Hoạt động nhóm",
    description: "Học sinh làm việc theo nhóm để thảo luận, giải quyết nhiệm vụ."
  },
  {
    value: "Hoạt động trải nghiệm",
    label: "Hoạt động trải nghiệm",
    description: "Học sinh tham gia các hoạt động thực tế, tham quan, khảo sát, thực hành."
  },
  {
    value: "Dạy học dự án",
    label: "Dạy học dự án",
    description: "Học sinh thực hiện một dự án trong một khoảng thời gian để tạo ra sản phẩm."
  },
  {
    value: "Hoạt động STEM/STEAM",
    label: "Hoạt động STEM/STEAM",
    description: "Tích hợp kiến thức nhiều môn để giải quyết vấn đề thực tiễn."
  },
  {
    value: "Ngoại khóa/Câu lạc bộ",
    label: "Ngoại khóa/Câu lạc bộ",
    description: "Tổ chức ngoài giờ học chính khóa."
  },
  {
    value: "Học trực tuyến hoặc kết hợp (Blended Learning)",
    label: "Học trực tuyến hoặc kết hợp (Blended Learning)",
    description: "Tổ chức học qua nền tảng số hoặc kết hợp trực tiếp và trực tuyến."
  }
];
