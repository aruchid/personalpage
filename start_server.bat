@echo off
echo 正在启动个人网站服务器...
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未找到Python，请先安装Python
    pause
    exit /b 1
)

REM 检查OpenSSL是否安装（检查多个可能的路径）
set OPENSSL_FOUND=0
echo 正在检查OpenSSL安装...

REM 检查系统PATH中的openssl
openssl version >nul 2>&1
if not errorlevel 1 (
    echo 找到OpenSSL: 系统PATH中
    set OPENSSL_FOUND=1
    goto :openssl_ok
)

REM 检查默认安装路径
if exist "C:\Program Files\OpenSSL-Win64\bin\openssl.exe" (
    echo 找到OpenSSL: C:\Program Files\OpenSSL-Win64\bin\openssl.exe
    set OPENSSL_FOUND=1
    goto :openssl_ok
)

REM 检查32位系统安装路径
if exist "C:\Program Files (x86)\OpenSSL-Win64\bin\openssl.exe" (
    echo 找到OpenSSL: C:\Program Files (x86)\OpenSSL-Win64\bin\openssl.exe
    set OPENSSL_FOUND=1
    goto :openssl_ok
)

REM 检查其他可能的安装路径
if exist "C:\OpenSSL-Win64\bin\openssl.exe" (
    echo 找到OpenSSL: C:\OpenSSL-Win64\bin\openssl.exe
    set OPENSSL_FOUND=1
    goto :openssl_ok
)

:openssl_not_found
echo 警告: 未找到OpenSSL，将使用HTTP模式
echo 要启用HTTPS，请安装OpenSSL: https://slproweb.com/products/Win32OpenSSL.html
echo.
set HTTPS=0
goto :start_server

:openssl_ok
echo 找到OpenSSL，将启用HTTPS模式
set HTTPS=1

:start_server
echo.
echo 启动服务器...
python serve.py

pause 