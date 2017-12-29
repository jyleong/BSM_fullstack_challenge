import os


import app_file
from server.sudoku.board import Board, SolveBoard, printBoard
from flask import jsonify, request
app = app_file.create_app(app_file.config_name)
boardService = Board()
solverService = SolveBoard()


@app.route("/")
def index():
    return "Hello world!"


'''
Request:
GET /sudoku/board
Response:
Content Type: application/json
Body:
[1,2,3,....,9] //Array of 81 integers
'''
@app.route('/sudoku/board', methods=['GET'])
def get_random_solved_board():
    board = boardService.makeBoard()
    boardArray = boardService.convertBoardtoArr(board)
    response = jsonify(boardArray)
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/sudoku/board', methods=['POST'])
def make_custom_solved_board():
    post_data = request.get_json()
    if not post_data:
        response_object = {
            'status': 'fail',
            'message': 'Invalid payload.'
        }
        return jsonify(response_object), 400
    row = post_data.get('row')
    col = post_data.get('col')
    value = post_data.get('value')
    boardOneVal = boardService.makeBoardWithParam(row=row, col=col, value=value)
    board = solverService.solveSudoku(boardOneVal)
    printBoard(board)
    boardArray = boardService.convertBoardtoArr(board)
    response = jsonify(boardArray)
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
#
# @app.route('/users/<int:userId>', methods=['GET'])
# def get_user(userId):
#     user = models.User.query.get(userId)
#     response = jsonify({"id": user.id, "username": user.username, "email": user.email})
#     response.status_code = 200
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

if __name__ == '__main__':
    if 'PRODUCTION' in os.environ:
        app.run(host="0.0.0.0", port=int(os.environ['PORT']))
    else:
        app.run()