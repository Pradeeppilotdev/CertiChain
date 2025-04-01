import CWallet from '../assets/Images/ConnectWallet.jpg';

import '../Styles/PageStyles/ConnectWallet.css';

function ConnectWallet() {
  return (
    <div className="cWallet">


        <div className="cwalletimg">
            <img src={CWallet} alt="" />
        </div>

        <section className="cwallet-text">
            <div className="purple cpurple"></div>

            <h1>Connect Wallet</h1>
            <h3>Securely connect your wallet to proceed.</h3>
            <button className="connect-btn">Connect</button>
        </section>


    </div>
  )
}

export default ConnectWallet;
