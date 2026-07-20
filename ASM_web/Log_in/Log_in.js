// Lấy các phần tử
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const loginBtn = document.getElementById('loginBtn');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

// Kiểm tra xem có lưu thông tin đăng nhập không
window.addEventListener('load', function() {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }
});

// Xóa thông báo lỗi khi người dùng nhập
usernameInput.addEventListener('input', function() {
    this.classList.remove('error');
    usernameError.classList.remove('show');
});

passwordInput.addEventListener('input', function() {
    this.classList.remove('error');
    passwordError.classList.remove('show');
});

// Xử lý submit form
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset thông báo lỗi
    usernameError.classList.remove('show');
    passwordError.classList.remove('show');
    usernameInput.classList.remove('error');
    passwordInput.classList.remove('error');
    successMessage.classList.remove('show');
    
    // Lấy giá trị
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Validate
    let hasError = false;
    
    if (!username) {
        usernameError.textContent = 'Vui lòng nhập tên đăng nhập';
        usernameError.classList.add('show');
        usernameInput.classList.add('error');
        hasError = true;
    } else if (username.length < 3) {
        usernameError.textContent = 'Tên đăng nhập phải có ít nhất 3 ký tự';
        usernameError.classList.add('show');
        usernameInput.classList.add('error');
        hasError = true;
    }
    
    if (!password) {
        passwordError.textContent = 'Vui lòng nhập mật khẩu';
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        hasError = true;
    } else if (password.length < 6) {
        passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Hiển thị loading
    loginBtn.classList.add('loading');
    loginBtn.innerHTML = '<span class="spinner"></span> Đang đăng nhập...';
    
    // Giả lập gọi API
    setTimeout(function() {
        // Lấy danh sách user đã đăng ký từ localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Tìm user
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Đăng nhập thành công
            if (remember) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
            
            // Lưu thông tin user đang đăng nhập
            const loginData = {
                username: user.username,
                email: user.email,
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };
            
            sessionStorage.setItem('currentUser', JSON.stringify(loginData));
            
            // Hiển thị thông báo thành công
            successMessage.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
            successMessage.classList.add('show');
            
            // Chuyển hướng về trang chủ sau 1.5s
            setTimeout(function() {
                window.location.href = '../FujiCafe.html';
            }, 1500);
        } else {
            // Đăng nhập thất bại
            loginBtn.classList.remove('loading');
            loginBtn.textContent = 'Login';
            
            usernameError.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng';
            usernameError.classList.add('show');
            usernameInput.classList.add('error');
            passwordInput.classList.add('error');
        }
    }, 1500);
});

// Xử lý nút Sign Up
document.querySelector('.btn-signup').addEventListener('click', function() {
    window.location.href = 'Sign_up.html';
});