import unittest
import itertools

from server.sudoku.board import Board

'''
sudoku board test methods
methods found online at:
https://stackoverflow.com/questions/17605898/sudoku-checker-in-python
'''
def sudoku_ok(line):
    return (len(line) == 9 and sum(line) == sum(set(line)))

def check_sudoku(grid):
    bad_rows = [row for row in grid if not sudoku_ok(row)]
    grid = list(zip(*grid))
    bad_cols = [col for col in grid if not sudoku_ok(col)]
    squares = []
    for i in range(9, step=3):
        for j in range(9, step=3):
          square = list(itertools.chain(row[j:j+3] for row in grid[i:i+3]))
          squares.append(square)
    bad_squares = [square for square in squares if not sudoku_ok(square)]
    return not (bad_rows or bad_cols or bad_squares)

class TestBoardMethods(unittest.TestCase):
    def setUp(self):
        self.BoardService = Board()

    '''
    Test for the structure of the board, if 81 elem, 9x9 board
    '''
    def test_board_structure(self):

        boardObj = self.BoardService.makeBoard()
        boardArr = self.BoardService.convertBoardtoArr()
        self.assertEqual(len(boardObj), 9)
        self.assertEqual(len(boardObj[0]), 9)
        self.assertEqual(len(boardArr), 81)

    def test_board_correctness(self):
        boardObj = self.BoardService.makeBoard()
        self.assertTrue(boardObj)

if __name__ == '__main__':
    unittest.main()

