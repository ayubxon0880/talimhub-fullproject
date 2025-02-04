import axios from "axios";
import { useEffect, useState } from "react";
import { API, LoadingSpinner } from "../../env";
import Mock1 from "./Mock1";
import Mock2 from "./Mock2";
import Mock3 from "./Mock3";

const FullMock = () => {
  const [speakingOneForm, setSpeakingOneForm] = useState(null);
  const [speakingTwoForm, setSpeakingTwoForm] = useState(null);
  const [speakingThreeForm, setSpeakingThreeForm] = useState(null);

  const [topicOne, setTopicOne] = useState(null);
  const [topicTwo, setTopicTwo] = useState(null);
  const [topicThree, setTopicThree] = useState(null);

  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (speakingThreeForm != null) {
      setStep(4);
      handleFinalSubmission();
    } else if (speakingTwoForm != null) {
      setStep(3);
    } else if (speakingOneForm != null){
      setStep(2);
    }
  },[speakingOneForm,speakingTwoForm,speakingThreeForm])
  const handleRandomTopic = () => {
    setStep(0);
    axios.get(`${API}/topic/random/full-mock`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.data) {
          setTopicOne(res.data.first);
          setTopicTwo(res.data.second);
          setTopicThree(res.data.third);
          setStep(1); // Start at Part One
        }
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setStep(1); // Reset on error
        setTopicOne({id:1,topic:"top",image1:"/public/logo.png",image2:"/public/logo.png"})
      });
  };

  const handleFinalSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("topicOne", speakingOneForm.topic);
      formData.append("topicTwo", speakingTwoForm.topic);
      formData.append("topicThree", speakingThreeForm.topic);
      formData.append("audioOne", speakingOneForm.audio);
      formData.append("audioTwo", speakingTwoForm.audio);
      formData.append("audioThree", speakingThreeForm.audio);
    //   {
    //     topicOne:speakingOneForm.topic,
    //     topicTwo:speakingTwoForm.topic,
    //     topicThree:speakingThreeForm.topic,
    //     audioOne:speakingOneForm.audio,
    //     audioTwo:speakingTwoForm.audio,
    //     audioThree:speakingThreeForm.audio
    // }
      const response = await axios.post(`${API}/speaking/save/full-mock`,formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStep(5);
      alert("Malumotlar saqlandi:", response.data);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {step === -1 && (
        <button onClick={handleRandomTopic} className="mt-2 p-2 bg-blue-500 text-white rounded">
          Boshlash
        </button>
      )}
      {step === 0 && <LoadingSpinner />}
      {step === 1 && topicOne && <Mock1 setSpeakingForm={setSpeakingOneForm} topic={topicOne} />}
      {step === 2 && <Mock2 setSpeakingForm={setSpeakingTwoForm} topic={topicTwo} />}
      {step === 3 && <Mock3 setSpeakingForm={setSpeakingThreeForm} topic={topicThree} />}
      {step === 4 && <><LoadingSpinner /><p>Sabrning tagi sariq oltin, Speakingni saqlash ozgina vaqt olishi mumkin sabr qilishingizni so'raymiz.</p></>}
      {step === 5 && <><p>Speaking mufavvaqiyatli saqlandi</p><p><a href="/my-mocks" style={{color:"blue"}} className="text-2xl font-bold mb-4 border-x-2 border-y-2">Mockni ko'rish</a></p></>}
      {step > 5 && <div>Xatolik, sahifani yangilang</div>}
    </div>
  );
};

export default FullMock;
