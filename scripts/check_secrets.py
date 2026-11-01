"""Reject tracked PEM private keys without displaying their contents."""
import re
import subprocess
import sys

pattern = re.compile(rb"-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----")
files = subprocess.check_output(["git", "ls-files", "-z"]).split(b"\0")
found = []
for raw in files:
    if not raw:
        continue
    path = raw.decode('utf-8', errors='surrogateescape')
    with open(path, 'rb') as file:
        if pattern.search(file.read()):
            found.append(path)
if found:
    print('Private key material found in: ' + ', '.join(found), file=sys.stderr)
    sys.exit(1)
print('PASS: no PEM private keys in tracked files')
