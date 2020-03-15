function createChessBoard(row, column) {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if ( i % 2 == 0) {
                if (j % 2 == 0 ) {
                    document.write('O');
                } else {
                    document.write('X');
                }
            } else if (i% 2 != 0) {
                if (j % 2 != 0 ) {
                    document.write('O');
                } else {
                    document.write('X');
                }
            }
        }
        document.write('<br>');
    }
}

createChessBoard(20, 20);