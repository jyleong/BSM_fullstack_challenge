import os
import datetime
import time

import app_file
from server.app_file import db
from server.sudoku.board import Board
from server import models
from flask import jsonify, request
app = app_file.create_app(app_file.config_name)
boardService = Board()


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
    boardService.makeBoard()
    boardArray = boardService.convertBoardtoArr()
    response = jsonify(boardArray)
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# @app.route('/users', methods=['POST'])
# def add_user():
#     post_data = request.get_json()
#     if not post_data:
#         response_object = {
#             'status': 'fail',
#             'message': 'Invalid payload.'
#         }
#         return jsonify(response_object), 400
#     username = post_data.get('username')
#     email = post_data.get('email')
#
#     try:
#         user = User.query.filter_by(email=email).first()
#         if not user:
#             db.session.add(User(
#                 username=username,
#                 email=email))
#             db.session.commit()
#             response_object = {
#                 'status': 'success',
#                 'message': f'{email} was added!'
#             }
#             return jsonify(response_object), 201
#         else:
#             response_object = {
#                 'status': 'fail',
#                 'message': 'Sorry. That email already exists.'
#             }
#             return jsonify(response_object), 400
#     except exc.IntegrityError as e:
#         db.session.rollback()
#         response_object = {
#             'status': 'fail',
#             'message': 'Invalid payload.'
#         }
#         return jsonify(response_object), 400
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