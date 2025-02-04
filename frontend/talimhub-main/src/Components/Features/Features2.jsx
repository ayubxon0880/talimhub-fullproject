import { useEffect, useState } from 'react';
import './Features.css'
import axios from 'axios';
import { API } from '../../layout/api';
const Features2 = () => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    axios.get(API+"/public/last-month-user-rating")
    .then((response) => {
      setRating(response.data);
    }).catch((error) => {
      console.log("error");
    })
  },[])


  
  return (
    <>
      <div className="container py-14 sm:min-h-[600px]">
        <div>
          <h1
            data-aos="fade-up"
            className="text-3xl font-bold dark:text-white text-center sm:text-4xl text-slate-600 mb-12"
          >
            Last month's winner
            {/* {t(heading)} */}
          </h1>

          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              <div >
              </div>
              <div data-aos="fade-up" data-aos-delay="500" className="text-center group space-y-3 sm:space-y-6 p-4 sm:py-10 bg-gray-800 hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black rounded-lg duration-300">
                <div className="grid place-items-center">
                <svg height="150px" width="150px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 474.752 474.752" xmlSpace="preserve">
                    <g>
                      <polyline
                        style={{ fill: '#E04F5F' }}
                        points="107.04,215.528 0,360.52 101.2,340.44 110.16,438.6 208.256,304.472"
                      />
                      <polyline
                        style={{ fill: '#E04F5F' }}
                        points="367.712,215.528 474.752,360.52 373.552,340.44 364.592,438.6 266.496,304.472"
                      />
                    </g>
                    <ellipse style={{ fill: '#F2B851' }} cx="235.344" cy="177.512" rx="142.336" ry="141.36" />
                    <ellipse style={{ fill: '#D89D3D' }} cx="235.344" cy="177.512" rx="91.312" ry="90.688" />
                    <g>
                      <path
                        style={{ fill: '#FFFFFF' }}
                        d="M218.208,225.656h-18.304v-68.944c-6.672,6.256-14.56,10.88-23.632,13.856v-16.592
                        c4.768-1.568,9.952-4.528,15.568-8.896c5.6-4.352,9.44-9.456,11.52-15.264h14.848V225.656z"
                      />
                      <path
                        style={{ fill: '#FFFFFF' }}
                        d="M234.896,165.88l7.008-0.672c0.416,2.352,1.28,4.08,2.576,5.184c1.28,1.104,3.024,1.664,5.216,1.664
                        c2.336,0,4.08-0.496,5.248-1.472s1.76-2.128,1.76-3.44c0-0.848-0.256-1.568-0.752-2.16c-0.48-0.592-1.36-1.104-2.592-1.552
                        c-0.848-0.288-2.768-0.816-5.76-1.552c-3.856-0.96-6.576-2.144-8.144-3.536c-2.192-1.968-3.28-4.352-3.28-7.184
                        c0-1.824,0.512-3.52,1.552-5.104s2.512-2.784,4.448-3.616s4.288-1.248,7.024-1.248c4.48,0,7.856,0.992,10.112,2.944
                        c2.272,1.968,3.472,4.592,3.584,7.872l-7.216,0.32c-0.304-1.84-0.976-3.152-1.984-3.968s-2.528-1.2-4.56-1.2
                        c-2.096,0-3.728,0.432-4.928,1.296c-0.768,0.56-1.136,1.296-1.136,2.224c0,0.848,0.352,1.568,1.072,2.16
                        c0.912,0.768,3.104,1.568,6.624,2.384c3.504,0.832,6.096,1.68,7.776,2.56c1.664,0.896,2.992,2.096,3.936,3.632
                        s1.424,3.424,1.424,5.68c0,2.048-0.56,3.968-1.696,5.744c-1.136,1.776-2.736,3.104-4.816,3.984s-4.672,1.312-7.776,1.312
                        c-4.512,0-7.968-1.04-10.384-3.136C236.816,172.92,235.36,169.88,234.896,165.88z"
                      />
                      <path
                        style={{ fill: '#FFFFFF' }}
                        d="M278.032,177.496v-29.664H267.44V141.8h28.352v6.032h-10.56v29.664H278.032z"
                      />
                    </g>
                </svg>
                </div>
                <h1 className="text-2xl">{rating ? rating.user.fullName : "None"}</h1>
                <p>Likes : {rating ? rating.likeCount : "None"}</p>
              </div>
              <div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features2;
