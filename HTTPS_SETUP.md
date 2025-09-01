# HTTPS设置说明

## 问题描述
您的网站显示"不安全"是因为使用了HTTP协议而不是HTTPS协议。

## 解决方案

### 方法1: 使用自签名证书（推荐用于开发环境）

1. **安装OpenSSL**
   - 下载地址: https://slproweb.com/products/Win32OpenSSL.html
   - 选择Win64版本安装

2. **启动服务器**
   - 双击运行 `start_server.bat`
   - 或者直接运行: `python serve.py`

3. **访问网站**
   - 使用 `https://localhost:5000` 访问
   - 浏览器会显示安全警告，这是正常的
   - 点击"高级" -> "继续访问"即可

### 方法2: 使用HTTP模式（不推荐）

如果不想安装OpenSSL，可以设置环境变量：
```bash
set HTTPS=0
python serve.py
```

### 方法3: 使用正式SSL证书（推荐用于生产环境）

1. 从证书颁发机构获取正式SSL证书
2. 将证书文件重命名为 `cert.pem` 和 `key.pem`
3. 启动服务器即可

## 注意事项

- 自签名证书在开发环境中使用是安全的
- 生产环境建议使用正式的SSL证书
- 如果遇到证书问题，服务器会自动切换到HTTP模式
- 端口5000是默认端口，可以通过环境变量修改

## 环境变量

- `HTTPS`: 是否启用HTTPS (默认: 1)
- `HTTPS_PORT`: HTTPS端口 (默认: 5000)
- `CERT_FILE`: 证书文件路径 (默认: cert.pem)
- `KEY_FILE`: 私钥文件路径 (默认: key.pem) 