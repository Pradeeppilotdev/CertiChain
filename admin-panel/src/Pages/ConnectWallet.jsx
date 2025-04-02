import CWallet from '../assets/Images/ConnectWallet.jpg';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '../Styles/PageStyles/ConnectWallet.css';

function ConnectWallet() {
  console.log('Rendering ConnectWallet component'); // Debug log
  return (
    <div className="connect-wallet-page">
      <div className="cWallet">
        <div className="cwalletimg">
          <img 
            src={CWallet} 
            alt="Connect Wallet" 
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => {
              console.error('Image failed to load:', e);
              e.target.style.display = 'none';
            }}
          />
        </div>

        <section className="cwallet-text">
          <div className="purple cpurple"></div>
          <h1>Connect Wallet</h1>
          <h3>Securely connect your wallet to proceed.</h3>
          <div className="connect-btn-container">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                return (
                  <div
                    {...(!mounted && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!mounted || !account || !chain) {
                        return (
                          <button onClick={openConnectModal} type="button">
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ConnectWallet;
