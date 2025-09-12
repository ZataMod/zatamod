// Lấy các phần tử popup
const welcomePopup = document.getElementById('welcome-popup');
const closeBtn = document.getElementById('close-popup-btn');
const backgroundMusic = document.getElementById('background-music');

// Sự kiện khi bấm nút đóng
closeBtn.addEventListener('click', () => {
    welcomePopup.style.display = 'none';
    // Phát nhạc khi popup đóng
    backgroundMusic.play().catch(e => {
        console.error("Lỗi khi phát nhạc:", e);
    });
});

// Hàm tính thời gian tương đối
function formatRelativeTime(dateString) {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) {
        return "vài giây trước";
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} ngày trước`;
    }
    // Nếu hơn 7 ngày, hiển thị ngày tháng cụ thể
    return postDate.toLocaleDateString('vi-VN');
}

const container = document.getElementById('file-container');

// Render danh sách file
heroes.forEach(file => {
    const card = document.createElement('div');
    card.className = 'threads-card';
    card.innerHTML = `
        <!-- Header -->
        <div class="flex items-center p-4">
            <img src="https://zatamod.vercel.app/avatar.jpg" alt="Profile Picture" class="w-10 h-10 rounded-full mr-3">
            <div>
                <span class="font-semibold">Zata Mod</span>
                <span class="text-gray-500 text-sm"> • ${formatRelativeTime(file.time)}</span>
            </div>
        </div>

        <!-- File info and preview -->
        <div class="p-4 pt-0">
            <p class="text-gray-800 mb-3 text-lg">${file.title}</p>
            <div class="image-container rounded-lg overflow-hidden mb-4 border border-gray-200">
                <img src="${file.img}" alt="File Preview">
            </div>
            
            <!-- Download Button -->
            <div class="flex justify-between items-center mt-2">
                <a href="${file.link}" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors">
                    <i class="fas fa-download mr-2"></i> Tải xuống
                </a>
            </div>
        </div>
    `;
    container.appendChild(card);
});