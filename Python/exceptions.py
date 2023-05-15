import sys


try:
    x = int(input("x: "))
    y = int(input("y: "))
except ValueError:
    print("Please type in an integer")
    sys.exit(1)

try:
    result = x / y
except ZeroDivisionError:
    print("Can't divide by 0.")
    sys.exit(1)
    
print(f"{x} divided by {y} is {result}")