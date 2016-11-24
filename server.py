#!/usr/bin/python
import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import os
import glob
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class MyHandler(FileSystemEventHandler):
    def on_modified(self, event):
        print 'File changed:', event.src_path
        if '.js' in event.src_path:
	        buildJS()

def buildJS():
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
				print 'compiled files in '+currentDir
				currentDir = folder

			text = open(filename, 'r').read()
			s +='\n /** %s **/ \n%s' % (file.upper(), text)

	if not os.path.exists(directory):
	  os.makedirs(directory)

	print >> open(currentDir+'/compiled/compiled.jsx', 'w'), s
	currentDir = folder
	print 'compiled files in '+currentDir


def server():

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
	sa = httpd.socket.getsockname()

	print "Serving HTTP on", sa[0], "port", sa[1], "..."
	httpd.serve_forever()

if __name__ == "__main__":
  buildJS()
  event_handler = MyHandler()
  observer = Observer()
  observer.schedule(event_handler, path='.', recursive=True)
  observer.start()
  server()

  try:
      while True:
          time.sleep(1)
  except KeyboardInterrupt:
      observer.stop()
  observer.join()
