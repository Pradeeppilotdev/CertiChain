import '../Styles/ComponentStyles/Featuregrid.css';
import Decentralised from '../assets/Images/Decentralised.jpg';
import Verification from '../assets/Images/Verification.jpg';
import Access from '../assets/Images/Access.jpg';
import Secure from '../assets/Images/Secure.jpg';

function Featuregrid() {
    const features = [
        {
          title: 'Decentralized Storage',
          description: 'Secure and immutable certificate storage using blockchain, ensuring transparency and preventing tampering.',
          img: Decentralised
        },
        {
          title: 'User Verification',
          description: 'Enables institutions to verify certificates quickly and efficiently using blockchain authentication.',
          img: Verification
        },
        {
          title: 'Easy Access',
          description: 'Students can manage and share their certificates through unique links or QR codes.',
          img: Access
        },
        {
          title: 'Secure Sharing',
          description: 'Certificates are encrypted and shared with authorized users, maintaining data privacy and security.',
          img: Secure
        }
      ];
    
      return (
        <div className="container">
          <h1 className='Titles'>What We Do</h1>
          <div className="grid">
            {features.map((feature, index) => (
              <div className="card" key={index}>
                <img src={feature.img} alt="" />
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
                <div className="purple"></div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Featuregrid
