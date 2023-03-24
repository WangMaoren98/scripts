import os

def compare(func, filename):
    if not os.path.exists(filename):
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(func())
        return True, 0
    with open(filename, 'r', encoding='utf-8') as f:
        file_content = f.read()
    func_result = func()
    if str(func_result) == file_content:
        return True, 0
    else:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(str(func_result))
        return False, func_result
