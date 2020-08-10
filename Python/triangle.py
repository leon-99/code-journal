def loop_triangle(n):
    for i in range(1, n):
        for j in range(i):
            print("*", end=" ")
        print('\n')

loop_triangle(int(input('How many stars you wanna print?: ')))
loop_triangle(int(input('How many stars you wanna print?: ')))