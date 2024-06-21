import "./homepage.scss"

import PopularNovels from "../components/home/PopularNovels";
import LatestImprovements from "../components/home/LatestImprovements";
import TopContributors from "../components/home/TopContributors";
import Recommendations from "../components/home/Recommendations";

function HomePage () {

  return ( 
    <div className="home page-wrapper">
      <div className="banner"> Banner</div>
      <PopularNovels />
      <LatestImprovements />
      <Recommendations />
      <TopContributors />
    </div>
   );
}

export default HomePage;