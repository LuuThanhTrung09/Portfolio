const password = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const confirmPassword = document.getElementById('confirmPassword');
const signupForm = document.getElementById('signupForm');

// Password strength checker
password.addEventListener('input', function() {
    const val = this.value;
    let strength = 0;
    
    if (val.length >= 6) strength++;
    if (val.length >= 10) strength++;
    if (/[a-z]/.test(val) && /[A-Z]/.test(val)) strength++;
    if (/\d/.test(val)) strength++;
    if (/[^a-zA-Z0-9]/.test(val)) strength++;
    
    const colors = ['#d32f2f', '#ff9800', '#ffc107', '#8bc34a', '#4caf50'];
    const texts = ['Rất yếu', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'];
    const widths = ['20%', '40%', '60%', '80%', '100%'];
    
    if (val.length > 0) {
        strengthBar.style.width = widths[strength];
        strengthBar.style.background = colors[strength];
        strengthText.textContent = 'Độ mạnh: ' + texts[strength];
        strengthText.style.color = colors[strength];
    } else {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
    }
});

// Confirm password validation
confirmPassword.addEventListener('input', function() {
    const errorMsg = document.getElementById('confirmPasswordError');
    if (this.value !== password.value && this.value.length > 0) {
        errorMsg.classList.add('show');
    } else {
        errorMsg.classList.remove('show');
    }
});

// Form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const passwordVal = document.getElementById('password').value;
    const confirmPasswordVal = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    if (passwordVal !== confirmPasswordVal) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    if (!terms) {
        alert('Vui lòng đồng ý với điều khoản dịch vụ');
        return;
    }
    
    // Lấy danh sách users hiện tại hoặc tạo mảng mới
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Kiểm tra username đã tồn tại chưa
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        alert('Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.');
        return;
    }
    
    // Kiểm tra email đã tồn tại chưa
    const existingEmail = users.find(u => u.email === email);
    if (existingEmail) {
        alert('Email đã được sử dụng! Vui lòng sử dụng email khác.');
        return;
    }
    
    // Thêm user mới vào danh sách
    const newUser = {
        email: email,
        username: username,
        password: passwordVal,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Tự động đăng nhập sau khi đăng ký
    const loginData = {
        username: username,
        email: email,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
    };
    
    sessionStorage.setItem('currentUser', JSON.stringify(loginData));
    
    // Success
    alert('Đăng ký thành công!\n\nThông tin:\nEmail: ' + email + '\nTên đăng nhập: ' + username + '\n\nBạn sẽ được chuyển về trang chủ...');
    
    // Chuyển về trang chủ
    window.location.href = '../FujiCafe.html';
});