from turtle import end_fill
import mysql.connector as sql
# print(sql)
mydb = sql.connect(
    host = 'localhost',
    user = 'root',
    password = '123456',
    database = 'iot'
)
# print(mydb)
# cursor = mydb.cursor(prepared = True)
# cursor.execute("INSERT INTO `light` VALUES ('2022-01-21 09:46:24', 124.3)")
# """INSERT INTO `bike` VALUES (1,'xe đạp mini thống nhất',NULL,1,2,2,'xe1.jpg');"""
# print(cursor)
# result = cursor.fetchone()
# while result is not None:
#     print(result)
#     result = cursor.fetchone()

cursor = mydb.cursor(prepared = True)
cursor.execute("SELECT * FROM `light` ORDER BY `time` DESC LIMIT 10")
all_result = cursor.fetchall()
print(type(all_result))
# print(all_result)
my_dict = dict()
for record in all_result:
    # print(record[0], type(record[0]))
    # my_dict[str(record[0])] = {
    #     '["1. open"]': record[1],
    #     '["2. high"]': record[1],
    #     '["3. low"]': record[1],
    #     '["4. close"]': record[1]
    # }
    print(record[0], record[1])
# print(my_dict)
# import json
# with open('./test.json', 'w', encoding='utf-8') as f:
#     json.dump(my_dict, f)
# mycursor = mydb.cursor()

# sql = "INSERT INTO `light` (`time`, `intensity`) VALUES (%s, %s)"
# val = ("2022-01-21 09:46:24", 124.3)
# mycursor.execute(sql, val)
# mydb.commit()