import axios from "axios";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useState } from "react";
import { API } from "../../layout/api";
import { useTranslation } from 'react-i18next'
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
const Contact = () => {
  const { t } = useTranslation()
  const [nameForm, setNameForm] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [messageForm, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/request-demo/send`, { name: nameForm, email: emailAddress, message: messageForm, phone: phone })
      .then((response) =>
        toast.success(response.data.message, { position: "top-center" })
      )
      .catch((err) =>
        toast.error('Please try again later!', { position: "top-center" })
      );
  };
  const { heading, name, email, number, message, button } = t('contact')

  return (
    <div className="container mt-28 ">
      <ToastContainer />
      <div className=" mx-auto max-w-sm">
        <form onSubmit={handleSubmit} autoComplete="off" data-aos="zoom-out-down" className="dark:bg-slate-800 bg-slate-100 rounded px-8   pb-8 shadow-2xl">
          <h1 className="py-10 font-bold text-xl dark:text-white text-slate-700 text-center"> {t(heading)}</h1>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="firstName">
              {t(name)}
            </label>
            <input className="dark:bg-slate-800 bg-inherit  dark:text-white shadow-md appearance-none rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline border-none" id="firstName" type="text" placeholder={t(name)} required
              onChange={(e) =>
                setNameForm(e.target.value)
              } />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="companyName">
              {t(email)}
            </label>
            <input className="dark:bg-slate-800 bg-inherit dark:text-white shadow-md border-none appearance-none  rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="email" placeholder={t(email)} required
              onChange={(e) => {
                setEmailAddress(e.target.value)
              }} />
          </div>
          <label className="block text-sm font-bold mb-2" htmlFor="phone">
            {t(number)}
          </label>
          <PhoneInput
            inputStyle={{ width: '100%', border: 'none', fontSize: "1rem" }}
            className="telraqam shadow-md appearance-none text-9xl rounded py-2 mb-2 text-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-800"
            required
            name="phone"
            id="phone"
            defaultCountry="uz"
            onChange={
              (e) => {
                const tel = {
                  target: {
                    name: "phone",
                    id: "phone",
                    value: e
                  }
                }
                setPhone(tel.target.value)
              }
            }
          />
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="textarea">
              {t(message)}
            </label>
            <textarea className="dark:bg-slate-800 bg-inherit dark:text-white shadow-md appearance-none rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="textarea" type="text" placeholder={t(message)} required
              onChange={(e) =>
                setMessage(e.target.value)
              } />
          </div>
          <div className="flex items-center justify-between">
            <button className="primary-btn bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {t(button)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;