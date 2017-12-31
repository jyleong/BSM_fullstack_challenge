FROM python:3.6-alpine 
COPY . /server
WORKDIR /server
EXPOSE 5000
RUN pip3 install -r requirements.txt

ENV serverDir=$(pwd)
ENV python_path=$serverDir:$serverDir/server
ENV PYTHONPATH=$python_path

RUN python test/boardTest.py
CMD ["python", "run.py", "&"]