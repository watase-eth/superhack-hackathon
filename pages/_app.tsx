import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  coinbaseWallet,
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
      clientId="a87dfb88e7bd139a1663fbd42823696e"
      activeChain={activeChain}
      supportedWallets={[
        paperWallet({
          paperClientId: "3e2462df-afdb-4215-bbf1-e4ac6cddf301",
        }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
      // sdkOptions={{
      //   gasless: {
      //     openzeppelin: {
      //       relayerUrl: "https://api.defender.openzeppelin.com/autotasks/5ab20b46-200c-44cc-8d8e-98277bd098d6/runs/webhook/f50c489e-27b7-4e2a-a791-5b193a3b072f/Aibhpw6Fbfn3iWfNgpcZyM",
      //       relayerForwarderAddress: "0x5001A14CA6163143316a7C614e30e6041033Ac20",
      //     }
      //   }
      // }}      
    >
      <ChakraProvider>
        <NavigationHeader />
        <Flex direction="column" minH="100vh">
          <Flex as="main" justifyContent={"center"}>
            <Component {...pageProps} />
          </Flex>
        </Flex>
        <Footer />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
