import { createConfig, http } from 'wagmi';
import { spicy } from 'wagmi/chains';
import { injected } from '@wagmi/core';

export const config = createConfig({
  chains: [spicy],
  multiInjectedProviderDiscovery: false,
  transports: {
    [spicy.id]: http(),
  },
  connectors: [injected()],
});
