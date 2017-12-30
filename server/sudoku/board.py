import random

class SolveBoard(object):
    # @param board, a 9x9 2D array
    # Solve the Sudoku by modifying the input board in-place.
    # Do not return any value.
    '''
    Pass in a filled in board, tries to solve it

    '''
    def solveSudoku(self, board):
        self.board = board
        self.solve()
        return self.board

    def findUnassigned(self):
        for row in range(9):
            for col in range(9):
                if self.board[row][col] == 0:
                    return row, col
        return -1, -1

    def solve(self):
        row, col = self.findUnassigned()
        # no unassigned position is found, puzzle solved
        if row == -1 and col == -1:
            return True
        for num in [1,2,3,4,5,6,7,8,9]:
            if self.isSafe(row, col, num):
                self.board[row][col] = num
                if self.solve():
                    return True
                self.board[row][col] = 0
        return False

    def isSafe(self, row, col, ch):
        boxrow = row - row % 3
        boxcol = col - col % 3
        if self.checkrow(row, ch) and self.checkcol(col, ch) and self.checksquare(boxrow, boxcol, ch):
            return True
        return False

    def checkrow(self, row, ch):
        for col in range(9):
            if self.board[row][col] == ch:
                return False
        return True

    def checkcol(self, col, ch):
        for row in range(9):
            if self.board[row][col] == ch:
                return False
        return True

    def checksquare(self, row, col, ch):
        for r in range(row, row + 3):
            for c in range(col, col + 3):
                if self.board[r][c] == ch:
                    return False
        return True

class Board(object):

    '''docstring for Board'''
    board = None

    def __init__(self):
        super(Board, self).__init__()

    def makeBoard(self):
        self.board = self.make_random_board(m=3)
        return self.board

    def emptyBoardWithParam(self, m=3, row=1, col=1, value=1):
        self.board = self.empty_board_with_param(m, row, col, value)
        return self.board

    '''
    API sends this
    '''
    def convertBoardtoArr(self, board):
        boardArr = [item for sublist in board for item in sublist]
        # print(boardArr)
        return boardArr
    '''
    Algorithm taken from:
    https://codereview.stackexchange.com/questions/88849/sudoku-puzzle-generator
    '''
    def make_random_board(self, m=3):
        """Return a random filled m**2 x m**2 Sudoku board."""
        n = m**2
        board = [[0 for _ in range(n)] for _ in range(n)]

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
                board[i][j] = 0
                return None

        return search()


    def empty_board_with_param(self, m=3, row=1, col=1, value=1):
        """Return a solved filled m**2 x m**2 Sudoku board.
            with board[row][col] = value
        """
        n = m ** 2

        board = [[0 for _ in range(n)] for _ in range(n)]
        board[row][col] = value
        return board

def printBoard(board):
    spacer = "++---+---+---++---+---+---++---+---+---++"
    print (spacer.replace('-','='))
    for i,line in enumerate(board):
        print("|| {} | {} | {} || {} | {} | {} || {} | {} | {} ||"
              .format(*(cell or ' ' for cell in line)))
        if (i+1) % 3 == 0: print(spacer.replace('-','='))
        else: print(spacer)

if __name__ == "__main__":
    # execute only if run as a script
    boardObj = Board()
    solver = SolveBoard()
    boardOneVal = boardObj.emptyBoardWithParam(row=3, col=3, value=9)
    board = solver.solveSudoku(boardOneVal)
    # boardObj.makeBoard()
    solvedboard = boardObj.convertBoardtoArr(board)
    printBoard(board)