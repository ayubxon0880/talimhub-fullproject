import { useTranslation } from "react-i18next";
import { API } from "../../layout/api"
import axios from "axios";
import { useEffect, useState } from "react";


const AdsRating = () => {
    const [data, setData] = useState([])
    const ratingData = async () => {
        await axios.get(`${API + '/public/users-rating'}`)
            .then(res => {
                setData(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(()=>{
        ratingData()
    },[])

    const { t } = useTranslation();
    return (
        <div className="container w-full max-w-5xl">
            <h1 data-aos="zoom-in" className="text-2xl lg:text-5xl  text-center mb-8">{t("rating_title")} </h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table data-aos="zoom-in" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {t("rating_t_1")}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t("rating_t_2")}
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                {t("rating_t_3")}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t("rating_t_4")}
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((d) => (
                            <tr key={d.adId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {d.fullName}
                                </th>
                                <td className="px-6 py-4">
                                    {d.allLikes}
                                </td>
                                {/* <td className="px-6 py-4">
                                    {d.personCount}
                                </td>
                                <td className="px-6 py-4">
                                    {d.allViews}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default AdsRating