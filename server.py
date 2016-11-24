import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import os
import glob

HandlerClass = SimpleHTTPRequestHandler
ServerClass  = BaseHTTPServer.HTTPServer
Protocol     = "HTTP/1.0"

if sys.argv[1:]:
    port = int(sys.argv[1])
else:
    port = 8000
server_address = ('127.0.0.1', port)

HandlerClass.protocol_version = Protocol
httpd = ServerClass(server_address, HandlerClass)

# compile jsx into one jsx
i = 0
currentDir = ''
s = ''

for filename in glob.iglob('./**/*.jsx'):
		root, folder, file = filename.split('/')

		

		if i == 0:
			currentDir = folder
			directory = os.path.join(root, folder, 'compiled')
			i = 1

		if currentDir != folder:

			if not os.path.exists(directory):
				os.makedirs(directory)
			print directory

			print >> open(currentDir+'/compiled/compiled.jsx', 'w'), s
			s = ''
			print 'made files in '+currentDir
			currentDir = folder

		text = open(filename, 'r').read()
		s +='\n'+text

if not os.path.exists(directory):
  os.makedirs(directory)

print >> open(currentDir+'/compiled/compiled.jsx', 'w'), s
currentDir = folder
print 'made files in '+currentDir

sa = httpd.socket.getsockname()
# print "Serving HTTP on", sa[0], "port", sa[1], "..."
# httpd.serve_forever()
