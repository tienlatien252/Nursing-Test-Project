#!python3
import psycopg2
import csv
import os

file = r"congtung_2.csv"
#connect to db
conn = psycopg2.connect(
    database="",
    user="",
    host="",
    password="",
)

cur = conn.cursor()
with open (file,'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        query = cur.mogrify("INSERT INTO questions (test_id, description, topic, picture_link, correct_answer, answers) VALUES (%s, %s, %s, %s, %s, %s)", (row[0], row[2], row[3], row[4], row[5], row[6]))
        cur.execute(query)

conn.commit()