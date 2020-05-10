from stack import Stack

def parChecker(string):
    s = Stack()
    b = True
    i = 0
    while i < len(string) and b:
        sy = string[i]
        if sy == "(":
            s.push(sy)
        else:
            if s.is_empty():
                b = False
            else:
                s.pop()
        i = i + 1
    if b and s.is_empty():
        return True
    else: 
        return False

print(parChecker('()'))