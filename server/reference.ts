// Danh mục chuẩn khung năng lực và phẩm chất theo Chương trình GDPT 2018 và QĐ 2422/QĐ-BGDĐT

export const CHEMISTRY_COMPETENCY_FRAMEWORK = {
  name: "Khung Năng lực Hóa học (CT GDPT 2018)",
  components: [
    {
      code: "NTHH",
      name: "Nhận thức hóa học",
      description: "Nhận biết, nêu được, trình bày được, giải thích được các khái niệm, quy luật, cấu tạo chất, tính chất hóa học và phương trình phản ứng.",
      indicators: [
        "NTHH.1: Nêu được định nghĩa, khái niệm, tính chất vật lí, tính chất hoá học của các chất.",
        "NTHH.2: Viết được công thức hoá học, cấu tạo phân tử, phương trình hoá học biểu diễn phản ứng.",
        "NTHH.3: Giải thích được nguyên nhân gây ra tính chất hoặc biến đổi hoá học dựa trên cấu tạo chất.",
        "NTHH.4: So sánh, phân loại, hệ thống hoá các chất hoặc phản ứng hoá học theo các tiêu chí xác định."
      ]
    },
    {
      code: "THTGTN",
      name: "Tìm hiểu thế giới tự nhiên dưới góc độ hóa học",
      description: "Đề xuất vấn đề, lập kế hoạch tìm hiểu, tiến hành thí nghiệm/mô phỏng, thu thập và xử lí dữ liệu thực nghiệm, rút ra kết luận.",
      indicators: [
        "THTGTN.1: Đề xuất được câu hỏi, giả thuyết khoa học về hiện tượng hoá học hoặc chất hoá học.",
        "THTGTN.2: Lập kế hoạch và tiến hành thí nghiệm/mô phỏng an toàn, đúng quy trình.",
        "THTGTN.3: Quan sát, ghi chép hiện tượng, thu thập và xử lí số liệu thực nghiệm.",
        "THTGTN.4: Phân tích kết quả, thảo luận, phản biện và rút ra kết luận khoa học."
      ]
    },
    {
      code: "VDKN",
      name: "Vận dụng kiến thức, kĩ năng đã học",
      description: "Vận dụng kiến thức hoá học để giải thích hiện tượng đời sống, sản xuất, bảo vệ môi trường, ứng phó biến đổi khí hậu và sử dụng an toàn hoá chất.",
      indicators: [
        "VDKN.1: Vận dụng giải thích các hiện tượng thực tế đời sống, tự nhiên, sinh hoạt gia đình.",
        "VDKN.2: Đề xuất giải pháp bảo vệ môi trường, an toàn hoá chất, phòng chống cháy nổ.",
        "VDKN.3: Ứng dụng kiến thức hoá học vào sản xuất nông nghiệp, công nghiệp, y dược và vật liệu mới.",
        "VDKN.4: Thực hiện các dự án học tập, sản phẩm STEM liên quan đến hoá học."
      ]
    }
  ]
};

export const GENERAL_COMPETENCIES = [
  {
    code: "TCTH",
    name: "Tự chủ và tự học",
    description: "Tự giác tìm hiểu kiến thức, lập kế hoạch học tập, tự đánh giá và điều chỉnh quá trình học.",
    indicators: [
      "TCTH.1: Chủ động chuẩn bị bài, tự đọc tài liệu SGK và tài liệu bổ trợ trước giờ học.",
      "TCTH.2: Tự giác thực hiện các nhiệm vụ học tập được giao cá nhân, tích cực tìm kiếm câu trả lời.",
      "TCTH.3: Biết đánh giá kết quả học tập của bản thân và bạn học để rút kinh nghiệm."
    ]
  },
  {
    code: "GTHT",
    name: "Giao tiếp và hợp tác",
    description: "Biết lắng nghe, chia sẻ ý tưởng, phân công nhiệm vụ và phối hợp hiệu quả trong nhóm.",
    indicators: [
      "GTHT.1: Phân công nhiệm vụ nhóm rõ ràng, bình đẳng, cùng nhau giải quyết vấn đề học tập.",
      "GTHT.2: Trình bày ý kiến mạch lạc, lắng nghe và phản biện tôn trọng ý kiến thành viên khác.",
      "GTHT.3: Phối hợp ăn ý khi thực hiện thí nghiệm hoặc thiết kế báo cáo/poster."
    ]
  },
  {
    code: "GQVBSC",
    name: "Giải quyết vấn đề và sáng tạo",
    description: "Phát hiện vấn đề mới, đề xuất giải pháp độc đáo, sáng tạo sản phẩm học tập.",
    indicators: [
      "GQVBSC.1: Phát hiện được vấn đề khoa học từ các tình huống thực tiễn.",
      "GQVBSC.2: Đề xuất các phương án giải quyết vấn đề có tính khả thi và sáng tạo.",
      "GQVBSC.3: Thiết kế mô hình, sơ đồ tư duy hoặc giải pháp cải tiến hiệu quả."
    ]
  }
];

