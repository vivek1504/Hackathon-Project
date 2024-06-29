import axios from "axios";
import { useEffect, useState } from "react";
import MealList from "./MealList";
import { useRecoilValue } from "recoil";
import { timeFrameAtom } from "../atom";

export const MealComponent = () => {
    const [mealData, setMealData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const timeFrame = useRecoilValue(timeFrameAtom);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.post('http://localhost:3000/api/mealplanner',
        {
            timeFrame
        });
        setMealData(response.data);
      } catch (error) {
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 


  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return <div>
    {mealData && <MealList mealData={mealData}></MealList>}
  </div>

}