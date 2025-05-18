import dis
import marshal
import sys
import os

def disassemble_pyc(pyc_path):
    with open(pyc_path, "rb") as f:
        f.read(16)  # skip header (magic number + timestamp/hash)
        code_obj = marshal.load(f)        
        print(dis.code_info(code_obj))
        print("Raw bytecode:", code_obj.co_code)

if __name__ == "__main__":
    # Dynamically compute the path relative to this script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    pyc_path = os.path.join(current_dir, "__pycache__", "main.cpython-313.pyc")
    disassemble_pyc(pyc_path)
