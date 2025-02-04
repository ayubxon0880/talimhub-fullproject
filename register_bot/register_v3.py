import telebot
import requests
import logging
import os
import time
from telebot.types import ReplyKeyboardMarkup, KeyboardButton

HEADER_KEY = 'CBEE7DAA1413D16287574521F64D5'

API_TOKEN = ''
bot = telebot.TeleBot(API_TOKEN)

logging.basicConfig(level=logging.INFO)

user_data = {}

@bot.message_handler(commands=['start'])
def start(message):
    chat_id = message.chat.id
    user_data[chat_id] = {}
    bot.send_message(chat_id, "Ro'yxatdan o'tish uchun : /register\nParolni yangilash uchun : /resetpassword")

@bot.message_handler(commands=['register'])
def start(message):
    chat_id = message.chat.id
    user_data[chat_id] = {}
    user_data[chat_id]["telegram_full_name"] = message.chat.first_name + " " + (message.chat.last_name or "")
    user_data[chat_id]['id'] = chat_id
    user_data[chat_id]['username'] = message.chat.username or "N/A"
    bot.send_message(chat_id, "Iltimos, to'liq ismingizni kiriting (Masalan: Falonchi Fistonchiyev):")

@bot.message_handler(func=lambda message: message.chat.id in user_data and 'username' in user_data[message.chat.id])
def get_full_name(message):
    chat_id = message.chat.id
    name_parts = message.text.split(" ")
    if len(name_parts) < 2:
        bot.send_message(chat_id, "Ism va familiya orasida joy tashlang. Masalan: Falonchi Fistonchiyev.")
    else:
        user_data[chat_id]['firstname'] = name_parts[0]
        user_data[chat_id]['lastname'] = name_parts[1]
        markup = ReplyKeyboardMarkup(row_width=1, resize_keyboard=True)
        phone_button = KeyboardButton(text="Telefon raqamni yuborish", request_contact=True)
        markup.add(phone_button)
        bot.send_message(chat_id, "Iltimos, telefon raqamingizni yuborish uchun pastdagi tugmani bosing:", reply_markup=markup)

@bot.message_handler(content_types=['contact'])
def get_phone_number(message):
    chat_id = message.chat.id
    if message.contact:
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
            response = requests.post('http://localhost:8081/api/v1/auth/register-via-telegram', json=data_to_send,headers={"telegram-key":HEADER_KEY})
            if response.status_code in [200, 201]:
                bot.send_message(chat_id, f"Saytga kirish uchun: {response.json().get('message', 'Biroz kuting...')}.\nTelefon raqamingiz va parol orqali saytga kirishingiz mumkin.\nhttps://talimhub.uz/login")
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

@bot.message_handler(commands=['resetpassword'])
def reset_password(message):
    chat_id = message.chat.id
    user_data[chat_id] = {}
    bot.send_message(chat_id, "Yangi parolni kiriting:")
    bot.register_next_step_handler(message, process_new_password)

def process_new_password(message):
    chat_id = message.chat.id
    new_password = message.text
    markup = ReplyKeyboardMarkup(row_width=1, resize_keyboard=True)
    confirm_button = KeyboardButton(text="Parolni tasdiqlash")
    markup.add(confirm_button)
    
    user_data[chat_id]['new_password'] = new_password
    bot.send_message(chat_id, f"Sizning yangi parolingiz: {new_password}\nTasdiqlash uchun pastdagi tugmani bosing:", reply_markup=markup)

@bot.message_handler(func=lambda message: message.text == "Parolni tasdiqlash" and message.chat.id in user_data)
def confirm_password(message):
    chat_id = message.chat.id
    new_password = user_data[chat_id].get('new_password')

    if new_password:
        try:
            print(chat_id)
            response = requests.post(f'http://localhost:8081/api/v1/auth/reset-password-via-telegram/{chat_id}',
                headers={"telegram-key":HEADER_KEY}
            )
            print(response)
            if response.status_code == 200 or response.status_code == 201:
                bot.send_message(chat_id, "Parol muvaffaqiyatli o'zgartirildi!")
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
            time.sleep(5)
