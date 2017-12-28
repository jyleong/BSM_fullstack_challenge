import random
NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

class Board(object):

    '''docstring for Board'''
    board = None

    def __init__(self):
        super(Board, self).__init__()

    def makeBoard(self):
        self.board = self.make_board(m=3)
        return self.board

    '''
    API sends this
    '''
    def convertBoardtoArr(self):
        boardArr = [item for sublist in self.board for item in sublist]
        # print(boardArr)
        return boardArr

    def make_board(self, m=3):
        """Return a random filled m**2 x m**2 Sudoku board."""
        n = m ** 2
        board = [[None for _ in range(n)] for _ in range(n)]

        def search(c=0):
            "Recursively search for a solution starting at position c."
            i, j = divmod(c, n)
            i0, j0 = i - i % m, j - j % m  # Origin of mxm block
            numbers = list(range(1, n + 1))
            random.shuffle(numbers)
            for x in numbers:
                if (x not in board[i]  # row
                    and all(row[j] != x for row in board)  # column
                    and all(x not in row[j0:j0 + m]  # block
                            for row in board[i0:i])):
                    board[i][j] = x
                    if c + 1 >= n ** 2 or search(c + 1):
                        return board
            else:
                # No number is valid in this cell: backtrack and try again.
                board[i][j] = None
                return None

        return search()


    def printBoard(self):
        spacer = "++---+---+---++---+---+---++---+---+---++"
        print (spacer.replace('-','='))
        for i,line in enumerate(self.board):
            print("|| {} | {} | {} || {} | {} | {} || {} | {} | {} ||"
                  .format(*(cell or ' ' for cell in line)))
            if (i+1) % 3 == 0: print(spacer.replace('-','='))
            else: print(spacer)

if __name__ == "__main__":
    # execute only if run as a script
    boardObj = Board()
    boardObj.makeBoard()
    boardObj.convertBoardtoArr()
    boardObj.printBoard()