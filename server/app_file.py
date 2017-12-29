import os
import sys

from flask import Flask
from flask_bootstrap import Bootstrap
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


current_path = os.getcwd()
sys.path.insert(0, current_path + '/../')
from server.config import app_config

# db init

db = SQLAlchemy()
config_name = 'development'
config = app_config[config_name]

def create_app(config_name):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(app_config[config_name])
    app.secret_key = "s3cr3t"  # need for flask for some reason
    
    Bootstrap(app)
    db.init_app(app)

    migrate = Migrate(app,db)

    # database models

    # this is how you register your database model as part of the crud to an application endpoint
    #####################
    #### blueprints #####
    #####################
    return app