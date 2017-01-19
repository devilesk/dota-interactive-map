import sys
import os
import jinja2
import yaml

def render(tpl_path, context):
    path, filename = os.path.split(tpl_path)
    
    with open(tpl_path, 'r') as f:
        data = '{% extends "template.j2" %}' + f.read()
    return jinja2.Environment(
        loader=jinja2.FileSystemLoader(path or './')
    ).from_string(data).render(context)
    
with open(os.path.join(sys.path[0], "../src/template/template_data.yaml"), 'r') as f:
    data = yaml.load_all(f.read())
context = next(data)

result = render(os.path.join(sys.path[0], "../src/template/.index.html"), context)

with open(os.path.join(sys.path[0], "../src/index.html"), 'w') as f:
    f.write(result)