import { UserAuth } from "../context/AuthContext"
import Wrap from "../components/Wrap"
import Edi from "../assets/img/SRI-Edi.png"

const Home = () => {
  //const{user} = UserAuth();

  //console.log(user)
  return (
    <Wrap>
      <div className='w-1/2 h-3/5 flex items-center ml-20 mt-20'>
        <img src={Edi} className='w-3/5'/>
      </div>
    </Wrap>
  )
}

export default Home