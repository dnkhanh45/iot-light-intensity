import mysql.connector as sql
import random
import time
mydb = sql.connect(
    host = 'localhost',
    user = 'root',
    password = '251120',
    database = 'iot'
)

import datetime

x = datetime.datetime(2022, 3, 1, 0, 25, 15)

z = datetime.datetime(2022, 3, 4, 0, 0, 0)
while x < z:
    y = x.timestamp() + 5
    x = datetime.datetime.fromtimestamp(y)
    key = x.strftime("%Y-%m-%d %H:%M:%S")
    mycursor = mydb.cursor()
    sql = "INSERT INTO `light` (`time`, `intensity`) VALUES (%s, %s)"
    val = (key, random.random() * 100 + 200)
    mycursor.execute(sql, val)
    mydb.commit()