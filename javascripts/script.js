// 页面加载时检查URL参数并填充用户名
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        document.getElementById('username').value = decodeURIComponent(username);
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username) {
        alert('用户名不能为空');
        return;
    }
    
    if (!password) {
        alert('密码不能为空');
        return;
    }
    
    // 获取存储的用户数据
    const storedData = localStorage.getItem('userData');
    
    if (!storedData) {
        alert('请先注册账号');
        return;
    }
    
    const userData = JSON.parse(storedData);
    
    if (username === userData.account && password === userData.password) {
        alert('登录成功！');
    } else {
        alert('账号或密码错误');
    }
});

document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const account = document.getElementById('account').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    if (!account) {
        alert('账户不能为空');
        return;
    }
    
    if (!password) {
        alert('密码不能为空');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }
    
    const passwordPattern = /^[A-Za-z0-9]+$/;
    if (!passwordPattern.test(password)) {
        alert('密码只能包含数字和字母');
        return;
    }
    
    // 将账号密码存储到本地
    const userData = {
        account: account,
        password: password
    };
    // 将用户数据写入JSON文件
    const jsonData = JSON.stringify(userData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'userData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('注册成功！');
    window.location.href = `index.html?username=${encodeURIComponent(account)}`;
});