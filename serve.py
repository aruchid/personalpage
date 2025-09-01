import os
import socketserver
from urllib.parse import unquote
from http.server import SimpleHTTPRequestHandler
import ssl
import subprocess
import sys

PORT = 5000
HTTPS_ENABLED = os.getenv("HTTPS", "1") == "1"  # 默认启用HTTPS
HTTPS_PORT = int(os.getenv("HTTPS_PORT", "5000"))  # 默认使用5000端口
CERT_FILE = os.getenv("CERT_FILE", "cert.pem")
KEY_FILE = os.getenv("KEY_FILE", "key.pem")
TLS_VERSION = os.getenv("TLS_VERSION", "TLSv1_2")  # TLSv1_2 or TLSv1_3
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))


def generate_self_signed_cert():
    """生成自签名SSL证书"""
    if not os.path.exists(CERT_FILE) or not os.path.exists(KEY_FILE):
        print(f"正在生成自签名SSL证书...")
        print(f"证书文件路径: {os.path.abspath(CERT_FILE)}")
        print(f"私钥文件路径: {os.path.abspath(KEY_FILE)}")
        
        # 尝试多个可能的OpenSSL路径
        openssl_paths = [
            "openssl",  # 系统PATH中的openssl
            "C:\\Program Files\\OpenSSL-Win64\\bin\\openssl.exe",  # 默认安装路径
            "C:\\Program Files (x86)\\OpenSSL-Win64\\bin\\openssl.exe",  # 32位系统
            "C:\\OpenSSL-Win64\\bin\\openssl.exe",  # 其他可能的安装路径
        ]
        
        openssl_found = None
        for path in openssl_paths:
            try:
                result = subprocess.run([path, "version"], 
                                      capture_output=True, text=True, timeout=10)
                if result.returncode == 0:
                    openssl_found = path
                    print(f"找到OpenSSL: {path}")
                    break
            except (subprocess.TimeoutExpired, FileNotFoundError):
                continue
        
        if not openssl_found:
            print("警告: 无法找到OpenSSL，请确保已正确安装")
            print("下载地址: https://slproweb.com/products/Win32OpenSSL.html")
            return False
        
        try:
            # 使用更兼容的OpenSSL命令格式
            # 先创建配置文件
            config_content = """[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = CN
ST = Beijing
L = Beijing
O = Personal
CN = localhost

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = 127.0.0.1
IP.1 = 127.0.0.1
"""
            
            config_file = "openssl.conf"
            with open(config_file, "w") as f:
                f.write(config_content)
            
            print(f"配置文件已创建: {config_file}")
            
            # 生成私钥
            print("正在生成私钥...")
            key_result = subprocess.run([
                openssl_found, "genrsa", "-out", KEY_FILE, "4096"
            ], capture_output=True, text=True, timeout=30)
            
            if key_result.returncode != 0:
                print(f"生成私钥失败: {key_result.stderr}")
                print(f"私钥命令输出: {key_result.stdout}")
                return False
            
            print("私钥生成成功")
            
            # 生成证书
            print("正在生成证书...")
            cert_result = subprocess.run([
                openssl_found, "req", "-new", "-x509", "-key", KEY_FILE, 
                "-out", CERT_FILE, "-days", "365", "-config", config_file
            ], capture_output=True, text=True, timeout=30)
            
            # 清理配置文件
            try:
                os.remove(config_file)
                print("配置文件已清理")
            except:
                pass
            
            if cert_result.returncode != 0:
                print(f"生成证书失败: {cert_result.stderr}")
                print(f"证书命令输出: {cert_result.stdout}")
                return False
            
            print(f"SSL证书已生成: {CERT_FILE}, {KEY_FILE}")
            
            # 验证文件是否存在
            if os.path.exists(CERT_FILE) and os.path.exists(KEY_FILE):
                print("证书文件验证成功")
                return True
            else:
                print("证书文件验证失败")
                return False
            
        except (subprocess.CalledProcessError, subprocess.TimeoutExpired) as e:
            print(f"生成SSL证书失败: {e}")
            if hasattr(e, 'stderr') and e.stderr:
                print(f"错误详情: {e.stderr}")
            print("请检查OpenSSL安装是否正确")
            return False
        except Exception as e:
            print(f"未知错误: {e}")
            import traceback
            traceback.print_exc()
            return False
    
    return True


class RootToHomeRequestHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        # Normalize and rewrite root path to /home.html
        cleaned = unquote(path.split('?', 1)[0].split('#', 1)[0])
        if cleaned in ('', '/'):
            cleaned = '/home.html'
        return super().translate_path(cleaned)

    def log_message(self, format: str, *args) -> None:
        # Keep console clean; comment out to enable request logs
        pass


def run_server() -> None:
    # 在函数开始时定义变量
    https_enabled = HTTPS_ENABLED
    bind_port = HTTPS_PORT if https_enabled else PORT
    
    # Threaded server for concurrent requests
    class ThreadingHTTPServer(socketserver.ThreadingTCPServer):
        allow_reuse_address = True

    # Provide directory explicitly for correct path resolution (Python 3.7+)
    def handler_factory(*args, **kwargs):
        return RootToHomeRequestHandler(*args, directory=ROOT_DIR, **kwargs)
    
    with ThreadingHTTPServer(("", bind_port), handler_factory) as httpd:
        if https_enabled:
            if not generate_self_signed_cert():
                print("切换到HTTP模式")
                https_enabled = False
                bind_port = PORT
            else:
                context = ssl.SSLContext(
                    ssl.PROTOCOL_TLS_SERVER
                )
                # Set minimum TLS version if requested
                try:
                    if TLS_VERSION == "TLSv1_3" and hasattr(ssl, "TLSVersion"):
                        context.minimum_version = ssl.TLSVersion.TLSv1_3
                    else:
                        # default to TLS 1.2
                        if hasattr(ssl, "TLSVersion"):
                            context.minimum_version = ssl.TLSVersion.TLSv1_2
                except Exception:
                    pass
                context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)
                httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
                scheme = "https"
        
        if not https_enabled:
            scheme = "http"
            
        print(f"Serving '{ROOT_DIR}' at {scheme}://localhost:{bind_port} (root -> /home.html)")
        if https_enabled:
            print("注意: 使用自签名证书，浏览器会显示安全警告，这是正常的")
            print("在开发环境中可以点击'高级' -> '继续访问'来访问网站")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
        finally:
            httpd.server_close()


if __name__ == "__main__":
    run_server() 