export const DIGITAL_COMPETENCY_FRAMEWORK = {
  name: "Khung Năng lực số (NLS) cho học sinh phổ thông",
  components: [
    {
      code: "NLS1",
      name: "Khai thác thông tin và dữ liệu số",
      description: "Tìm kiếm, lọc, đánh giá và lưu trữ thông tin hoá học từ các nguồn Internet, thư viện số.",
      subCodes: [
        { code: "NLS1.1", desc: "Tìm kiếm thông tin hoá học từ các công cụ tìm kiếm và nguồn tài liệu số đáng tin cậy." },
        { code: "NLS1.2", desc: "Đánh giá tính chính xác, khách quan của nguồn dữ liệu số về hoá học." },
        { code: "NLS1.3", desc: "Lưu trữ, sắp xếp và quản lí dữ liệu học tập số một cách khoa học." }
      ]
    },
    {
      code: "NLS2",
      name: "Giao tiếp và hợp tác trong môi trường số",
      description: "Chia sẻ tài liệu, thảo luận nhóm qua các nền tảng số (Padlet, Google Docs/Drive, Zalo, Teams).",
      subCodes: [
        { code: "NLS2.1", desc: "Sử dụng công cụ số để tương tác, thảo luận bài học với giáo viên và bạn bè." },
        { code: "NLS2.2", desc: "Hợp tác trực tuyến để cùng soạn thảo báo cáo, bảng dữ liệu hoặc bài trình chiếu." },
        { code: "NLS2.3", desc: "Tuân thủ quy tắc văn hoá và chuẩn mực ứng xử khi giao tiếp trên mạng." }
      ]
    },
    {
      code: "NLS3",
      name: "Sáng tạo nội dung số",
      description: "Tạo infographic, video thí nghiệm, mô hình 3D phân tử (MolView, Avogadro, PhET) hoặc bài thuyết trình Canva/PowerPoint.",
      subCodes: [
        { code: "NLS3.1", desc: "Tạo lập tài liệu số (infographic, slide, video, sơ đồ tư duy) biểu diễn kiến thức hoá học." },
        { code: "NLS3.2", desc: "Sử dụng phần mềm hoá học chuyên dụng hoặc mô phỏng (PhET, MolView, ChemSketch) để mô hình hoá." }
      ]
    },
    {
      code: "NLS4",
      name: "An toàn trong môi trường số",
      description: "Bảo vệ thông tin cá nhân, tuân thủ bản quyền, an toàn dữ liệu học tập trực tuyến.",
      subCodes: [
        { code: "NLS4.1", desc: "Bảo vệ quyền riêng tư, mật khẩu và dữ liệu học tập cá nhân trên các nền tảng." },
        { code: "NLS4.2", desc: "Tôn trọng bản quyền tác giả và dẫn nguồn hợp lệ khi sử dụng tài liệu số." }
      ]
    },
    {
      code: "NLS5",
      name: "Giải quyết vấn đề với sự hỗ trợ của công nghệ số",
      description: "Sử dụng bảng tính (Excel/Google Sheets) xử lí số liệu thực nghiệm, đồ thị nhiệt động, động học hoá học.",
      subCodes: [
        { code: "NLS5.1", desc: "Ứng dụng bảng tính hoặc công cụ phân tích để xử lí dữ liệu thực nghiệm hoá học." },
        { code: "NLS5.2", desc: "Sử dụng công nghệ số để tự động hoá hoặc tối ưu hoá quá trình học tập." }
      ]
    },
    {
      code: "NLS6",
      name: "Sử dụng thiết bị và phần mềm số",
      description: "Thao tác thành thạo máy tính, điện thoại thông minh, máy chiếu và các ứng dụng giáo dục.",
      subCodes: [
        { code: "NLS6.1", desc: "Sử dụng hiệu quả các thiết bị phần cứng phục vụ học tập (laptop, smartphone, máy tính bảng)." },
        { code: "NLS6.2", desc: "Cài đặt và vận hành các phần mềm, ứng dụng học tập hoá học thông dụng." }
      ]
    }
  ]
};

