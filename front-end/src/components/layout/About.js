/**
 * Functional components, there is no need to use states
 */
import React from 'react';
import weiyang from '../../img/Weiyang.png';
import iman from '../../img/Iman.png';
import amos from '../../img/Amos.png';

const About = () => {
  return (
    <div className="container">
      <h4 className="center">Checks the crowd level of your favourite study areas before going there!</h4>
      <h5 style={{padding: 20}} className="center">Proudly brought to you by our hackathon members:</h5>
      <div className="row">
        <img src={weiyang} className="left center-align col" alt="photo" style={{ width: 500, height: 400 }}></img>
        <img src={iman} className="left center-align col" alt="photo" style={{ width: 500, height: 400 }}></img>
        <img src={amos} className="left center-align col" alt="photo" style={{ width: 500, height: 400 }}></img>
      </div>
      <footer>
        <h6 style={{paddingTop:250}}className="grey-text center">Hack n Roll 2020</h6>
      </footer>

    </div>
  )
}



export default About;