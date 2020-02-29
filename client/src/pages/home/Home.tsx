import React, { useContext } from "react";
import "./Home.less";
import Title from "antd/lib/typography/Title";
import { Row, Col, Card, Button } from "antd";
import { AppContext } from "../../lib/helpers/AppContext";
import { Link } from "react-router-dom";
import HomeContent from "./HomeContent";

interface IProps {

}

export const Home: React.FC<IProps> = props => {
  const { organization } = useContext(AppContext)
  
  // show nothing on loading
  if (!organization)
    return <div />
  
  // destructure display variables
  const {landingHtml, phone, address, contactEmail, hoursOfOperation } = organization


  return (
    <div className="home-root">
      <div className='herolanding'>
        <div className='intro-wrap'></div>
        <div className='intro-wrap'>
          <div style={{width: '90%', margin: '15% auto' }}>
            <p style={{fontSize: '3em', fontWeight: 'bold', marginBottom: '20px'}}>Exceptional Services</p>
            <p style={{ fontSize: '1.5em' }}>Provided to you how and when<br/> you want.</p>
            <Link
              to="/events">
              <Button type="primary" style={{ width: '30%', boxSizing: 'content-box', padding: '6px 0' }}>
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className='herocontent'>
        <HomeContent />
        <div className='contentwrap'>
          <div className='contentpic'></div>
          <div className='contenttext'>
            <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Service</p>
            <p style={{fontSize: '1.3em', width: '80%'}}>
              RandomText is a tool designers and developers
              can use to quickly grab dummy 
              text in either Lorem Ipsum or Gibberish format.
            </p>
            <Link
              to="/events">
              <Button type="primary" style={{ width: '25%', boxSizing: 'content-box', padding: '5px 0', marginTop: '20px' }}>
                Book Now
              </Button>
            </Link>
          </div>
        </div>
        <HomeContent/>
      </div>
      {/* <div className="footer">
        <h1>HomePage</h1>
        <h3>{phone}</h3>
        <h3>{address}</h3>
        <h3>contact us {contactEmail}</h3>
      </div> */}
      {/** Custom Organizaton HTML */}
      {/* <div dangerouslySetInnerHTML={{ __html: landingHtml }}/> */}
    </div>
  );
}