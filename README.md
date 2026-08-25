# App Soạn KHBD Hóa học THPT - Google AI Studio

Ứng dụng full-stack React + Node.js để soạn Kế hoạch bài dạy Hóa học THPT, có:

- KHBD theo cấu trúc đã chuẩn hóa.
- Mỗi tiết 45 phút, đủ Khởi động - Hình thành kiến thức - Luyện tập - Vận dụng.
- Câu hỏi lớn/vấn đề lớn, tìm tòi, khám phá, thảo luận và phản biện.
- Năng lực chung và 3 thành phần năng lực Hóa học được cụ thể hóa bằng hành vi học sinh.
- Năng lực số theo mã thành phần của Khung năng lực số.
- Năng lực AI theo đúng mã QĐ 2422/QĐ-BGDĐT cho lớp 10, 11, 12.
- Năng lực tiếng Anh lồng ghép khi phù hợp.
- Phẩm chất chỉ chọn trong 5 phẩm chất chủ yếu và phải có minh chứng hoạt động.
- Đọc tài liệu PDF/ảnh trực tiếp bằng Gemini; trích xuất DOCX bằng mammoth.
- Xuất Word `.docx` A4, Times New Roman, bảng hoạt động GV/HS 2 cột.

## Dùng trong Google AI Studio Build

### Cách khuyến nghị

1. Đưa thư mục này lên một repository GitHub.
2. Mở Google AI Studio -> Build -> Import from GitHub.
3. Chọn repository.
4. AI Studio sẽ tạo môi trường full-stack. Với app Gemini mới, `GEMINI_API_KEY` nên nằm ở server-side Secrets.
5. Nếu Agent yêu cầu mô tả, dán nội dung `BUILD_PROMPT.txt`.
6. Chạy app, nhập tên bài và tải tài liệu nguồn.

## Chạy local

```bash
npm install
cp .env.example .env
# điền GEMINI_API_KEY vào .env hoặc export biến môi trường
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8787`

## Biến môi trường

- `GEMINI_API_KEY`: bắt buộc.
- `PORT`: mặc định 8787.

## Lưu ý

- PDF và ảnh được gửi vào Gemini để đọc trực tiếp, phù hợp cả tài liệu scan.
- DOCX/TXT/MD/CSV được chuyển thành văn bản ở server.
- Mỗi file tối đa 20 MB; tối đa 8 file/lần tạo.
- `gemini-3.7-flash` là model mặc định. Có thể chọn `gemini-3.1-pro-preview` nếu muốn ưu tiên chất lượng và chấp nhận model preview.
