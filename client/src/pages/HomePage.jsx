import "./homepage.scss"

import PopularNovels from "../components/home/PopularNovels";
import LatestImprovements from "../components/home/LatestImprovements";
import TopContributors from "../components/home/TopContributors";
import Recommendations from "../components/home/Recommendations";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage () {
  const [latestImprovements, setLatestImprovements] = useState({})
  const [loading, setLoading] = useState(true);
  const [popularNovels, setPopularNovels] = useState([])

  useEffect(() => {
    const getHomePageData = async () => {
      try {
        const popularNovelsRes = await axios.get("/series")
        const latestImprovementsRes = await axios.get('/chapters/recent')

        setPopularNovels(popularNovelsRes.data)
        setLatestImprovements(latestImprovementsRes.data)
      } catch (err) {
        console.error("Error fetching homepage date:", err.message);
      } finally {
        setLoading(false); 
      }
    }

    getHomePageData();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return ( 
    <div className="home page-wrapper">
      <div className="banner"> Banner</div>
      <PopularNovels popularNovels = {popularNovels}/>
      <LatestImprovements latestImprovements = {latestImprovements}/>
      <Recommendations />
      <TopContributors />
    </div>
   );
}

export default HomePage;