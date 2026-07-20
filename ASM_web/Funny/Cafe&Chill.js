const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// FIX: Sửa lỗi "lick" thành "click"
navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click());
});

const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

// Kiểm tra trạng thái đăng nhập khi trang load
window.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

function checkLoginStatus() {
    // Lấy thông tin user từ sessionStorage
    const currentUser = sessionStorage.getItem('currentUser');
    
    // Tìm link Log In trong menu
    const navItems = document.querySelectorAll('.nav-menu .nav-item');
    const loginNavItem = Array.from(navItems).find(item => {
        const link = item.querySelector('.nav-link');
        return link && link.textContent.trim() === 'Log In';
    });
    
    if (loginNavItem && currentUser) {
        const user = JSON.parse(currentUser);
        if (user.isLoggedIn) {
            const loginLink = loginNavItem.querySelector('.nav-link');
            
            // Đổi text từ "Log In" thành "Account"
            loginLink.textContent = 'Account';
            loginLink.href = '/ASM_web/ASM_web/ASM_web/Account/Account.html';
            
            // Thêm icon user (optional)
            loginLink.innerHTML = '<i class="fas fa-user-circle"></i> Account';
        }
    }
}

// Thêm event listener cho link Account (nếu có)
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Kiểm tra nếu click vào link Account
    if (target.classList.contains('nav-link') && 
        (target.textContent.includes('Account') || target.href.includes('Account.html'))) {
        
        // Kiểm tra xem user đã đăng nhập chưa
        const currentUser = sessionStorage.getItem('currentUser');
        
        if (!currentUser) {
            e.preventDefault();
            alert('Bạn cần đăng nhập để truy cập trang này!');
            window.location.href = '/ASM_web/ASM_web/ASM_web/Log_in/Log_in.html';
        }
    }
});