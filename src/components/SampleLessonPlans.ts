import type { LessonPlan } from "../types";

export const SAMPLE_LESSON_PLAN_EQUILIBRIUM: LessonPlan = {
  header: {
    schoolName: "TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG",
    department: "TỔ HÓA HỌC",
    teacherName: "Nguyễn Văn An",
    subject: "Hóa học",
    grade: "11",
    lessonTitle: "Khái niệm về cân bằng hóa học",
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
          code: "NLS3.2",
          name: "Sử dụng phần mềm và mô phỏng số",
          evidence: "Sử dụng mô phỏng PhET Reversible Reactions để quan sát biến thiên số lượng phân tử ở cấp độ vi mô."
        },
        {
          code: "NLS5.1",
          name: "Xử lý dữ liệu số",
          evidence: "Sử dụng bảng tính tính toán giá trị Kc và vẽ đồ thị nồng độ theo thời gian."
        }
      ],
      aiCompetencies: [
        {
          code: "AI2.1",
          name: "Tra cứu và tổng hợp thông tin với AI",
          evidence: "Học sinh dùng trợ lí AI để tra cứu các ứng dụng thực tế của chuyển dịch cân bằng trong sản xuất đồ uống có ga."
        },
        {
          code: "AI3.1",
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
      "Sách giáo khoa Hóa học 11, vở ghi chép, bút màu",
      "Thiết bị thông minh (Smartphone/Tablet) để truy cập ứng dụng mô phỏng số và quét mã QR tra cứu",
      "Bài tập chuẩn bị trước ở nhà theo hướng dẫn tuần trước"
    ]
  },
  learningActivities: [
    {
      id: "act_1",
      activityNumber: 1,
      period: 1,
      title: "Khởi động: Tạo tình huống có vấn đề về phản ứng thuận nghịch",
      type: "KHOI_DONG",
      typeLabel: "Hoạt động 1: Khởi động - Bí ẩn chai nước ngọt có ga (10 phút)",
      durationMinutes: 10,
      bigQuestion: "Tại sao khi mở nắp chai nước ngọt có bọt khí sủi lên, nhưng khi đóng chặt nắp lại thì hiện tượng sủi bọt dừng lại?",
      objective: "Kích thích trí tò mò, tạo mâu thuẫn nhận thức về phản ứng diễn ra theo hai chiều trái ngược nhau trong cùng một điều kiện.",
      content: "Quan sát hiện tượng thực tế mở nắp chai nước ngọt có ga và viết phương trình hòa tan của khí CO2 trong nước.",
      product: "Học sinh nêu được nhận xét: CO2 hòa tan trong nước tạo H2CO3, đồng thời H2CO3 phân hủy ngược lại thành CO2 và H2O.",
      organization: {
        teacherActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Giáo viên mở một chai nước khoáng có ga trước lớp, yêu cầu học sinh quan sát bọt khí và trả lời câu hỏi dẫn dắt: 'Điều gì xảy ra khi đóng nắp và khi mở nắp chai nước có ga?' Giao nhiệm vụ cho các cặp đôi suy nghĩ trong 2 phút."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Quan sát, lắng nghe câu hỏi của học sinh, gợi ý học sinh liên hệ đến quá trình hòa tan và phân hủy của carbonic acid (H2CO3)."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Mời đại diện 2 cặp học sinh phát biểu. Yêu cầu các học sinh khác nhận xét, bổ sung ý kiến về chiều phản ứng."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Giáo viên chốt lại: Có những phản ứng không diễn ra hoàn toàn mà xảy ra đồng thời theo 2 chiều ngược nhau. Đó là phản ứng thuận nghịch dẫn đến trạng thái cân bằng hóa học - chủ đề chính của bài học hôm nay."
          }
        ],
        studentActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Lắng nghe giáo viên giao nhiệm vụ, nhận diện câu hỏi lớn về hiện tượng sủi bọt khí trong chai nước có ga."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Làm việc theo cặp, thảo luận để giải thích hiện tượng dựa trên kiến thức phân tử CO2 và H2CO3."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Đại diện học sinh trả lời câu hỏi, ghi phương trình biểu diễn hai chiều: CO2 (aq) + H2O (l) ⇌ H2CO3 (aq)."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Lắng nghe giáo viên chuẩn hóa kiến thức, ghi tiêu đề bài học vào vở ghi chép."
          }
        ]
      },
      assessment: {
        method: "Quan sát thái độ tham gia và đánh giá câu trả lời miệng",
        criteria: "Học sinh chỉ ra được tính chất 2 chiều của quá trình biến đổi hóa học."
      }
    },
    {
      id: "act_2",
      activityNumber: 2,
      period: 1,
      title: "Hình thành kiến thức: Khái niệm phản ứng thuận nghịch và trạng thái cân bằng hóa học",
      type: "HINH_THANH_KIEN_THUC",
      typeLabel: "Hoạt động 2: Khám phá bản chất cân bằng động (25 phút)",
      durationMinutes: 25,
      bigQuestion: "Tại trạng thái cân bằng, phản ứng có dừng lại không? Vì sao nồng độ các chất không đổi?",
      objective: "Hiểu rõ phản ứng một chiều, phản ứng thuận nghịch, khái niệm tốc độ phản ứng thuận (vt) và nghịch (vn), bản chất cân bằng động khi vt = vn.",
      content: "Nghiên cứu đồ thị biến thiên tốc độ phản ứng và nồng độ các chất theo thời gian cho phản ứng H2 + I2 ⇌ 2HI.",
      product: "Hoàn thành Phiếu học tập số 1: Điền bảng so sánh và rút ra định nghĩa cân bằng hóa học.",
      organization: {
        teacherActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Phát Phiếu học tập số 1. Chiếu đồ thị biểu diễn tốc độ phản ứng thuận và nghịch theo thời gian của hệ H2(g) + I2(g) ⇌ 2HI(g). Yêu cầu các nhóm 4 học sinh nghiên cứu đồ thị và trả lời 3 câu hỏi trong phiếu."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Bao quát lớp học, hướng dẫn các nhóm gặp khó khăn khi đọc giao điểm và độ dốc của đường biểu diễn tốc độ trên đồ thị."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Gọi đại diện nhóm 2 lên bảng vẽ sơ đồ tóm tắt; mời nhóm 5 phản biện về việc tại sao gọi là 'cân bằng động' chứ không phải 'cân bằng tĩnh'."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Chuẩn hóa định nghĩa: Trạng thái cân bằng của phản ứng thuận nghịch là trạng thái mà tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch (vt = vn > 0). Tại cân bằng, phản ứng vẫn diễn ra nên nồng độ các chất không đổi."
          }
        ],
        studentActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Nhận Phiếu học tập số 1, phân công nhiệm vụ nhóm trưởng, thư ký và người báo cáo."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Phân tích đồ thị: Nhận diện vt giảm dần theo thời gian, vn tăng dần từ 0, đến thời điểm t_cb thì vt = vn."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Trình bày câu trả lời của nhóm, giải thích luận điểm 'cân bằng động' dựa trên sự chuyển động không ngừng của các phân tử."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Ghi chép định nghĩa chuẩn và các đặc điểm cốt lõi của cân bằng hóa học vào vở."
          }
        ]
      },
      assessment: {
        method: "Đánh giá sản phẩm Phiếu học tập số 1 và phần trình bày nhóm",
        criteria: "Giải thích chính xác điều kiện vt = vn và bản chất cân bằng động."
      }
    },
    {
      id: "act_3",
      activityNumber: 3,
      period: 1,
      title: "Luyện tập: Viết biểu thức hằng số cân bằng Kc",
      type: "LUYEN_TAP",
      typeLabel: "Hoạt động 3: Thiết lập và tính toán hằng số cân bằng Kc (10 phút)",
      durationMinutes: 10,
      bigQuestion: "Giá trị Kc cho biết điều gì về mức độ diễn ra của phản ứng thuận nghịch?",
      objective: "Viết đúng biểu thức Kc cho hệ đồng thể và dị thể; hiểu ý nghĩa Kc rất lớn hoặc rất nhỏ.",
      content: "Luyện tập viết biểu thức Kc cho phản ứng tổng hợp NH3, phân hủy CaCO3 và tính Kc từ số liệu nồng độ cân bằng.",
      product: "Đáp án các bài tập trắc nghiệm và tự luận ngắn trên Phiếu học tập số 2.",
      organization: {
        teacherActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Giới thiệu biểu thức tổng quát aA + bB ⇌ cC + dD => Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b). Lưu ý không đưa nồng độ chất rắn vào biểu thức. Yêu cầu làm việc cá nhân 3 bài tập nhanh."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Theo dõi học sinh làm bài, nhắc nhở lỗi thường gặp khi bỏ quên số mũ tương ứng với hệ số tỉ lượng."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Chiếu bài làm của 2 học sinh qua camera/máy chiếu, tổ chức chấm chéo đôi bạn cùng bàn."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Nhấn mạnh: Kc chỉ phụ thuộc vào bản chất phản ứng và nhiệt độ; Kc >> 1 chứng tỏ phản ứng thuận chiếm ưu thế."
          }
        ],
        studentActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Ghi nhận công thức tổng quát và quy tắc loại trừ chất rắn khỏi biểu thức hằng số cân bằng."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Làm việc độc lập trên phiếu: Viết Kc cho N2 + 3H2 ⇌ 2NH3 và C(s) + CO2(g) ⇌ 2CO(g)."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Đổi bài cho bạn bên cạnh để chấm chéo, thảo luận các điểm sai sót về hệ số mũ."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Sửa chữa bài tập vào vở và ghi nhớ quy tắc tính toán."
          }
        ]
      },
      assessment: {
        method: "Chấm chéo đồng đẳng giữa học sinh",
        criteria: "Viết đúng biểu thức có hệ số mũ và loại trừ chất rắn chính xác 100%."
      }
    },
    {
      id: "act_4",
      activityNumber: 4,
      period: 2,
      title: "Hình thành kiến thức: Các yếu tố ảnh hưởng đến chuyển dịch cân bằng - Nguyên lí Le Chatelier",
      type: "HINH_THANH_KIEN_THUC",
      typeLabel: "Hoạt động 4: Thí nghiệm và khám phá Nguyên lí Le Chatelier (25 phút)",
      durationMinutes: 25,
      bigQuestion: "Khi một hệ đang cân bằng bị tác động từ bên ngoài (nhiệt độ, nồng độ, áp suất), hệ sẽ tự điều chỉnh như thế nào?",
      objective: "Phát biểu chính xác nguyên lí Le Chatelier và giải thích được chiều chuyển dịch cân bằng dưới tác động của các yếu tố.",
      content: "Nghiên cứu thí nghiệm chuyển dịch cân bằng: 2NO2 (màu nâu đỏ) ⇌ N2O4 (không màu, delta H < 0) và tương tác mô phỏng PhET.",
      product: "Bảng phân tích chiều chuyển dịch của hệ phản ứng khi tăng/giảm nhiệt độ, áp suất và nồng độ trên Phiếu học tập số 3.",
      organization: {
        teacherActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Trình chiếu video thí nghiệm 2 ống nghiệm chứa khí NO2 ngâm đồng thời vào cốc nước nóng (60°C) và cốc nước đá (0°C). Yêu cầu học sinh quan sát sự thay đổi sắc độ màu nâu đỏ và thảo luận nhóm về chiều chuyển dịch."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Đi đến các nhóm, hướng dẫn học sinh kết nối chiều tỏa nhiệt (delta H < 0) với việc hạ nhiệt độ và màu sắc nhạt dần."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Đại diện nhóm 1 trình bày ảnh hưởng của nhiệt độ; nhóm 3 trình bày ảnh hưởng của áp suất; nhóm 4 phản biện về vai trò của chất xúc tác."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Khái quát Nguyên lí Le Chatelier: Một phản ứng thuận nghịch đang ở trạng thái cân bằng, khi chịu một tác động từ bên ngoài như biến đổi nồng độ, nhiệt độ, áp suất thì cân bằng sẽ chuyển dịch theo chiều làm giảm tác động đó."
          }
        ],
        studentActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Quan sát thí nghiệm, ghi lại hiện tượng: Ống ngâm nước đá màu nâu đỏ nhạt dần; ống ngâm nước nóng màu nâu đỏ đậm lên."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Thảo luận nhóm để phân tích nguyên nhân: Hạ nhiệt độ làm cân bằng chuyển dịch theo chiều tỏa nhiệt để chống lại sự hạ nhiệt độ."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Trình bày luận điểm trước lớp, sử dụng sơ đồ mũi tên chuyển dịch và trả lời câu hỏi phản biện của bạn học."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Ghi nhớ và học thuộc nguyên lí Le Chatelier; ghi lại lưu ý: Chất xúc tác chỉ làm tăng tốc độ đạt tới cân bằng chứ không làm chuyển dịch cân bằng."
          }
        ]
      },
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
      organization: {
        teacherActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Đặt vấn đề: 'Phân đạm là nguồn dinh dưỡng thiết yếu cho nông nghiệp nuôi sống hàng tỉ người. Các em hãy đóng vai trò Kỹ sư công nghệ hóa chất, đề xuất điều kiện nhiệt độ và áp suất cho phản ứng tổng hợp NH3, có tính đến cả tốc độ phản ứng và sự an toàn kinh tế'."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Gợi ý các nhóm sử dụng AI để tra cứu thông số thực tế của nhà máy phân đạm Phú Mỹ hoặc Cà Mau (nhiệt độ 450°C, áp suất 200 bar, xúc tác Fe)."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Cho 2 nhóm trình bày phương án; đặt câu hỏi phản biện: 'Tại sao không chọn nhiệt độ phòng để cân bằng chuyển dịch nhiều sang NH3?'"
          },
          {
            phase: "Kết luận và nhận định",
            details: "Tổng kết: Trong công nghiệp cần dung hòa giữa yếu tố cân bằng (hiệu suất) và yếu tố động học (tốc độ phản ứng) cùng yếu tố kinh tế - an toàn kỹ thuật."
          }
        ],
        studentActivities: [
          {
            phase: "Chuyển giao nhiệm vụ",
            details: "Nhận đề bài tình huống thực tiễn, phân tích phản ứng tỏa nhiệt và giảm số mol khí (4 mol khí -> 2 mol khí)."
          },
          {
            phase: "Thực hiện nhiệm vụ",
            details: "Sử dụng AI/Internet tra cứu thông số kỹ thuật thực tế, lập luận vì sao chọn nhiệt độ 400 - 450°C thay vì nhiệt độ quá thấp."
          },
          {
            phase: "Báo cáo và thảo luận",
            details: "Trình bày giải pháp: Tăng áp suất lên ~200 atm; dùng nhiệt độ vừa phải 450°C kèm xúc tác bột sắt để phản ứng đủ nhanh; tuần hoàn khí N2 và H2 chưa phản ứng."
          },
          {
            phase: "Kết luận và nhận định",
            details: "Rút ra bài học tư duy toàn diện: Khoa học luôn gắn liền với thực tiễn, kinh tế và môi trường."
          }
        ]
      },
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
        content: `Câu 1: Điền vào chỗ trống: Phản ứng thuận nghịch là phản ứng trong cùng điều kiện, xảy ra đồng thời theo hai chiều ..........................
Câu 2: Dựa vào đồ thị phản ứng H2 + I2 ⇌ 2HI, hãy mô tả:
- Tốc độ phản ứng thuận vt biến đổi như thế nào theo thời gian?
- Tốc độ phản ứng nghịch vn biến đổi như thế nào theo thời gian?
- Điểm đặc biệt tại thời điểm t_cb là gì?
Câu 3: Giải thích tại sao cân bằng hóa học là cân bằng động mà không phải cân bằng tĩnh?`,
        keyAnswer: `Đáp án:
1. ...ngược nhau.
2. vt giảm dần; vn tăng dần; tại t_cb thì vt = vn > 0.
3. Vì tại trạng thái cân bằng, phản ứng thuận và nghịch vẫn liên tục diễn ra với tốc độ bằng nhau nên nồng độ các chất trong hệ không đổi theo thời gian.`
      },
      {
        id: "ws_2",
        title: "PHIẾU HỌC TẬP SỐ 2: HẰNG SỐ CÂN BẰNG KC",
        content: `Viết biểu thức tính hằng số cân bằng Kc cho các phản ứng sau:
1. N2(g) + 3H2(g) ⇌ 2NH3(g)
2. 2SO2(g) + O2(g) ⇌ 2SO3(g)
3. CaCO3(s) ⇌ CaO(s) + CO2(g)
4. Fe2O3(s) + 3CO(g) ⇌ 2Fe(s) + 3CO2(g)`,
        keyAnswer: `1. Kc = [NH3]^2 / ([N2] * [H2]^3)
2. Kc = [SO3]^2 / ([SO2]^2 * [O2])
3. Kc = [CO2] (chất rắn CaCO3 và CaO không có mặt trong biểu thức)
4. Kc = [CO2]^3 / [CO]^3`
      },
      {
        id: "ws_3",
        title: "PHIẾU HỌC TẬP SỐ 3: DỰ ĐOÁN CHIỀU CHUYỂN DỊCH CÂN BẰNG",
        content: `Cho cân bằng: 2SO2(g) + O2(g) ⇌ 2SO3(g)   delta rH298 = -198 kJ
Dự đoán chiều chuyển dịch cân bằng (sang chiều thuận hay chiều nghịch) khi:
a) Tăng nồng độ khí O2
b) Giảm nhiệt độ của hệ
c) Tăng áp suất chung của hệ
d) Thêm chất xúc tác V2O5`,
        keyAnswer: `a) Chiều thuận (để làm giảm nồng độ O2)
b) Chiều thuận (phản ứng tỏa nhiệt delta H < 0, hạ nhiệt độ làm cân bằng chuyển dịch theo chiều tỏa nhiệt)
c) Chiều thuận (chiều giảm số mol khí: 3 mol khí -> 2 mol khí)
d) Cân bằng KHÔNG chuyển dịch (chất xúc tác chỉ làm tăng tốc độ đạt cân bằng)`
      }
    ],
    rubrics: [
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
