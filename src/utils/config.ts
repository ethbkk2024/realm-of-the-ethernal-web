import { createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(),
  },
});
