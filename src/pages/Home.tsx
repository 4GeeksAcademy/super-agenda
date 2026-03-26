import { BannerSection } from '../components/Home/BannerSection'
import { BenefitsSection } from '../components/Home/BenefitsSection'



function Home() {

  return (
    <div className="flex flex-col">
      <BannerSection/>
      <BenefitsSection/>
    </div>
  )
}

export default Home
