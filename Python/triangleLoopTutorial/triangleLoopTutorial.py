#    Triangle Loop Tutorial

#    Frist we need to print just one star

print('Printing one star') # title

print('*') # printing star

print('\n') # putting new line between each explanation

#    Now we will print six times using for loop

print('Printing star six times') #title

for i in range(0, 6): # printing star
    print('*')

print('\n') # putting new line between each explanation


#   But the loop up there is just printing six stars in rows.
#   We don't want that, what we need is to print six stars just in one line.
#   So we will use another parmeter called end.
#   That end parameter decides how the print function ends.
#   By default print function ends with a new line.
#   That is why the loop up there is printing six rows.
#   So after we put end parameter and use it like this: end=''
#   end equal empty string.
#   empty string means nothing.
#   so the print function ends with nothing, not enev newline.

print('Printing stars just in one row') # title

for i in range(0, 6): # printing star
    print('*', end='')

print('\n') # putting new line between each explanation


#    Now we have a row with six colums.
#    But we also need six rows. 
#    So we will put the whole loop up there into another loop.
#    So it will get 'up there loop' six times.
#    That's how we get 6 by 6 square.

print('Printing 6 by 6 square') # title

for i in range(0, 6): # printing star
    for j in range(0, 6):
        print('*', end='')
    print('\n')

print('\n') # putting new line between each explanation


#    Now we need to make a triangle.
#    To do that, you need to find formula.
#    The formula:
#
#       r = row
#       c = column
#
#       r1 *
#       r2 *  *
#       r3 *  *  *
#       r4 *  *  *  *
#       r5 *  *  *  *  *
#       r6 *  *  *  *  *  *
#          c1 c2 c3 c4 c5 c6
#
#      index of row is equal to the star count
#      ne column in line 1
#      two column in line 2
#      etc...
#
#      So we will just simply need to make index of the row loop as the count of column star.

print('Printing the triangle') # title

for i in range(0, 6): # printing star
    for j in range(0, i):
        print('*', end='')
    print('\n')

print('\n') # putting new line between each explanation