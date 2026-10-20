
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GameButton } from './game-button'
import Image from 'next/image' // Thêm import Image để chèn ảnh

export function HistoryNewspaperModal({ open, onContinue }: { open: boolean, onContinue: () => void }) {
  const [page, setPage] = useState(1)
  
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <motion.div 
          key={page}
          initial={{ opacity: 0, rotateY: page === 1 ? -90 : 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: page === 1 ? 90 : -90 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#e6d5b8] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:p-10 border border-[#8b7d6b]"
          style={{ 
            fontFamily: '"Georgia", "Times New Roman", serif',
            backgroundImage: 'radial-gradient(circle, transparent 20%, rgba(139, 125, 107, 0.2) 100%)'
          }}
        >
          {/* Vết ố loang lổ */}
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")' }} />

          {/* Phần đầu tờ báo */}
          <div className="relative text-center border-b-4 border-double border-[#2c221a] pb-4 mb-6">
            <h1 className="text-4xl font-black text-[#2c221a] uppercase tracking-[0.2em] drop-shadow-sm sm:text-5xl">
              Tin Nước Nga
            </h1>
            <div className="flex justify-between text-xs italic text-[#4a3b32] mt-2 border-t border-[#2c221a] pt-1 px-2 sm:text-sm">
              <span>{page === 1 ? "Số ra ngày 30/12/1922" : "Số đặc biệt: Góc nhìn lịch sử"}</span>
              <span>Giá: 1 Kopeck</span>
            </div>
          </div>

          {/* TƯ LIỆU 1 */}
          {page === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative space-y-6 text-[#2c221a]">
              <h2 className="text-2xl font-bold uppercase text-center border-b border-[#2c221a] pb-2 mb-4 tracking-wider">
                Chính thức thành lập Liên bang Xô Viết!
              </h2>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Cột chữ bên trái */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1 underline decoration-double">1. Bốn nước sáng lập</h3>
                    <p className="text-justify text-[15px] leading-relaxed">
                      <span className="float-left text-5xl font-black leading-none pr-2 pt-1">T</span>
                      ại Đại hội Xô viết toàn Liên bang, 4 quốc gia đã ký kết hiệp ước hợp nhất: Nga, Ukraine, Belarus và Liên bang Xô viết Ngoại Kavkaz (TSFSR). 
                      <em className="text-sm block mt-1">(Lưu ý: Phải đến năm 1940 mới gom đủ 15 nước cộng hòa).</em>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 underline decoration-double">2. Nghịch lý Hiến pháp 1924</h3>
                    <p className="text-justify text-[15px] leading-relaxed">
                      Bản Hiến pháp đầu tiên ghi rõ mỗi nước cộng hòa đều có <strong>"quyền tự do ly khai"</strong>. Tuy nhiên, đây là một "chiêu bài" để thuyết phục các dân tộc gia nhập, vì trên thực tế không ai có thể ly khai khi Đảng Cộng sản kiểm soát tuyệt đối.
                    </p>
                  </div>
                </div>

                {/* Cột ảnh bên phải (Cậu thay link ảnh Lenin vào đây) */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] border-4 border-[#2c221a] p-1 bg-[#d4c4a8]">
                    <img 
                      src="/images/lenin.jpg"
                      alt="Lenin" 
                      className="w-full h-full object-cover grayscale sepia-[.30] contrast-125"
                    />
                  </div>
                  <p className="text-xs italic mt-2 text-center">Lãnh tụ Lenin - Người đặt nền móng cho Liên bang Xô Viết.</p>
                </div>
              </div>

              <div className="bg-[#d4c4a8] p-4 border-l-4 border-[#2c221a] italic text-sm shadow-inner mt-4">
                "Bối cảnh lịch sử: Đất nước vừa trải qua Nội chiến và nạn đói 5 triệu người. Lenin muốn một liên bang bình đẳng, nhưng Stalin lại thực thi một bộ máy tập quyền cực đoan. Cuộc chiến trong bóng tối đã bắt đầu..."
              </div>
            </motion.div>
          )}

          {/* TƯ LIỆU 2 */}
          {page === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative space-y-6 text-[#2c221a]">
              <h2 className="text-2xl font-bold uppercase text-center border-b border-[#2c221a] pb-2 mb-4 tracking-wider">
                Ý nghĩa lịch sử & Nỗi niềm nước Nga
              </h2>
              
              <div className="flex flex-col md:flex-row-reverse gap-6">
                 {/* Cột chữ bên phải */}
                 <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2 underline decoration-double">1. Ý nghĩa thành lập</h3>
                    <ul className="list-disc list-inside space-y-2 text-[15px] leading-relaxed text-justify pl-2">
                      <li><strong>Trong nước:</strong> Hợp nhất các dân tộc, tạo sức mạnh đoàn kết phát triển kinh tế - xã hội và tăng cường vị thế quốc tế.</li>
                      <li><strong>Quốc tế:</strong> Là chỗ dựa tinh thần, vật chất cho phong trào cách mạng thế giới (trong đó có Việt Nam), tạo tiền đề cho hệ thống XHCN.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2 underline decoration-double">2. Vì sao 67% người Nga tiếc nuối? (2021)</h3>
                    <ul className="list-disc list-inside space-y-2 text-[15px] leading-relaxed text-justify pl-2">
                      <li><strong>Mất vị thế siêu cường:</strong> Từ quốc gia đi đầu về không gian, quân sự, nước Nga thập niên 1990 rơi vào khủng hoảng, nghèo đói.</li>
                      <li><strong>An sinh xã hội:</strong> Người dân nhớ sự ổn định của y tế, giáo dục miễn phí, nhà ở và việc làm bao cấp.</li>
                      <li><strong>Giá trị nhân văn:</strong> Tinh thần quốc tế vô sản, khoa học vĩ đại (Sputnik, Gagarin) và lý tưởng xã hội công bằng.</li>
                    </ul>
                  </div>
                </div>

                {/* Cột ảnh bên trái (Cậu thay link ảnh poster vào đây) */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] border-4 border-[#2c221a] p-1 bg-[#d4c4a8]">
                    <img 
                      src="/images/lenin3.jpg"
                      alt="Poster Xô Viết" 
                      className="w-full h-full object-cover grayscale sepia-[.30] contrast-125"
                    />
                  </div>
                  <p className="text-xs italic mt-2 text-center">Tinh thần đoàn kết của giai cấp vô sản.</p>
                </div>
              </div>

              {/* KHUNG GHI NHẬN CỦA NHÓM */}
              <div className="mt-6 border-t border-[#2c221a] pt-4">
                <p className="text-center text-sm italic font-semibold">
                  -- Thực hiện bởi Tổ 1 --
                </p>
                <p className="text-center text-xs mt-1 text-[#4a3b32]">
                  _ M.Huy - L.Ngọc - K.Vy - H.Như - Q.Minh - Quý - T.Anh - V.Anh - Hiền - H.Phương _
                </p>
              </div>
            </motion.div>
          )}

          {/* Nút điều hướng */}
          <div className="mt-8 flex justify-between items-center relative z-10" style={{ fontFamily: 'Courier New, Courier, monospace' }}>
            {/* Nút quay lại trang 1 */}
            <div>
              {page === 2 && (
                <GameButton onClick={() => setPage(1)} className="bg-[#3e2723] text-[#e6d5b8] border-2 border-[#2c221a] hover:bg-[#5d4037] px-6 shadow-[4px_4px_0px_#2c221a] hover:translate-y-1 hover:shadow-[2px_2px_0px_#2c221a] transition-all">
                  ◀ LÙI LẠI
                </GameButton>
              )}
            </div>

            {/* Nút đi tiếp / Chiến đấu */}
            <div>
              {page === 1 ? (
                <GameButton onClick={() => setPage(2)} className="bg-[#2c221a] text-[#e6d5b8] border-2 border-[#2c221a] hover:bg-[#4a3b32] px-6 shadow-[4px_4px_0px_#2c221a] hover:translate-y-1 hover:shadow-[2px_2px_0px_#2c221a] transition-all">
                  LẬT TRANG ➔
                </GameButton>
              ) : (
                <GameButton onClick={onContinue} className="bg-[#8b1c1c] text-[#e6d5b8] border-2 border-[#4a0e0e] hover:bg-[#a92525] px-6 py-3 text-lg font-bold shadow-[4px_4px_0px_#4a0e0e] hover:translate-y-1 hover:shadow-[2px_2px_0px_#4a0e0e] transition-all tracking-widest">
                  [ CHIẾN ĐẤU! ]
                </GameButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}