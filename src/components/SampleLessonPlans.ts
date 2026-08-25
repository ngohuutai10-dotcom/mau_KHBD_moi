import type { LessonPlan } from "../types";

export const SAMPLE_LESSON_PLAN_EQUILIBRIUM: LessonPlan = {
  header: {
    schoolName: "TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG",
    department: "TỔ HÓA HỌC",
    teacherName: "Nguyễn Văn An",
    subject: "Hóa học",
    grade: "11",
    lessonTitle: "Khái niệm về cân bằng hóa học",
    lessonName: "Khái niệm về cân bằng hóa học",
    organizationType: "Dạy học trên lớp",
    textbookSet: "Cánh Diều (Kết hợp Kết nối tri thức & Chân trời sáng tạo)",
    numberOfPeriods: 2,
    periodDuration: 45,
    targetAudience: "Học sinh lớp 11 ban Khoa học Tự nhiên"
  },
  objectives: {
    knowledge: [
      "Trình bày được khái niệm phản ứng thuận nghịch và trạng thái cân bằng của một phản ứng thuận nghịch.",
      "Giải thích được đặc điểm của cân bằng hóa học là cân bằng động.",
      "Viết được biểu thức hằng số cân bằng (Kc) cho một phản ứng thuận nghịch trong dung dịch hoặc pha khí.",
      "Phát biểu được nguyên lí chuyển dịch cân bằng Le Chatelier.",
      "Vận dụng nguyên lí Le Chatelier để dự đoán chiều chuyển dịch cân bằng khi thay đổi nhiệt độ, nồng độ, áp suất."
    ],
    competencies: {
      generalCompetencies: [
        {
          code: "TCTH",
          name: "Tự chủ và tự học",
          specificBehaviors: [
            "Chủ động nghiên cứu tài liệu SGK và video thí nghiệm trước giờ học",
            "Tự giác ghi chép và hoàn thành phiếu học tập cá nhân"
          ]
        },
        {
          code: "GTHT",
          name: "Giao tiếp và hợp tác",
          specificBehaviors: [
            "Tích cực thảo luận nhóm để phân tích các yếu tố ảnh hưởng đến chuyển dịch cân bằng",
            "Tự tin trình bày và phản biện kết quả thảo luận trước lớp"
          ]
        },
        {
          code: "GQVBSC",
          name: "Giải quyết vấn đề và sáng tạo",
          specificBehaviors: [
            "Đề xuất các phương án tăng hiệu suất tổng hợp Ammonia (NH3) trong công nghiệp",
            "Thiết kế sơ đồ tư duy tóm tắt nguyên lí Le Chatelier"
          ]
        }
      ],
      chemistryCompetencies: [
        {
          component: "NTHH",
          name: "Nhận thức hóa học",
          description: "Hiểu bản chất cân bằng động và biểu thức tính hằng số cân bằng.",
          specificBehaviors: [
            "Nêu được định nghĩa phản ứng một chiều, phản ứng thuận nghịch và cân bằng hóa học",
            "Viết đúng biểu thức tính hằng số cân bằng Kc cho các phản ứng cụ thể",
            "Giải thích được ý nghĩa định lượng của giá trị Kc"
          ]
        },
        {
          component: "THTGTN",
          name: "Tìm hiểu thế giới tự nhiên dưới góc độ hóa học",
          description: "Tiến hành và quan sát thí nghiệm chuyển dịch cân bằng của hệ NO2/N2O4 và Fe(SCN)3.",
          specificBehaviors: [
            "Quan sát sự đổi màu của khí NO2 (nâu đỏ) và N2O4 (không màu) khi ngâm vào nước đá và nước nóng",
            "Thu thập số liệu và rút ra kết luận về ảnh hưởng của nhiệt độ đến cân bằng"
          ]
        },
        {
          component: "VDKN",
          name: "Vận dụng kiến thức, kĩ năng đã học",
          description: "Giải thích các quá trình cân bằng trong cơ thể và sản xuất công nghiệp.",
          specificBehaviors: [
            "Giải thích hiện tượng say độ cao liên quan đến cân bằng giữa Hemoglobin và Oxygen",
            "Đề xuất điều kiện tối ưu (áp suất, nhiệt độ, chất xúc tác) cho quá trình Haber-Bosch"
          ]
        }
      ],
      digitalCompetencies: [
        {
          code: "3.2NC2a",
          name: "Sử dụng phần mềm và mô phỏng số",
          evidence: "Sử dụng mô phỏng PhET Reversible Reactions để quan sát biến thiên số lượng phân tử ở cấp độ vi mô."
        },
        {
          code: "5.1NC2a",
          name: "Xử lý dữ liệu số",
          evidence: "Sử dụng bảng tính tính toán giá trị Kc và vẽ đồ thị nồng độ theo thời gian."
        }
      ],
      aiCompetencies: [
        {
          code: "11C2.1",
          name: "Tra cứu và tổng hợp thông tin với AI",
          evidence: "Học sinh dùng trợ lí AI để tra cứu các ứng dụng thực tế của chuyển dịch cân bằng trong sản xuất đồ uống có ga."
        },
        {
          code: "11C3.1",
          name: "Kiểm chứng và tư duy phản biện với AI",
          evidence: "Đối chiếu câu trả lời của AI về vai trò của chất xúc tác trong cân bằng hóa học với định luật bảo toàn."
        }
      ],
      englishCompetencies: [
        {
          aspect: "Thuật ngữ Hóa học Quốc tế",
          evidence: "Nhận biết và đọc chính xác các thuật ngữ tiếng Anh trong bài học cân bằng hóa học.",
          terminology: [
            "Reversible reaction (phản ứng thuận nghịch)",
            "Chemical equilibrium (cân bằng hóa học)",
            "Dynamic equilibrium (cân bằng động)",
            "Equilibrium constant - Kc (hằng số cân bằng)",
            "Le Chatelier's principle (nguyên lí Le Chatelier)"
          ]
        }
      ]
    },
    qualities: [
      {
        name: "Chăm chỉ",
        evidence: "Kiên trì theo dõi diễn biến thí nghiệm mô phỏng và tính toán chính xác hằng số cân bằng."
      },
      {
        name: "Trung thực",
        evidence: "Ghi chép trung thực hiện tượng thí nghiệm chuyển dịch màu sắc của hệ khí NO2/N2O4."
      },
      {
        name: "Trách nhiệm",
        evidence: "Có ý thức liên hệ bài học với việc tối ưu hóa năng lượng và bảo vệ môi trường trong công nghiệp."
      }
    ]
  },
  equipmentAndMaterials: {
    teacher: [
      "Kế hoạch bài dạy, bài trình chiếu PowerPoint tương tác",
      "Bộ thí nghiệm thực tế hoặc video chất lượng cao: Bình khí NO2 ngâm nước nóng và nước đá",
      "Đường link mô phỏng PhET Interactive Simulations: Reversible Reactions",
      "Hệ thống Phiếu học tập số 1, số 2, số 3 in sẵn cho các nhóm học sinh"
    ],
    students: [
      "Sách giáo khoa Hóa học 11, vở ghi, bút viết",
      "Thiết bị điện tử (điện thoại/máy tính bảng) để truy cập mô phỏng thí nghiệm trực tuyến"
    ]
  },
  learningActivities: [
    {
      id: "act_1",
      activityNumber: 1,
      period: 1,
      title: "Khởi động: Hiện tượng hòa tan và giải phóng khí CO2 trong đồ uống có ga",
      type: "KHOI_DONG",
      typeLabel: "Hoạt động 1: Khởi động (7 phút)",
      durationMinutes: 7,
      bigQuestion: "Tại sao khi mở nắp chai nước giải khát có ga ta thấy bọt khí sủi lên mạnh, nhưng đóng nắp lại sau một thời gian thì bọt khí ngưng thoát ra?",
      objective: "Kích thích tư duy về các quá trình xảy ra theo hai chiều ngược nhau trong đời sống.",
      content: "Quan sát hiện tượng thực tế và dự đoán bản chất hiện tượng biến đổi thuận nghịch.",
      product: "Câu trả lời của học sinh về hiện tượng sủi bọt khí CO2 và dự đoán về tính hai chiều của quá trình.",
      organization: [
        {
          phase: "Chuyển giao nhiệm vụ học tập",
          teacher: [
            "Chiếu video thí nghiệm mở nắp chai nước ngọt có ga và đóng nắp lại.",
            "Đặt câu hỏi lớn: 'Tại sao khi mở nắp khí CO2 thoát ra sủi bọt, còn khi đóng kín nắp sau một thời gian thì hiện tượng sủi bọt dừng lại? Phải chăng phản ứng đã dừng hẳn hay đang diễn ra theo cả hai chiều?'"
          ],
          student: [
            "Lắng nghe, quan sát video hiện tượng sủi bọt khí CO2 trong chai nước có ga.",
            "Ghi nhận câu hỏi định hướng của giáo viên vào sổ tay học tập cá nhân."
          ],
          boardContent: [
            "Chương 1: CÂN BẰNG HÓA HỌC",
            "Bài 1: Khái niệm về cân bằng hóa học",
            "- Tình huống mở đầu: Quá trình hòa tan và thoát khí CO2 trong nước giải khát có ga."
          ]
        },
        {
          phase: "Thực hiện nhiệm vụ",
          teacher: [
            "Theo dõi học sinh suy nghĩ cá nhân trong 2 phút.",
            "Gợi ý học sinh liên hệ giữa trạng thái mở nắp (hệ hở) và đóng nắp (hệ kín)."
          ],
          student: [
            "Thảo luận theo cặp đôi (2 phút) để phân tích hiện tượng.",
            "Dự đoán: Quá trình CO2(aq) ⇌ CO2(g) diễn ra đồng thời theo hai chiều trong chai đóng kín."
          ],
          boardContent: [
            "- Quá trình thuận nghịch: Khí CO2 tan vào nước ⇌ Khí CO2 thoát ra khỏi dung dịch."
          ]
        },
        {
          phase: "Báo cáo kết quả và thảo luận",
          teacher: [
            "Mời đại diện 2 học sinh phát biểu ý kiến.",
            "Ghi nhận các ý kiến trái chiều để dẫn dắt vào bài mới."
          ],
          student: [
            "Đại diện cặp đôi phát biểu ý kiến trước lớp.",
            "Các bạn khác nhận xét, bổ sung góc nhìn thực tiễn."
          ],
          boardContent: [
            "- Câu hỏi nghiên cứu: Thế nào là phản ứng thuận nghịch và trạng thái cân bằng hóa học?"
          ]
        },
        {
          phase: "Kết luận và nhận định",
          teacher: [
            "Nhận xét tinh thần xung phong, đánh giá câu trả lời.",
            "Dẫn dắt: Trong tự nhiên và công nghiệp, có rất nhiều phản ứng diễn ra theo hai chiều ngược nhau. Chúng ta cùng tìm hiểu bài học hôm nay."
          ],
          student: [
            "Lắng nghe nhận xét của GV, ghi tiêu đề bài học vào vở."
          ],
          boardContent: [
            "-> Mục tiêu: Hiểu bản chất phản ứng thuận nghịch và cân bằng động."
          ]
        }
      ],
      assessment: {
        method: "Quan sát thái độ tham gia và câu trả lời miệng của học sinh",
        criteria: "Nêu được dự đoán về tính 2 chiều của quá trình biến đổi."
      }
    },
    {
      id: "act_2",
      activityNumber: 2,
      period: 1,
      title: "Hình thành kiến thức: Phản ứng thuận nghịch và Trạng thái cân bằng hóa học",
      type: "HINH_THANH_KIEN_THUC",
      typeLabel: "Hoạt động 2: Khám phá Phản ứng thuận nghịch & Cân bằng hóa học (23 phút)",
      durationMinutes: 23,
      bigQuestion: "Tại sao tại trạng thái cân bằng, nồng độ các chất không đổi nhưng phản ứng hóa học vẫn không dừng lại?",
      objective: "Hiểu khái niệm phản ứng thuận nghịch, đặc điểm động của cân bằng hóa học và đồ thị tốc độ phản ứng theo thời gian.",
      content: "Nghiên cứu SGK, phân tích phản ứng H2(g) + I2(g) ⇌ 2HI(g), làm việc với Phiếu học tập số 1 và quan sát mô phỏng PhET.",
      product: "Phiếu học tập số 1 hoàn thiện, đồ thị biểu diễn tốc độ phản ứng thuận/nghịch theo thời gian.",
      organization: [
        {
          phase: "Chuyển giao nhiệm vụ học tập",
          teacher: [
            "Phát Phiếu học tập số 1 cho các nhóm 4 học sinh.",
            "Giao nhiệm vụ: Đọc mục I SGK và quan sát mô phỏng phản ứng H2 + I2 ⇌ 2HI ở 445°C để hoàn thành 3 câu hỏi trong phiếu."
          ],
          student: [
            "Nhận Phiếu học tập số 1 từ GV, phân công vai trò trong nhóm (nhóm trưởng, thư kí, báo cáo viên)."
          ],
          boardContent: [
            "I. Khái niệm phản ứng thuận nghịch và cân bằng hóa học",
            "1. Phản ứng một chiều và phản ứng thuận nghịch:",
            "- Phản ứng một chiều: chỉ xảy ra theo một chiều từ chất đầu tạo sản phẩm (dùng mũi tên ->).",
            "- Phản ứng thuận nghịch: trong cùng điều kiện, xảy ra đồng thời theo 2 chiều ngược nhau (dùng mũi tên ⇌)."
          ]
        },
        {
          phase: "Thực hiện nhiệm vụ",
          teacher: [
            "Chiếu mô phỏng PhET Reversible Reactions lên màn hình.",
            "Quan sát các nhóm làm việc, hỗ trợ nhóm gặp khó khăn khi vẽ đồ thị tốc độ vt và vn theo thời gian."
          ],
          student: [
            "Thảo luận nhóm hoàn thành Phiếu học tập số 1.",
            "Phân tích đồ thị: vt giảm dần, vn tăng dần; đến thời điểm t_cb thì vt = vn > 0 (trạng thái cân bằng)."
          ],
          boardContent: [
            "2. Trạng thái cân bằng:",
            "- Là trạng thái của phản ứng thuận nghịch khi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch (vt = vn).",
            "- Cân bằng hóa học là cân bằng ĐỘNG (phản ứng vẫn tiếp diễn ở cấp độ phân tử)."
          ]
        },
        {
          phase: "Báo cáo kết quả và thảo luận",
          teacher: [
            "Mời đại diện nhóm 1 và nhóm 3 lên bảng trình bày định nghĩa và giải thích đồ thị.",
            "Mời nhóm 2 và 4 phản biện câu hỏi: 'Tại sao cân bằng hóa học là cân bằng động?'"
          ],
          student: [
            "Đại diện nhóm 1 trình bày kết quả phiếu học tập.",
            "Nhóm 2 bổ sung: Cân bằng động vì các phân tử vẫn va chạm và phản ứng liên tục với tốc độ 2 chiều bằng nhau."
          ],
          boardContent: [
            "- Đặc điểm:",
            "  + vt = vn > 0",
            "  + Nồng độ các chất trong hệ không đổi theo thời gian (ở nhiệt độ xác định)."
          ]
        },
        {
          phase: "Kết luận và nhận định",
          teacher: [
            "Chuẩn hóa kiến thức: Nhấn mạnh dấu mũi tên thuận nghịch ⇌ và bản chất động của cân bằng.",
            "Chốt tiêu chí đánh giá trên Rubric hoạt động nhóm."
          ],
          student: [
            "Ghi nhớ các khái niệm cốt lõi, chỉnh sửa bổ sung vào vở ghi."
          ],
          boardContent: [
            "-> Kết luận cốt lõi: Phản ứng thuận nghịch không bao giờ xảy ra hoàn toàn (hiệu suất luôn < 100%)."
          ]
        }
      ],
      assessment: {
        method: "Đánh giá qua Phiếu học tập số 1 và câu trả lời đại diện nhóm",
        criteria: "Giải thích đúng khái niệm cân bằng động và vẽ đúng đồ thị vt = vn."
      }
    },
    {
      id: "act_3",
      activityNumber: 3,
      period: 1,
      title: "Hình thành kiến thức: Biểu thức Hằng số cân bằng (Kc) và ý nghĩa",
      type: "HINH_THANH_KIEN_THUC",
      typeLabel: "Hoạt động 3: Thiết lập biểu thức Hằng số cân bằng Kc (15 phút)",
      durationMinutes: 15,
      bigQuestion: "Hằng số cân bằng Kc phụ thuộc vào những yếu tố nào và cho ta biết điều gì về mức độ diễn ra của phản ứng?",
      objective: "Viết đúng biểu thức Kc cho các phản ứng đồng thể và dị thể; hiểu ý nghĩa của Kc đối với chiều hướng phản ứng.",
      content: "Nghiên cứu biểu thức tổng quát aA + bB ⇌ cC + dD, làm bài tập vận dụng viết biểu thức Kc trong Phiếu học tập số 2.",
      product: "Công thức tổng quát và biểu thức Kc viết chính xác cho 4 phản ứng hóa học cụ thể.",
      organization: [
        {
          phase: "Chuyển giao nhiệm vụ học tập",
          teacher: [
            "Giới thiệu phản ứng tổng quát: aA + bB ⇌ cC + dD.",
            "Yêu cầu học sinh viết biểu thức tính Kc và giải thích quy ước đối với chất rắn."
          ],
          student: [
            "Theo dõi bài giảng, ghi chép biểu thức Kc vào vở."
          ],
          boardContent: [
            "II. Hằng số cân bằng của phản ứng thuận nghịch (Kc)",
            "1. Biểu thức tổng quát:",
            "Xét hệ: aA + bB ⇌ cC + dD",
            "Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b)",
            "(Trong đó [A], [B], [C], [D] là nồng độ mol của các chất ở trạng thái cân bằng)."
          ]
        },
        {
          phase: "Thực hiện nhiệm vụ",
          teacher: [
            "Giao bài tập nhanh trong Phiếu học tập số 2: Viết Kc cho phản ứng tổng hợp NH3 và phản ứng nhiệt phân CaCO3(s) ⇌ CaO(s) + CO2(g).",
            "Nhắc nhở học sinh lưu ý không đưa nồng độ chất rắn vào biểu thức Kc."
          ],
          student: [
            "Làm việc cá nhân hoàn thành bài tập viết biểu thức Kc.",
            "Lưu ý: Đối với chất rắn (như CaCO3, CaO) nồng độ coi như hằng số nên không có mặt trong biểu thức: Kc = [CO2]."
          ],
          boardContent: [
            "2. Quy ước quan trọng:",
            "- Chất rắn không xuất hiện trong biểu thức Kc.",
            "- Kc chỉ phụ thuộc vào bản chất phản ứng và NHIỆT ĐỘ.",
            "Ví dụ 1: N2(g) + 3H2(g) ⇌ 2NH3(g) => Kc = [NH3]^2 / ([N2] * [H2]^3)",
            "Ví dụ 2: CaCO3(s) ⇌ CaO(s) + CO2(g) => Kc = [CO2]"
          ]
        },
        {
          phase: "Báo cáo kết quả và thảo luận",
          teacher: [
            "Gọi 2 học sinh lên bảng viết biểu thức Kc của 2 ví dụ.",
            "Hỏi: 'Nếu Kc rất lớn (Kc >> 1) hoặc rất nhỏ (Kc << 1) thì phản ứng ưu tiên diễn ra theo chiều nào?'"
          ],
          student: [
            "Học sinh lên bảng làm bài tập.",
            "Thảo luận trả lời: Kc rất lớn -> phản ứng thuận chiếm ưu thế; Kc rất nhỏ -> phản ứng thuận xảy ra rất ít."
          ],
          boardContent: [
            "3. Ý nghĩa của Kc:",
            "- Kc càng lớn: phản ứng thuận càng chiếm ưu thế (hiệu suất tạo sản phẩm cao).",
            "- Kc càng nhỏ: phản ứng nghịch chiếm ưu thế."
          ]
        },
        {
          phase: "Kết luận và nhận định",
          teacher: [
            "Nhận xét, đánh giá bài làm của học sinh trên bảng.",
            "Chốt kiến thức: Kc là đại lượng định lượng đặc trưng cho trạng thái cân bằng ở một nhiệt độ xác định."
          ],
          student: [
            "Sửa bài tập vào vở, ghi nhớ quy ước chất rắn."
          ],
          boardContent: [
            "-> Ghi nhớ: Kc KHÔNG phụ thuộc vào nồng độ ban đầu hay chất xúc tác, CHỈ phụ thuộc vào nhiệt độ."
          ]
        }
      ],
      assessment: {
        method: "Kiểm tra bài tập viết biểu thức Kc trên bảng và vở học sinh",
        criteria: "Viết đúng 100% biểu thức Kc có lũy thừa hệ số tỉ lượng và loại bỏ đúng chất rắn."
      }
    },
    {
      id: "act_4",
      activityNumber: 4,
      period: 2,
      title: "Luyện tập & Khám phá: Sự chuyển dịch cân bằng và Nguyên lí Le Chatelier",
      type: "LUYEN_TAP",
      typeLabel: "Hoạt động 4: Nghiên cứu các yếu tố ảnh hưởng & Nguyên lí Le Chatelier (25 phút)",
      durationMinutes: 25,
      bigQuestion: "Khi thay đổi nhiệt độ, nồng độ hoặc áp suất, hệ cân bằng sẽ tự điều chỉnh theo quy luật nào?",
      objective: "Khảo sát thực nghiệm/mô phỏng ảnh hưởng của nhiệt độ (hệ NO2/N2O4), nồng độ và áp suất; phát biểu và vận dụng nguyên lí Le Chatelier.",
      content: "Thực hiện thí nghiệm ngâm bình khí NO2 vào nước nóng/nước đá; phân tích chiều chuyển dịch màu sắc nâu đỏ sang không màu; thảo luận nhóm với Phiếu học tập số 3.",
      product: "Bảng kết quả quan sát thí nghiệm NO2, kết luận về chiều chuyển dịch cân bằng theo nguyên lí Le Chatelier.",
      organization: [
        {
          phase: "Chuyển giao nhiệm vụ học tập",
          teacher: [
            "Trình chiếu video thí nghiệm đối chứng: 3 ống nghiệm chứa hỗn hợp khí NO2 (nâu đỏ) và N2O4 (không màu). Ống 1 để ở nhiệt độ phòng, ống 2 ngâm nước nóng (80°C), ống 3 ngâm nước đá (0°C).",
            "Giao nhiệm vụ trong Phiếu học tập số 3: Quan sát biến đổi màu sắc và xác định chiều chuyển dịch cân bằng: 2NO2(g) [nâu đỏ] ⇌ N2O4(g) [không màu], ΔrH°298 = -58 kJ (tỏa nhiệt)."
          ],
          student: [
            "Nhận nhiệm vụ, quan sát kỹ hiện tượng màu sắc ở 3 ống nghiệm.",
            "Ghi chép hiện tượng: Ống nước nóng đậm màu nâu đỏ hơn, ống nước đá màu nhạt dần gần như không màu."
          ],
          boardContent: [
            "III. Sự chuyển dịch cân bằng hóa học",
            "1. Thí nghiệm ảnh hưởng của nhiệt độ:",
            "2NO2(g, nâu đỏ) ⇌ N2O4(g, không màu)   ΔrH°298 = -58 kJ (phản ứng tỏa nhiệt)",
            "- Khi đun nóng (tăng T): màu nâu đỏ đậm lên -> cân bằng chuyển dịch sang chiều nghịch (thu nhiệt).",
            "- Khi làm lạnh (giảm T): màu nhạt đi -> cân bằng chuyển dịch sang chiều thuận (tỏa nhiệt)."
          ]
        },
        {
          phase: "Thực hiện nhiệm vụ",
          teacher: [
            "Hướng dẫn học sinh phân tích: Phản ứng tỏa nhiệt (chiều thuận) tạo ra nhiệt; khi bị ép tăng nhiệt độ, hệ phản ứng chống lại bằng cách chuyển dịch theo chiều thu nhiệt (chiều nghịch) để tiêu bớt nhiệt.",
            "Mở rộng phân tích tiếp ảnh hưởng của nồng độ và áp suất."
          ],
          student: [
            "Thảo luận nhóm hoàn thành Phiếu học tập số 3.",
            "Rút ra quy luật tổng quát: Hệ luôn chuyển dịch theo chiều chống lại tác động bên ngoài."
          ],
          boardContent: [
            "- Ảnh hưởng của nồng độ: Tăng nồng độ chất nào -> cân bằng chuyển dịch theo chiều làm giảm chất đó.",
            "- Ảnh hưởng của áp suất: Tăng áp suất -> chuyển dịch theo chiều làm giảm số mol khí (giảm áp suất)."
          ]
        },
        {
          phase: "Báo cáo kết quả và thảo luận",
          teacher: [
            "Mời đại diện nhóm 2 phát biểu quy luật tổng quát rút ra từ các thí nghiệm.",
            "Mời nhóm 4 đối chiếu với định nghĩa Nguyên lí Le Chatelier trong SGK."
          ],
          student: [
            "Đại diện nhóm 2 báo cáo kết quả thảo luận.",
            "Cả lớp thảo luận và phát biểu nguyên lí Le Chatelier."
          ],
          boardContent: [
            "- Lưu ý đặc biệt: CHẤT XÚC TÁC KHÔNG làm chuyển dịch cân bằng, chỉ làm phản ứng nhanh đạt tới trạng thái cân bằng."
          ]
        },
        {
          phase: "Kết luận và nhận định",
          teacher: [
            "Chuẩn hóa và phát biểu Nguyên lí chuyển dịch cân bằng Le Chatelier.",
            "Tổng kết bảng quy tắc nhớ nhanh cho 3 yếu tố nồng độ, nhiệt độ, áp suất."
          ],
          student: [
            "Lắng nghe, ghi chép định nghĩa nguyên lí Le Chatelier và bảng tóm tắt vào vở."
          ],
          boardContent: [
            "2. Nguyên lí Le Chatelier (Lơ Sa-tơ-li-ê):",
            "Một phản ứng thuận nghịch đang ở trạng thái cân bằng, khi chịu tác động từ bên ngoài (nhiệt độ, nồng độ, áp suất) thì cân bằng sẽ chuyển dịch theo chiều làm giảm tác động đó.",
            "- Tăng nhiệt độ -> chuyển dịch theo chiều thu nhiệt (ΔH > 0).",
            "- Giảm nhiệt độ -> chuyển dịch theo chiều tỏa nhiệt (ΔH < 0).",
            "- Tăng áp suất -> chuyển dịch theo chiều giảm số mol khí."
          ]
        }
      ],
      assessment: {
        method: "Bảng kiểm quan sát và câu hỏi trắc nghiệm tương tác",
        criteria: "Dự đoán đúng 100% chiều chuyển dịch khi thay đổi từng yếu tố riêng lẻ."
      }
    },
    {
      id: "act_5",
      activityNumber: 5,
      period: 2,
      title: "Vận dụng: Tối ưu hóa phản ứng Haber-Bosch sản xuất phân đạm trong thực tiễn",
      type: "VAN_DUNG",
      typeLabel: "Hoạt động 5: Giải bài toán công nghiệp - Kỹ sư hóa chất tương lai (20 phút)",
      durationMinutes: 20,
      bigQuestion: "Làm thế nào để tổng hợp được lượng Ammonia (NH3) tối đa với chi phí năng lượng và vật liệu hợp lí nhất?",
      objective: "Vận dụng nguyên lí Le Chatelier để giải quyết vấn đề sản xuất thực tiễn trong công nghiệp hóa chất.",
      content: "Nghiên cứu phản ứng: N2(g) + 3H2(g) ⇌ 2NH3(g) (delta H = -92 kJ). Đề xuất giải pháp áp suất, nhiệt độ và chất xúc tác.",
      product: "Bài thuyết trình ngắn dạng Infographic hoặc Sơ đồ công nghệ tối ưu hóa quá trình Haber-Bosch của nhóm.",
      organization: [
        {
          phase: "Chuyển giao nhiệm vụ học tập",
          teacher: [
            "Đặt vấn đề: 'Phân đạm là nguồn dinh dưỡng thiết yếu cho nông nghiệp nuôi sống hàng tỉ người. Các em hãy đóng vai trò Kỹ sư công nghệ hóa chất, đề xuất điều kiện nhiệt độ và áp suất cho phản ứng tổng hợp NH3, có tính đến cả tốc độ phản ứng và sự an toàn kinh tế'.",
            "Cung cấp thông tin phản ứng: N2(g) + 3H2(g) ⇌ 2NH3(g), ΔrH°298 = -92 kJ (tỏa nhiệt, giảm 4 mol khí -> 2 mol khí)."
          ],
          student: [
            "Nhận đề bài tình huống thực tiễn, phân tích phản ứng tỏa nhiệt và giảm số mol khí (4 mol khí -> 2 mol khí)."
          ],
          boardContent: [
            "IV. Vận dụng thực tiễn: Quá trình Haber-Bosch tổng hợp NH3",
            "N2(g) + 3H2(g) ⇌ 2NH3(g)   ΔrH°298 = -92 kJ",
            "- Chiều thuận: tỏa nhiệt, giảm thể tích khí (4 mol -> 2 mol)."
          ]
        },
        {
          phase: "Thực hiện nhiệm vụ",
          teacher: [
            "Gợi ý các nhóm sử dụng AI/Internet để tra cứu thông số thực tế của nhà máy phân đạm Phú Mỹ hoặc Cà Mau (nhiệt độ 450°C, áp suất 200 bar, xúc tác Fe).",
            "Hướng dẫn phân tích mâu thuẫn: Về cân bằng cần hạ T để tăng hiệu suất, nhưng hạ T làm tốc độ phản ứng quá chậm -> Chọn nhiệt độ tối ưu 400 - 450°C kèm xúc tác bột sắt (Fe)."
          ],
          student: [
            "Sử dụng AI/Internet tra cứu thông số kỹ thuật thực tế, lập luận vì sao chọn nhiệt độ 400 - 450°C thay vì nhiệt độ quá thấp."
          ],
          boardContent: [
            "Phân tích điều kiện tối ưu:",
            "- Áp suất: Tăng áp suất (~200 bar) để cân bằng chuyển dịch theo chiều thuận.",
            "- Nhiệt độ: 400 - 450°C (dung hòa giữa hiệu suất cân bằng và tốc độ phản ứng).",
            "- Xúc tác Fe: Tăng tốc độ đạt trạng thái cân bằng."
          ]
        },
        {
          phase: "Báo cáo kết quả và thảo luận",
          teacher: [
            "Mời 2 nhóm trình bày giải pháp kỹ thuật.",
            "Đặt câu hỏi chất vấn: 'Tại sao không tăng áp suất lên 1000 bar để hiệu suất cao hơn nữa?'"
          ],
          student: [
            "Đại diện nhóm thuyết trình giải pháp tối ưu hóa.",
            "Trả lời câu hỏi: Áp suất quá cao đòi hỏi thiết bị chịu áp đắt đỏ, tốn kém chi phí và nguy cơ cháy nổ cao."
          ],
          boardContent: [
            "- Tách NH3 lỏng liên tục khỏi hỗn hợp để làm cân bằng tiếp tục chuyển dịch sang chiều thuận.",
            "- Khí N2 và H2 chưa phản ứng được tuần hoàn trở lại buồng tổng hợp."
          ]
        },
        {
          phase: "Kết luận và nhận định",
          teacher: [
            "Tổng kết và đánh giá cao tư duy kỹ thuật đa chiều của học sinh.",
            "Chốt lại bài học: Trong sản xuất công nghiệp, hóa học luôn gắn kết chặt chẽ với kinh tế, năng lượng và an toàn môi trường."
          ],
          student: [
            "Tổng kết bài học, hoàn thiện sơ đồ công nghệ tổng hợp NH3 vào sổ tay dự án học tập."
          ],
          boardContent: [
            "Kết luận điều kiện thực tế trong công nghiệp:",
            "- Áp suất: 150 - 200 bar",
            "- Nhiệt độ: 400 - 450°C",
            "- Chất xúc tác: Fe (trộn thêm Al2O3, K2O)",
            "- Hóa lỏng và tuần hoàn nguyên liệu: Giúp hiệu suất chung đạt trên 95%."
          ]
        }
      ],
      assessment: {
        method: "Rubric đánh giá sản phẩm dự án nhỏ và năng lực giải quyết vấn đề",
        criteria: "Đề xuất giải pháp có cơ sở khoa học, tính khả thi và lập luận phản biện sắc bén."
      }
    }
  ],
  appendices: {
    worksheets: [
      {
        id: "ws_1",
        title: "PHIẾU HỌC TẬP SỐ 1: KHÁM PHÁ CÂN BẰNG ĐỘNG",
        activityName: "Nghiên cứu khái niệm phản ứng thuận nghịch và trạng thái cân bằng",
        tasks: [
          {
            title: "Nhiệm vụ 1: Khái niệm phản ứng thuận nghịch",
            instruction: "Quan sát thí nghiệm mô phỏng và hoàn thành câu hỏi dưới đây:",
            questions: [
              "Điền vào chỗ trống: Phản ứng thuận nghịch là phản ứng trong cùng điều kiện, xảy ra đồng thời theo hai chiều .........................."
            ]
          },
          {
            title: "Nhiệm vụ 2: Phân tích động học cân bằng",
            instruction: "Dựa vào đồ thị biến thiên tốc độ phản ứng H2 + I2 ⇌ 2HI theo thời gian:",
            questions: [
              "Tốc độ phản ứng thuận vt biến đổi như thế nào theo thời gian?",
              "Tốc độ phản ứng nghịch vn biến đổi như thế nào theo thời gian?",
              "Điểm đặc biệt tại thời điểm cân bằng t_cb là gì?",
              "Giải thích tại sao cân bằng hóa học là cân bằng động mà không phải cân bằng tĩnh?"
            ]
          }
        ],
        teacherAnswerKey: `1. ...ngược nhau.\n2. vt giảm dần; vn tăng dần; tại t_cb thì vt = vn > 0.\n3. Vì tại trạng thái cân bằng, phản ứng thuận và nghịch vẫn liên tục diễn ra với tốc độ bằng nhau nên nồng độ các chất trong hệ không đổi.`
      },
      {
        id: "ws_2",
        title: "PHIẾU HỌC TẬP SỐ 2: HẰNG SỐ CÂN BẰNG KC",
        activityName: "Xác lập biểu thức hằng số cân bằng Kc",
        tasks: [
          {
            title: "Nhiệm vụ: Thiết lập biểu thức Kc",
            instruction: "Viết biểu thức tính hằng số cân bằng Kc cho các hệ phản ứng đồng thể và dị thể sau:",
            questions: [
              "N2(g) + 3H2(g) ⇌ 2NH3(g)",
              "2SO2(g) + O2(g) ⇌ 2SO3(g)",
              "CaCO3(s) ⇌ CaO(s) + CO2(g)",
              "Fe2O3(s) + 3CO(g) ⇌ 2Fe(s) + 3CO2(g)"
            ]
          }
        ],
        teacherAnswerKey: `1. Kc = [NH3]^2 / ([N2] * [H2]^3)\n2. Kc = [SO3]^2 / ([SO2]^2 * [O2])\n3. Kc = [CO2]\n4. Kc = [CO2]^3 / [CO]^3`
      },
      {
        id: "ws_3",
        title: "PHIẾU HỌC TẬP SỐ 3: DỰ ĐOÁN CHIỀU CHUYỂN DỊCH CÂN BẰNG",
        activityName: "Vận dụng nguyên lí Le Chatelier",
        tasks: [
          {
            title: "Nhiệm vụ: Phân tích yếu tố ảnh hưởng",
            instruction: "Cho cân bằng: 2SO2(g) + O2(g) ⇌ 2SO3(g) (delta rH298 = -198 kJ). Dự đoán chiều chuyển dịch khi:",
            questions: [
              "Tăng nồng độ khí O2 trong bình phản ứng",
              "Giảm nhiệt độ của hệ phản ứng",
              "Tăng áp suất chung của toàn hệ",
              "Thêm chất xúc tác V2O5 vào hỗn hợp"
            ]
          }
        ],
        teacherAnswerKey: `a) Chiều thuận\nb) Chiều thuận (tỏa nhiệt)\nc) Chiều thuận (giảm số mol khí)\nd) Cân bằng không chuyển dịch`
      }
    ],
    rubrics: [
      {
        title: "BẢNG KIỂM ĐÁNH GIÁ HOẠT ĐỘNG VÀ THẢO LUẬN NHÓM",
        checklistCriteria: [
          "Tham gia đầy đủ vào hoạt động nhóm",
          "Thực hiện đúng nhiệm vụ được phân công",
          "Chủ động trao đổi và đóng góp ý kiến",
          "Lắng nghe và tôn trọng ý kiến của thành viên khác",
          "Sử dụng bằng chứng để giải thích hoặc bảo vệ ý kiến",
          "Tham gia phản biện và điều chỉnh kết quả khi cần",
          "Hợp tác để hoàn thành sản phẩm đúng thời gian"
        ]
      },
      {
        title: "RUBRIC ĐÁNH GIÁ HOẠT ĐỘNG THẢO LUẬN NHÓM VÀ GIẢI QUYẾT VẤN ĐỀ",
        criteria: [
          {
            name: "Hợp tác và phân công nhóm",
            levels: [
              "Mức 1 (Cần cố gắng): 1-2 thành viên làm, các thành viên khác thụ động",
              "Mức 2 (Đạt): Phân công rõ ràng, hầu hết thành viên tham gia thảo luận",
              "Mức 3 (Tốt): Hợp tác ăn ý, tương tác phản biện sôi nổi, hỗ trợ nhau xuất sắc"
            ]
          },
          {
            name: "Tính chính xác khoa học",
            levels: [
              "Mức 1: Dự đoán sai chiều chuyển dịch hoặc thiếu biểu thức Kc",
              "Mức 2: Dự đoán đúng các yếu tố cơ bản, viết đúng biểu thức Kc",
              "Mức 3: Giải thích sâu sắc cơ chế vi mô, liên hệ thực tiễn chính xác 100%"
            ]
          },
          {
            name: "Ứng dụng Năng lực số & AI",
            levels: [
              "Mức 1: Chưa biết khai thác mô phỏng PhET hoặc công cụ AI",
              "Mức 2: Sử dụng được mô phỏng và tra cứu thông tin cơ bản",
              "Mức 3: Đặt prompt chuẩn, kiểm chứng và phản biện thông tin AI sắc bén"
            ]
          }
        ]
      }
    ],
    safetyNotes: [
      "Khí NO2 có tính độc, mùi hắc và gây kích ứng đường hô hấp. Thí nghiệm điều chế và nghiên cứu NO2 phải tiến hành trong ống nghiệm nút kín hoặc trong tủ hút.",
      "Khi ngâm ống nghiệm vào nước đá hoặc nước nóng, tránh va đập mạnh làm vỡ thủy tinh gây bỏng nhiệt."
    ]
  }
};
