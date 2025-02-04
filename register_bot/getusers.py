import telebot
import psycopg2

API_TOKEN = ""
bot = telebot.TeleBot(API_TOKEN)

def get_users():
    try:
        connection = psycopg2.connect(
            host='test',
            database='test',
            user='test',
            password='test'
        )
        cursor = connection.cursor()
        cursor.execute("SELECT id, firstname, lastname, phone, created_at FROM users ORDER BY created_at DESC LIMIT 10;")
        users = cursor.fetchall()
        cursor.close()
        connection.close()
        return users
    except Exception as e:
        print(f"Error: {e}")
        return []

@bot.message_handler(commands=['users'])
def send_users(message):
    users = get_users()
    if users:
        response = "Oxirgi 10 foydalanuvchi:\n"
        for user in users:
            response = f"ID: {user[0]}\nIsm: {user[1]} {user[2]}\nTelefon: {user[3]}\nYaratilgan sana: {user[4]}\n\n\n"
            bot.send_message(message.chat.id, response)
    else:
        response = "Foydalanuvchilar topilmadi."
bot.polling()
