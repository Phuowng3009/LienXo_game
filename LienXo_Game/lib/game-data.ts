export type Station = {
  id: number
  title: string
  image: string
  imageAlt: string
  speaker: string
  /** "dialogue" = hội thoại thường, "murmur" = tiếng rì rào bàn tán (chữ chạy) */
  mode: 'dialogue' | 'murmur'
  lines: string[]
  fragment: {
    title: string
    summary: string
  }
}

export type Question = {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const STATIONS = [
  {
    id: 1,
    title: "Góc chợ",
    speaker: "Ông bán cháo",
    image: "/images/porridge.png", // Cậu tự điền link ảnh hoặc để v0 tự sinh
    imageAlt: "Ông bán cháo tại góc phố Nga",
    lines: [
      "Này anh nông dân, mua cháo không? Năm 1922 rồi mà đất nước vẫn loạn lạc quá!",
      "Anh nghe tin gì chưa? Họ vừa thành lập 'Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết' đấy!",
      "Họ bảo đây là nhà nước của công nhân, nông dân. Chữ 'Xô Viết' trong tiếng Nga nghĩa là 'Hội đồng tự quản' đấy.",
      "Nhưng mà anh đừng mơ mộng. Dù mang danh nghĩa Hội đồng, nhưng quyền lực thực sự đều nằm trong tay Đảng Cộng sản cả thôi. Mô hình này gọi là 'tập trung dân chủ'."
    ],
    fragment: {
      title: "Nghịch lý 'Xô Viết'",
      summary: "Tên gọi bắt nguồn từ 'Hội đồng tự quản' (dân chủ trực tiếp), nhưng thực tế vận hành bằng cơ chế tập trung cực độ của Đảng."
    }
  },
  {
    id: 2,
    title: "Phố chính",
    speaker: "Tiếng người rì rào",
    mode: "murmur", // Hiệu ứng chữ mờ, rì rào
    image: "/images/street.png",
    imageAlt: "Con phố Nga đìu hiu",
    lines: [
      "Khổ quá... Nội chiến kéo dài mãi. Nạn đói năm 1921-1922 cướp đi 5 triệu mạng người rồi...",
      "Nghe nói ở Kronstadt, thủy thủ - những người từng làm cách mạng - cũng nổi dậy chống lại chính quyền mới đấy.",
      "Đất nước kiệt quệ, đen tối. Chính quyền mới liệu có cứu được chúng ta không?",
      "Không biết Lenin và Stalin đang tranh cãi gì ở Moscow nữa... Nghe đâu Stalin muốn gộp các nước vào Nga, còn Lenin thì không chịu."
    ],
    fragment: {
      title: "Bối cảnh đen tối 1922",
      summary: "Liên bang không ra đời trong hòa bình, mà từ khói lửa Nội chiến, nạn đói 5 triệu người, và cuộc đấu tranh nội bộ giữa Lenin - Stalin về mô hình nhà nước."
    }
  },
  {
    id: 3,
    title: "Gầm cầu",
    speaker: "Người ăn xin",
    image: "/images/beggar.png",
    imageAlt: "Người ăn xin co ro",
    lines: [
      "Lạy ông, cho tôi xin chút bánh mì... Ông có biết tin gì về Hiến pháp mới không?",
      "Năm 1924, họ thông qua Hiến pháp đầu tiên của Liên bang. Trong đó có một điều khoản kỳ lạ lắm!",
      "Hiến pháp ghi rõ: Mỗi nước cộng hòa đều có 'quyền tự do ly khai' khỏi Liên bang!",
      "Nhưng mà trên thực tế, ai dám ly khai đâu? Đó thật sự là tự gậy ông đập lưng ông mà. Mãi đến năm 1991, khi Đảng suy yếu, các nước mới viện dẫn đúng điều luật này để tách ra đấy!"
    ],
    fragment: {
      title: "Quả bom nổ chậm (Hiến pháp 1924)",
      summary: "Quyền ly khai là 'chiêu bài' để các dân tộc tự nguyện gia nhập, nhưng lại trở thành văn bản khai tử Liên Xô vào năm 1991."
    }
  },
  {
   id: 4,
   title: "Sạp báo",
   speaker: "Cậu bé bán báo",
   image: "/images/newsboy.png",
   imageAlt: "Cậu bé bán báo trên phố",
   lines: [
     "Báo mới! Báo mới đây! Tin sốt dẻo về Đại hội Xô viết toàn Liên bang!",
     "Ngày 30/12/1922, Liên bang CHXHCN Xô Viết chính thức được thành lập!",
     "Nhưng các ông có biết không? Chỉ có 4 nước sáng lập thôi: Nga, Ukraine, Belarus và Liên bang Xô viết Ngoại Kavkaz (TSFSR)!",
     "Con số 15 nước cộng hòa mà người ta hay nói phải đến tận năm 1940 mới gom đủ đấy! Mà cái TSFSR kia cũng lạ lắm, một 'liên bang trong liên bang' gồm Armenia, Azerbaijan và Georgia!"
   ],
   fragment: {
     title: "4 nước sáng lập (1922)",
     summary: "Nga, Ukraine, Belarus và TSFSR. Mô hình ban đầu chứa một 'liên bang con' (TSFSR) cực kỳ phức tạp, được lập ra để dễ kiểm soát xung đột sắc tộc và tài nguyên."
   }
  }
]


export const QUESTIONS = [
  {
    id: 1,
    question: "Tên gọi 'Xô Viết' (Soviet) trong tiếng Nga có nghĩa gốc là gì?",
    options: ["Hội đồng tự quản", "Quân đội cách mạng", "Đảng Cộng sản", "Đế chế"],
    correctAnswer: 0,
    explanation: "Xô Viết nguyên gốc là các hội đồng tự phát của công nhân, nông dân đại diện cho nền dân chủ trực tiếp. Tuy nhiên, sau đó nó dần bị Đảng thâu tóm."
  },
  {
    id: 2,
    question: "Hiến pháp năm 1924 của Liên Xô có điều khoản gây tranh cãi nào?",
    options: ["Cấm tư hữu tài sản", "Quyền tự do ly khai", "Độc quyền lãnh đạo của Đảng", "Cấm tôn giáo"],
    correctAnswer: 1,
    explanation: "Hiến pháp 1924 cho phép các nước cộng hòa có quyền ly khai, nhưng trên thực tế không ai có thể thực hiện được vì Đảng kiểm soát tuyệt đối."
  },
  {
    id: 3,
    question: "Vì sao Hiến pháp 1924 lại cho phép 'quyền ly khai'?",
    options: ["Để các nước dễ dàng tách ra khi muốn", "Để thuyết phục các dân tộc tự nguyện gia nhập", "Để làm hài lòng Mỹ và phương Tây", "Do Stalin chủ động đề xuất"],
    correctAnswer: 1,
    explanation: "Lenin muốn dùng điều khoản này để thuyết phục các dân tộc (vốn sợ bị Nga hoàng áp bức) tự nguyện gia nhập. Ông tin giai cấp vô sản sẽ tự gắn kết họ lại."
  },
  {
    id: 4,
    question: "Năm 1991, các nước cộng hòa đã viện dẫn điều gì để tuyên bố độc lập khỏi Liên Xô?",
    options: ["Tuyên bố của Stalin", "Hiến pháp 1924", "Nghị quyết của Liên Hợp Quốc", "Hiến pháp 1977"],
    correctAnswer: 1,
    explanation: "Đây chính là lúc 'quả bom nổ chậm' phát nổ. Khi Đảng suy yếu, các nước đã dùng chính điều luật này để tách ra hợp pháp."
  },
  {
    id: 5,
    question: "TSFSR (Liên bang Xô viết Ngoại Kavkaz) bao gồm những nước nào?",
    options: ["Nga, Ukraine, Belarus", "Armenia, Azerbaijan, Georgia", "Kazakhstan, Uzbekistan, Turkmenistan", "Litva, Latvia, Estonia"],
    correctAnswer: 1,
    explanation: "TSFSR là một 'liên bang trong liên bang' kỳ lạ gồm 3 nước vùng Kavkaz, được gộp lại để dễ kiểm soát."
  },
  {
    id: 6,
    question: "Lý do sâu xa nhất khiến Stalin gộp 3 nước Armenia, Azerbaijan, Georgia vào TSFSR là gì?",
    options: ["Để phát triển du lịch, kinh tế và nâng cao đời sống người dân", "Để chia để trị, dập tắt xung đột sắc tộc và kiểm soát tài nguyên (dầu mỏ, cảng biển)", "Do 3 nước tự nguyện xin gộp", "Để tạo ra một quốc gia, đế chế mới hùng mạnh, lật đổ các cường quốc ngoại địch chèn ép"],
    correctAnswer: 1,
    explanation: "Gộp lại giúp Moscow kiểm soát dầu mỏ Baku, cảng biển Batumi và đóng vai trò trọng tài dập tắt xung đột giữa 3 nước này."
  },
  {
    id: 7,
    question: "Vì sao TSFSR lại bị giải thể vào năm 1936?",
    options: ["Do kinh tế sụp đổ", "Mục đích kiểm soát của Stalin đã đạt được", "Do chiến tranh thế giới thứ 2 nổ ra", "Do Mỹ cùng Liên Hợp Quốc can thiệp"],
    correctAnswer: 1,
    explanation: "Khi Stalin đã nắm quyền lực tuyệt đối, ông xé nhỏ TSFSR thành 3 nước trực thuộc để 'chia phần thưởng' và dễ quản lý hơn."
  },
  {
    id: 8,
    question: "Năm 1922, ai là người đề xuất kế hoạch 'tự trị hóa' (sáp nhập các nước vào Nga)?",
    options: ["Lenin", "Stalin", "Trotsky", "Gorbachev"],
    correctAnswer: 1,
    explanation: "Stalin muốn các nước sáp nhập thẳng vào Nga để tập trung quyền lực. Lenin phản đối kịch liệt vì đó là tư tưởng 'Đại Nga'."
  },
  {
    id: 9,
    question: "Thông điệp sâu sắc nhất từ cuộc chiến trong bóng tối giữa Lenin và Stalin (1922) là gì?",
    options: ["Lenin là người chiến thắng vĩ đại", "Kẻ nắm bộ máy là kẻ chiến thắng", "Stalin là một người tốt", "Cả hai đều thất bại"],
    correctAnswer: 1,
    explanation: "Lenin có lý tưởng nhưng bệnh nặng. Stalin thực dụng và nắm bộ máy Đảng. Trong khủng hoảng, lịch sử chọn kẻ nắm quyền lực thực tế."
  },
  {
    id: 10,
    question: "Vì sao cuối đời Lenin bị rơi vào bi kịch?",
    options: ["Vì ông quá giàu có", "Vì bị Stalin giam lỏng, ông nhìn thấy tương lai độc tài nhưng không còn sức ngăn cản", "Vì ông bị nhân dân quay lưng", "Vì ông muốn sang Mỹ sống"],
    correctAnswer: 1,
    explanation: "Những ngày cuối đời, Lenin bị liệt và bị Stalin cô lập. Ông viết di chúc tố cáo Stalin nhưng không thể thay đổi cục diện."
  },
  {
    id: 11,
    question: "Trong những năm 1970-1980, yếu tố nào khiến lòng dân Liên Xô sụt giảm nghiêm trọng?",
    options: ["Sự tha hóa của bộ máy quan liêu", "Do người dân quá giàu có", "Do chiến tranh thế giới thứ 3", "Do thiếu tài nguyên thiên nhiên"],
    correctAnswer: 0,
    explanation: "Bộ máy quan liêu trở thành một 'giai cấp mới' sống xa hoa, bóc lột trong khi dân chúng xếp hàng mua nhu yếu phẩm. Lòng dân mất vì bất công và giả dối."
  },
  {
    id: 12,
    question: "Chiến tranh Afghanistan (1979-1989) được xem là gì đối với Liên Xô?",
    options: ["Là cơ hội để mở rộng lãnh thổ", "Là 'giọt nước tràn ly' ", "Là một chiến thắng vang dội", "Là cuộc chiến tranh vệ quốc"],
    correctAnswer: 1,
    explanation: "Cuộc chiến này ngốn hàng núi tiền, khiến thanh niên Xô Viết chết ở xa xứ và làm xói mòn niềm tin của người dân vào chính quyền."
  },
  {
    id: 13,
    question: "Chiến lược nào của Mỹ và phương Tây đã góp phần làm cạn kiệt ngân sách Liên Xô?",
    options: ["Viện trợ kinh tế không hoàn lại", "Sáng kiến Phòng thủ Chiến lược (SDI) và thao túng giá dầu", "Chiến lược 'Chiến tranh giữa các vì sao' (SDI) năm 1983", "Bào mòn bằng văn hóa đại chúng (nhạc Rock, phim Hollywood, quần bò Levi's)"],
    correctAnswer: 1,
    explanation: "Mỹ ép Liên Xô chạy đua vũ trang (SDI) và dùng dầu mỏ làm vũ khí kinh tế để bóp nghẹt nguồn thu ngoại tệ."
  },
  {
    id: 14,
    question: "Vì sao Việt Nam không đi đến bờ vực sụp đổ như Liên Xô dù cùng đi theo XHCN?",
    options: ["Vì Việt Nam không bị Mỹ gây sức ép, có thời gian để phát triển", "Vì luôn chú trọng xây dựng nhà nước pháp quyền, chống tham nhũng, đảm bảo an sinh thực chất cho dân", "Vì Việt Nam không dùng mô hình liên bang, liên tục đổi mới cải tiến và đi theo con đường hợp nhất toàn vẹn", "Vì Việt Nam giàu tài nguyên hơn"],
    correctAnswer: 1,
    explanation: "Việt Nam nhận thức được bài học từ Liên Xô: pháp luật phải thực thi, đoàn kết dân tộc phải bằng lợi ích thực chất (cơm ăn áo mặc) và Đảng phải tự đổi mới."
  },
  {
    id: 15,
    question: "Tên gọi 'Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết' chứa đựng nghịch lý gì?",
    options: ["Mang tên 'Hội đồng tự quản' nhưng vận hành bằng 'tập trung cực độ'", "Mang danh nghĩa là một liên bang, nhưng thực tế các nước cộng hòa không có quyền ly khai", "Lấy tên là 'Xã hội chủ nghĩa' nhưng lại cho phép kinh tế tư nhân phát triển tự do.", "Lấy tên là 'Xã hội chủ nghĩa' nhưng lại cho phép kinh tế tư nhân phát triển tự do."],
    correctAnswer: 0,
    explanation: "Đó là bi kịch của cách mạng: Tên gọi đại diện cho dân chủ trực tiếp, nhưng thực tế quyền lực chỉ nằm trong tay Đảng Cộng sản."
  }
];

export const SURVIVAL_CONFIG = {
  initialLives: 10,
  bulletIntervalMs: 1500,
  bulletFallMs: 3000,
  lanes: 5,
}
