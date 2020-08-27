import psycopg2
import csv
import os

file = r"/Users/conghoangtungnguyen/Desktop/congtung.csv"
#connect to db
conn = psycopg2.connect(
    database=
    user=
    host=
    password=
)
cur = conn.cursor()
with open (file,'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
           cur.execute(
               "INSERT INTO questions (question_id, description, topic, picture_link, correct_answer) VALUES {}".format("(10,'which of the following','abc','abc','which has')"),
            row
           )
conn.commit()