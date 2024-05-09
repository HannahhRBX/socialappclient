
import NavButton from "../components/NavButton";
import { useLocation } from "react-router-dom";
import PreviousRouteContext from "../PreviousRouteContext";
import { useContext } from "react";

{/*Error Page*/}
const ErrorPage = () => {
  
  // Displays error message and type from URL parameters
  const location = useLocation();
  const errorParams = new URLSearchParams(location.search);
  const errorType = errorParams.get('type');
  const message = errorParams.get('message');
  const previousRoute = useContext(PreviousRouteContext);

  return (
    <div className="bg-[#c9d0ff] min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url("https://img.freepik.com/premium-vector/abstract-smooth-blur-purple-blue-color-gradient-background-website-banner-graphic-design_120819-893.jpg")'}}>
      <div className="bg-[#ffffff] p-8 rounded shadow-2xl w-96">
        <h2 className="text-4xl font-bold mb-6 text-center" >Error {errorType}</h2>
        <h3 className="text-2xl font-semi-bold mb-6 text-center" >{message}</h3>
        {/*Uses previous location to navigate back*/}
        <NavButton buttonText="Back" URL={previousRoute} style={{fontWeight: '400',  border: '1px solid #D6D6D6', borderRadius: '10px',width:'90px', height:'30px', color: '#3D3D3D',  textShadow: '0px 0 white, 0 0px white, 0px 0 white, 0 0px white' }} backgroundColor={'#FBFBFB'} hoverColor={'#F5F5F5'} />
      </div>
    </div>
  );
};

export default ErrorPage;
