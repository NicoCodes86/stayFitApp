import React, { useState } from 'react';
// import { ModalHover } from 'react-modal-hover' //install react-modal-hover

const Hover = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="hover">
      <button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        Exercises
      </button>
      {isShown && (
        <div>
         {exercises}
        </div>
        
      )}
    </div>
  );
}

export default Hover;

// const About = () =>{
//     return(
//         <>
//         <ResponsiveAppBar/>
//         <div  style={{textAlign: 'center', fontSize: "20px"}}>
//         <h1>About Us</h1>
//         <br/>
//         <p style={{marginLeft: "20%", marginRight: "20%"}}>
//             Us here at StayFit believe that everyone should live a fit and happy life. Our goal is to help make that fit lifestyle easy and accessible for everyone, whether youre looking to maintain a healthy weight or to become the best version of you possible. If you find yourself not knowing where to start or looking for guidance, one of our licensed trainers would be happy to get you started on your path to success. Always remember, stay motivated, stay moving, StayFit!
//         </p>
//         </div>
//         </>
//     )
// }