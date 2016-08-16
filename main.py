#!/usr/bin/env python
# requires optipng library
 
import os,optparse
 
parser = optparse.OptionParser()
parser.add_option('--file', '-f', default=False, help="The file to optimize. Omit to optimize all pngs in the current directory.")
parser.add_option('--optimization', '-o', default=7, help="The optimatization level to run. Defaults to 7.")
options,args = parser.parse_args()
 
if len(args):
	options.file = args[len(args) - 1]
	
if options.optimization > 7:
	options.optimization = 7
elif options.optimization < 0:
	options.optimization = 0
	
if options.file:
	name,ext = os.path.splitext(options.file)
	if ext == '.png':
		print os.system('optipng -o' + str(options.optimization) + ' ' + options.file)
else:
	for file in os.listdir(os.curdir):
		name,ext = os.path.splitext(file)
		if ext == '.png':
			print os.system('optipng -o' + str(options.optimization) + ' ' + file)
		else:
			print 'Skipping ' + file + ' because it is not a png.'