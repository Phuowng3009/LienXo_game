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
    question: "Đâu là 'nguyên nhân gốc rễ' (bản chất) khiến tên gọi 'Liên bang CHXHCN Xô Viết' chứa đựng sự nghịch lý?",
    options: [
      "Tên gọi 'Xô Viết' (Hội đồng tự quản) đại diện cho dân chủ, nhưng thực tế vận hành bằng cơ chế tập trung quan liêu của Đảng.", 
      "Hiến pháp 1924 cho phép các nước cộng hòa ly khai, nhưng trên thực tế Liên Xô không bao giờ cho phép điều đó xảy ra.", 
      "Mô hình kinh tế kế hoạch hóa tập trung đã kìm hãm sự phát triển của ngành công nghiệp nhẹ và nông nghiệp.", 
      "Đảng Cộng sản độc quyền lãnh đạo nhưng vẫn tổ chức bầu cử Xô Viết để duy trì hình thức nhà nước liên bang."
    ],
    correctAnswer: 0,
    explanation: "Nghịch lý gốc rễ nằm ở chỗ: Tên gọi ca ngợi 'Hội đồng tự quản' (dân chủ trực tiếp), nhưng bộ máy nhà nước thực tế lại vận hành bằng nguyên tắc 'tập trung dân chủ' cực đoan, nơi quyền lực thuộc về Đảng."
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
    options: ["Nga, Ukraine, Belarus", "Kazakhstan, Uzbekistan, Turkmenistan", "Armenia, Azerbaijan, Georgia", "Litva, Latvia, Estonia"],
    correctAnswer: 2,
    explanation: "TSFSR là một 'liên bang trong liên bang' kỳ lạ gồm 3 nước vùng Kavkaz, được gộp lại để dễ kiểm soát."
  },
  {
    id: 6,
    question: "Lý do 'sâu xa' (về mặt địa chính trị) khiến Stalin gộp 3 nước Armenia, Azerbaijan, Georgia vào TSFSR là gì?",
    options: [
      "Để dễ dàng áp đặt mô hình kinh tế tập thể hóa nông nghiệp trên toàn bộ khu vực Kavkaz.", 
      "Để tạo ra một liên bang con làm bàn đạp quân sự nhằm chống lại sự bành trướng của Thổ Nhĩ Kỳ và Anh.", 
      "Để thực hiện lời hứa của Lenin về việc trao quyền tự quyết cho các dân tộc từng bị Nga hoàng áp bức.", 
      "Để dập tắt xung đột sắc tộc giữa Armenia và Azerbaijan và kiểm soát dầu mỏ Baku, cảng biển Batumi."
    ],
    correctAnswer: 3,
    explanation: "Gộp lại giúp Moscow đóng vai trò trọng tài dập xung đột, đồng thời kiểm soát 'hành lang kinh tế - quân sự' gồm dầu mỏ Baku và cảng biển Batumi. (Các đáp án khác sai vì Lenin thực ra phản đối việc gộp cứng nhắc này)."
  },
  {
    id: 7,
    question: "Vì sao TSFSR lại bị giải thể vào năm 1936?",
    options: ["Do kinh tế sụp đổ sau nhiều năm trì trệ", "Do Mỹ cùng Liên Hợp Quốc can thiệp", "Do chiến tranh thế giới thứ 2 nổ ra", "Mục đích kiểm soát của Stalin đã đạt được"],
    correctAnswer: 3,
    explanation: "Khi Stalin đã nắm quyền lực tuyệt đối, ông xé nhỏ TSFSR thành 3 nước trực thuộc để 'chia phần thưởng' và dễ quản lý hơn."
  },
  {
    id: 8,
    question: "Năm 1922, ai là người đề xuất kế hoạch 'tự trị hóa' (sáp nhập các nước vào Nga)?",
    options: ["Lenin", "Trotsky", "Stalin", "Gorbachev"],
    correctAnswer: 2,
    explanation: "Stalin muốn các nước sáp nhập thẳng vào Nga để tập trung quyền lực. Lenin phản đối kịch liệt vì đó là tư tưởng 'Đại Nga'."
  },
  {
    id: 9,
    question: "Trong cuộc chiến tranh giành quyền lực năm 1922 giữa Lenin và Stalin, đâu là yếu tố quyết định giúp Stalin chiến thắng?",
    options: [
      "Stalin nắm giữ vị trí Tổng Bí thư, kiểm soát bộ máy nhân sự và hệ thống thông tin của Đảng.", 
      "Stalin nhận được sự ủng hộ của đa số nông dân và binh lính nhờ chính sách kinh tế thực dụng.", 
      "Lenin bị đột quỵ và mất khả năng nói, khiến ông không thể công bố bức thư tố cáo Stalin.", 
      "Các nước cộng hòa ủng hộ kế hoạch 'tự trị hóa' của Stalin vì muốn sáp nhập vào Nga."
    ],
    correctAnswer: 0,
    explanation: "Uy tín cá nhân (Lenin) không thể chiến thắng bộ máy quan liêu. Stalin đã khéo léo cài người của mình vào các vị trí chủ chốt, kiểm soát mọi luồng thông tin để vô hiệu hóa bức thư của Lenin."
  },
  {
    id: 10,
    question: "Vì sao cuối đời Lenin bị rơi vào bi kịch?",
    options: ["Vì ông quá giàu có", "Vì ông chống lại Chủ nghĩa tư bản", "Vì ông bị nhân dân quay lưng", "Vì bị Stalin giam lỏng"],
    correctAnswer: 3,
    explanation: "Những ngày cuối đời, Lenin bị liệt và bị Stalin cô lập. Ông viết di chúc tố cáo Stalin nhưng không thể thay đổi cục diện và ông nhìn thấy tương lai độc tài nhưng không còn sức ngăn cản"
  },
    {
    id: 11,
    question: "Vì sao lòng dân Liên Xô sụt giảm nghiêm trọng trong những năm 1970-1980?",
    options: [
      "Do thiếu tài nguyên thiên nhiên và thiếu hụt trầm trọng sản phẩm công nghiệp nhẹ (quần áo, dày giép, xà bông,...) ", 
      "Do sự tha hóa của bộ máy quan liêu, tạo ra 'giai cấp mới' bóc lột nhân dân.", 
      "Do Liên Xô thua trong Chiến tranh Lạnh, ảnh hưởng đến uy tín quốc gia", 
      "Do người dân quá nghèo và muốn thay đổi, lật đổ chính quyền và Đảng"
    ],
    correctAnswer: 1,
    explanation: "Lòng dân mất không phải vì nghèo đói, mà vì sự bất công và giả dối. Bộ máy quan liêu sống xa hoa trong khi người dân xếp hàng mua bánh mì."
  },
  {
    id: 12,
    question: "Đâu là 'nguyên nhân trực tiếp' (giọt nước tràn ly) khiến kinh tế Liên Xô lâm vào khủng hoảng trầm trọng vào cuối thập niên 1980?",
    options: [
      "Cuộc chiến tranh Afghanistan kéo dài và sự sụt giảm giá dầu mỏ trên thị trường thế giới.", 
      "Sự trì trệ của mô hình kinh tế kế hoạch hóa tập trung (Gosplan) trong suốt nhiều thập kỷ.", 
      "Sự tha hóa của tầng lớp quan liêu và nạn tham nhũng phổ biến trong bộ máy nhà nước.", 
      "Các chính sách cải cách (Perestroika) quá nhanh và thiếu kiểm soát của Gorbachev."
    ],
    correctAnswer: 0, 
    explanation: "Mô hình kế hoạch hóa (B) và tham nhũng (C) là nguyên nhân gốc rễ. Cải cách của Gorbachev (D) là yếu tố chủ quan. Nhưng chiến tranh Afghanistan ngốn tiền và giá dầu giảm là những cú đấm trực tiếp làm cạn kiệt ngân sách."
  },
  {
    id: 13,
    question: "Vai trò của Gorbachev (lên nắm quyền 1985) trong sự sụp đổ của Liên Xô được ví như thế nào?",
    options: [
      "Là người cố tình phá hoại đất nước.", 
      "Là người 'mở tung cửa sổ' của một ngôi nhà đầy khí độc, nhưng ngôi nhà không chịu nổi sự thay đổi và sụp đổ.", 
      "Là người đã cứu sống Liên Xô khỏi bờ vực phá sản.", 
      "Là người kế thừa xuất sắc của Stalin."
    ],
    correctAnswer: 1,
    explanation: "Gorbachev không cố ý làm sập Liên Xô. Ông nhận ra sự trì trệ và cố gắng cải cách, nhưng chính những cải cách đó đã 'bấm nút' khởi động quá trình không thể đảo ngược."
  },
  {
    id: 14,
    question: "Vì sao Việt Nam có thể vượt qua khủng hoảng và không sụp đổ như Liên Xô, dù cùng chịu ảnh hưởng của mô hình Xô Viết?",
    options: [
      "Nhờ việc Đảng và Nhà nước thực hiện công cuộc Đổi mới, chuyển sang kinh tế thị trường và đẩy mạnh chống tham nhũng.", 
      "Nhờ việc Việt Nam từ bỏ mô hình nhà nước đơn nhất để chuyển sang mô hình liên bang như các nước XHCN khác.", 
      "Nhờ việc Việt Nam nhận được sự viện trợ kinh tế khổng lồ từ Mỹ và các nước phương Tây sau Chiến tranh Lạnh.", 
      "Nhờ việc Việt Nam duy trì cơ chế bao cấp, tập trung hóa để ổn định đời sống nhân dân."
    ],
    correctAnswer: 0, 
    explanation: "Việt Nam đã nhận thức được bài học từ Liên Xô: không thể duy trì cơ chế bao cấp (D sai). Chúng ta chuyển sang kinh tế thị trường định hướng XHCN, xây dựng nhà nước pháp quyền và đặc biệt là chỉnh đốn Đảng."
  },
  {
    id: 15,
    question: "Tên gọi 'Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết' chứa đựng nghịch lý gì?",
    options: ["Là'Hội đồng tự quản' nhưng vận hành bằng 'tập trung cực độ'", "Lấy tên là 'Xã hội chủ nghĩa' nhưng lại cho phép kinh tế tư nhân phát triển tự do", "Là một liên bang, nhưng các nước cộng hòa không có ý định ly khai", "Là một quốc gia rộng lớn nhưng lại đặt thủ đô ở một thành phố nhỏ"],
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