export const AI_COMPETENCY_FRAMEWORK_2422 = {
  name: "Khung Năng lực Trí tuệ nhân tạo (AI) theo Quyết định 2422/QĐ-BGDĐT cho THPT",
  components: [
    {
      code: "AI1",
      name: "Hiểu biết và nhận thức về AI",
      description: "Hiểu bản chất, tiềm năng và giới hạn của AI trong môn Hóa học và khoa học tự nhiên.",
      subCodes: [
        { code: "AI1.1", desc: "Nhận diện sự hiện diện và vai trò của các ứng dụng AI trong học tập Hóa học và đời sống." },
        { code: "AI1.2", desc: "Hiểu nguyên lí cơ bản cách thức AI xử lí ngôn ngữ tự nhiên và phân tích dữ liệu hóa học." },
        { code: "AI1.3", desc: "Phân biệt được AI với các phần mềm tính toán truyền thống." }
      ]
    },
    {
      code: "AI2",
      name: "Sử dụng và ứng dụng AI",
      description: "Sử dụng AI hỗ trợ học tập, tra cứu, thiết kế prompt hiệu quả và phân tích hiện tượng hóa học.",
      subCodes: [
        { code: "AI2.1", desc: "Sử dụng công cụ AI (Gemini, ChatGPT, v.v.) để tra cứu, tóm tắt và giải thích khái niệm hóa học." },
        { code: "AI2.2", desc: "Kỹ năng đặt câu lệnh (prompt engineering) rõ ràng, có ngữ cảnh để khai thác AI hiệu quả." },
        { code: "AI2.3", desc: "Dùng AI hỗ trợ gợi ý giả thuyết thực nghiệm, phân tích dữ liệu và dự đoán tính chất chất hóa học." },
        { code: "AI2.4", desc: "Sử dụng AI để chuyển đổi định dạng tài liệu, vẽ đồ thị hoặc tạo câu hỏi tự kiểm tra." }
      ]
    },
    {
      code: "AI3",
      name: "Đánh giá và tư duy phản biện với AI",
      description: "Kiểm chứng thông tin AI cung cấp với SGK/thực nghiệm, phát hiện ảo giác (hallucination) và sai lệch.",
      subCodes: [
        { code: "AI3.1", desc: "Kiểm chứng độ chính xác khoa học của các câu trả lời do AI tạo ra bằng SGK và tài liệu chuẩn." },
        { code: "AI3.2", desc: "Nhận diện hiện tượng 'ảo giác' (hallucination) và thiên kiến thông tin của mô hình AI." },
        { code: "AI3.3", desc: "Thảo luận, phản biện so sánh giữa giải thích của AI và kết quả thực nghiệm thực tế." }
      ]
    },
    {
      code: "AI4",
      name: "Đạo đức, trách nhiệm và an toàn khi sử dụng AI",
      description: "Liêm chính học thuật, không sao chép nguyên văn, bảo mật thông tin và sử dụng AI có trách nhiệm.",
      subCodes: [
        { code: "AI4.1", desc: "Tuân thủ tính liêm chính học thuật: xem AI là trợ lí tham khảo, không sao chép làm bài nộp." },
        { code: "AI4.2", desc: "Bảo vệ thông tin cá nhân và dữ liệu nhạy cảm khi tương tác với các hệ thống AI." },
        { code: "AI4.3", desc: "Nhận thức được tác động môi trường và xã hội của việc phát triển công nghệ AI." }
      ]
    },
    {
      code: "AI5",
      name: "Sáng tạo và giải quyết vấn đề với AI",
      description: "Phối hợp cùng AI thiết kế dự án học tập, sản phẩm STEM và giải pháp hóa học thực tiễn.",
      subCodes: [
        { code: "AI5.1", desc: "Cùng AI đồng sáng tạo ý tưởng cho các dự án nghiên cứu khoa học hoặc sản phẩm STEM hóa học." },
        { code: "AI5.2", desc: "Ứng dụng AI giải quyết các bài toán hóa học phức tạp, tối ưu hóa điều kiện phản ứng." }
      ]
    }
  ]
};

export const CORE_QUALITIES = [
  {
    name: "Yêu nước",
    description: "Tự hào về tài nguyên khoáng sản, ngành công nghiệp hoá chất Việt Nam; có ý thức bảo vệ tài nguyên quốc gia."
  },
  {
    name: "Nhân ái",
    description: "Tôn trọng, giúp đỡ bạn bè trong học tập nhóm; cảm thông, chia sẻ và có ý thức bảo vệ sức khoẻ cộng đồng."
  },
  {
    name: "Chăm chỉ",
    description: "Kiên trì thực hiện nhiệm vụ học tập, tích cực tìm tòi tài liệu, cần cù trong thao tác thí nghiệm hoá học."
  },
  {
    name: "Trung thực",
    description: "Ghi chép khách quan, chính xác số liệu và hiện tượng thí nghiệm; không gian lận trong kiểm tra và trích dẫn nguồn."
  },
  {
    name: "Trách nhiệm",
    description: "Chấp hành nghiêm ngặt an toàn phòng thí nghiệm; có trách nhiệm giữ gìn vệ sinh, bảo vệ môi trường sống."
  }
];
