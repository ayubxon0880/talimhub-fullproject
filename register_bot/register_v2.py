import telebot
import requests
import logging
from telebot.types import ReplyKeyboardMarkup, KeyboardButton

API_TOKEN = 'YOUR_API_TOKEN_HERE'
bot = telebot.TeleBot(API_TOKEN)

logging.basicConfig(level=logging.INFO)

user_data = {}

@bot.message_handler(commands=['start'])
def start(message):
    chat_id = message.chat.id
    user_data[chat_id] = {}
    user_data[chat_id]["telegram_full_name"] = message.chat.first_name + " " + (message.chat.last_name or "")
    user_data[chat_id]['id'] = chat_id
    user_data[chat_id]['username'] = message.chat.username or "N/A"
    bot.send_message(chat_id, "To'liq ismingizni kiriting:")


@bot.message_handler(func=lambda message: message.chat.id in user_data and 'firstname' not in user_data[message.chat.id])
def get_full_name(message):
    chat_id = message.chat.id
    if len(message.text.split(" ")) < 2:
        bot.send_message(chat_id, "Ism va familiya orasida joy tashlang (Falonchi Fistonchiyev) shu ko'rinishda !!!")
    else:
        user_data[chat_id]['firstname'] = message.text.split(" ")[0]
        user_data[chat_id]['lastname'] = message.text.split(" ")[1]
        markup = ReplyKeyboardMarkup(row_width=1, resize_keyboard=True)
        phone_button = KeyboardButton(text="Telefon raqamni yuborish", request_contact=True)
        markup.add(phone_button)
        bot.send_message(chat_id, "Telefon raqamni yuborish uchun pastdagi tugmani bosing:", reply_markup=markup)

@bot.message_handler(content_types=['contact'])
def get_phone_number(message):
    chat_id = message.chat.id
    if message.contact is not None:
        user_data[chat_id]['phone_number'] = message.contact.phone_number

        bot.send_message(chat_id, "Ma'lumotlaringiz qabul qilindi. Iltimos, kuting...")

        data_to_send = {
            "firstname": user_data[chat_id]['firstname'],
            "lastname": user_data[chat_id]['lastname'],
            "telegramId": user_data[chat_id]['id'],
            "telegramFullName": user_data[chat_id]['telegram_full_name'],
            "telegramUsername": user_data[chat_id]['username'],
            "phone": str(user_data[chat_id]['phone_number']).replace("+", "")
        }

        try:
            response = requests.post('http://localhost:8081/api/v1/auth/register-via-telegram', json=data_to_send)
            if response.status_code in [200, 201]:
                bot.send_message(chat_id, f"Saytga kirish uchun {response.json().get('message', 'Biroz kuting...')}. \nTelefon raqamingiz va parol orqali saytga kirishingiz mumkin.\nhttps://talimhub.uz/login")
            elif response.status_code == 409:
                bot.send_message(chat_id, "Siz oldin ro'yxatdan o'tgansiz.")
            else:
                bot.send_message(chat_id, "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
        except requests.exceptions.RequestException as e:
            logging.error(f"Request failed: {e}")
            bot.send_message(chat_id, "Xatolik yuz berdi. Qaytadan urinib ko'ring.")
        except Exception as e:
            logging.error(f"Unexpected error: {e}")
            bot.send_message(chat_id, "Xatolik yuz berdi. Qaytadan urinib ko'ring.")

        del user_data[chat_id]
    else:
        bot.send_message(chat_id, "Xatolik yuz berdi. Qaytadan urinib ko'ring.")

if __name__ == '__main__':
    while True:
        try:
            bot.polling(none_stop=True)
        except Exception as e:
            logging.error(f"Polling error: {e}")
            import time
            time.sleep(5)
