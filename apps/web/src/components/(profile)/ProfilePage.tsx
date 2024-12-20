import AddressComp from "./AddressComp"
import AvaComp from "./AvaComp"


const ProfilePage = () => {
  
  return (
    <div className="bg-lightCustom w-full min-h-screen flex flex-col justify-start items-center">
      <AvaComp/>
      <AddressComp/>
    </div>
  )
}

export default ProfilePage