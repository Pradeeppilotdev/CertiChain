import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { darkTheme } from '@rainbow-me/rainbowkit'
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  argentWallet,
  braveWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const projectId = 'b4a021d4d1f310fc837589b04f187b3c'

const eduChainTestnet = {
  id: 656476,
  name: 'EDU Chain Testnet',
  network: 'edu-chain-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EDU',
    symbol: 'EDU',
  },
  rpcUrls: {
    default: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
    public: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://edu-chain-testnet.blockscout.com' },
  },
  testnet: true,
}

const { chains, publicClient } = configureChains(
  [eduChainTestnet],
  [
    publicProvider()
  ]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'CertiChain', chains }),
      rainbowWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
    ],
  },
  {
    groupName: 'More',
    wallets: [
      ledgerWallet({ projectId, chains }),
      braveWallet({ chains }),
      argentWallet({ projectId, chains }),
      safeWallet({ chains }),
      injectedWallet({ chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const rainbowKitTheme = darkTheme({
  accentColor: '#8B5DFF',
  accentColorForeground: '#FFFFFF',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small',
})

const rainbowKitConfig = {
  appInfo: {
    appName: 'CertiChain',
    learnMoreUrl: 'https://certichain.com',
  },
  chains,
  theme: rainbowKitTheme,
  coolMode: true,
  modalSize: 'wide',
  showRecentTransactions: true,
  initialChain: eduChainTestnet,
}

export { chains, wagmiConfig, rainbowKitConfig } 