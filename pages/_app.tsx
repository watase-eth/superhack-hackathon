import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  paperWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import NavigationHeader from "../components/NavigationHeader";
import Footer from "../components/Footer";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "base-goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        paperWallet({
          paperClientId: "3e2462df-afdb-4215-bbf1-e4ac6cddf301",
        }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
      ]}
    >
      <ChakraProvider>
        <NavigationHeader />
        <Flex direction="column" minH="100vh">
          <Flex as="main" flex="1">
            <Component {...pageProps} />
          </Flex>

          <Footer />
        </Flex>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
