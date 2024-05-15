"use client";

import { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  CHAIN_NAMESPACES,
  IProvider,
  UX_MODE,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import {
  OpenloginAdapter,
  OpenloginLoginParams,
  OpenloginUserInfo,
} from "@web3auth/openlogin-adapter";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { WalletConnectModal } from "@walletconnect/modal";
import RPC from "../web3RPC";
import toast from "react-hot-toast";
import BackArrowButton from "@/components/button/back-arrow";

// Ribbon sample app
// const clientId =
//   "BFNvw32pKnVURo4cx9n1uCc0MO7_iisPEdoX_4JYXvXlebOVYiuOmCXHxI0k3EVYSWiPaxNIY-T5iII8CncmJfU";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xA", // hex of 10
  rpcTarget: "https://rpc.ankr.com/optimism",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Optimism Mainnet",
  blockExplorerUrl: "https://optimistic.etherscan.io",
  ticker: "OP",
  tickerName: "OP",
  logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
};

function App() {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);

  const [userInfo, setUserInfo] = useState<Partial<OpenloginUserInfo>>();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [sign, setSign] = useState("");

  const [message, setMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3auth = new Web3AuthNoModal({
          clientId,
          // web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,

          privateKeyProvider,
          uiConfig: {
            // appName: "W3A Heroes",
            appName: "Ribbon Sample app",
            appUrl: "https://web3auth.io",
            logoLight: "https://web3auth.io/images/web3authlog.png",
            logoDark: "https://web3auth.io/images/web3authlogodark.png",
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            mode: "light", // whether to enable dark mode. defaultValue: false
            theme: {
              primary: "#768729",
            },
            useLogoLoader: true,
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
          loginSettings: {
            mfaLevel: "optional",
          },
          privateKeyProvider,
        });
        web3auth.configureAdapter(openloginAdapter);

        // adding wallet connect v2 adapter
        const defaultWcSettings = await getWalletConnectV2Settings(
          CHAIN_NAMESPACES.EIP155,
          ["0x1", "0xaa36a7"],
          "04309ed1007e77d1f119b85205bb779d"
        );
        const walletConnectModal = new WalletConnectModal({
          projectId: "04309ed1007e77d1f119b85205bb779d",
        });
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: {
            qrcodeModal: walletConnectModal,
            ...defaultWcSettings.adapterSettings,
          },
          loginSettings: { ...defaultWcSettings.loginSettings },
        });

        web3auth.configureAdapter(walletConnectV2Adapter);
        setWeb3Auth(web3auth);
        await web3auth.init();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  // const loginWithSMS = async () => {
  //   if (!web3auth) {
  //     uiConsole("web3auth not initialized yet");
  //     return;
  //   }
  //   const web3authProvider = await web3auth.connectTo<OpenloginLoginParams>(
  //     WALLET_ADAPTERS.OPENLOGIN,
  //     {
  //       loginProvider: "sms_passwordless",
  //       extraLoginOptions: {
  //         login_hint: "+65-XXXXXXX",
  //       },
  //     }
  //   );
  //   setProvider(web3authProvider);
  //   if (web3auth.connected) {
  //     setLoggedIn(true);
  //   }
  // };

  // const loginWithEmail = async () => {
  //   if (!web3auth) {
  //     uiConsole("web3auth not initialized yet");
  //     return;
  //   }
  //   const web3authProvider = await web3auth.connectTo(
  //     WALLET_ADAPTERS.OPENLOGIN,
  //     {
  //       loginProvider: "email_passwordless",
  //       extraLoginOptions: {
  //         login_hint: "hello@web3auth.io",
  //       },
  //     }
  //   );
  //   setProvider(web3authProvider);
  //   if (web3auth.connected) {
  //     setLoggedIn(true);
  //   }
  // };

  const loginWCModal = async () => {
    if (!web3auth) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.WALLET_CONNECT_V2
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    if (!web3auth) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  // authenticate user
  const authenticateUser = async () => {
    if (!web3auth) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");

      return;
    }
    const idToken = await web3auth.authenticateUser();
    // uiConsole(idToken);
    console.log("id token>>>>>", idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }

    try {
      const user = await web3auth.getUserInfo();
      // uiConsole(user);
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    }
  };

  const getChainId = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    const chainBalance = await rpc.getBalance();

    uiConsole(chainId);
  };

  const addChain = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const newChain = {
      chainId: "0xaa36a7", // for wallet connect make sure to pass in this chain in the loginSettings of the adapter.
      displayName: "Ethereum Sepolia",
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      tickerName: "Ethereum Sepolia",
      ticker: "ETH",
      rpcTarget: "https://rpc.ankr.com/eth_sepolia",
      blockExplorerUrl: "https://sepolia.etherscan.io",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    };
    await web3auth?.addChain(newChain);
    uiConsole("New Chain Added");
  };

  const switchChain = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    await web3auth?.switchChain({ chainId: "0xaa36a7" });
    uiConsole("Chain Switched");
  };

  const getAccounts = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      // uiConsole("web3auth not initialized yet");
      toast.error("web3auth not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  // const showWalletUi = async () => {
  //   if (!walletServicesPlugin) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   await walletServicesPlugin.showWalletUi();
  // };

  // const showWalletConnectScanner = async () => {
  //   if (!walletServicesPlugin) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   await walletServicesPlugin.showWalletConnectScanner();
  // };

  // const showCheckout = async () => {
  //   if (!walletServicesPlugin) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   await walletServicesPlugin.showCheckout();
  // };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button onClick={addChain} className="card">
            Add Chain
          </button>
        </div>
        <div>
          <button onClick={switchChain} className="card">
            Switch Chain
          </button>
        </div>
        {/* <div>
          <button onClick={showWalletUi} className="card">
            Show Wallet UI
          </button>
        </div>
        <div>
          <button onClick={showWalletConnectScanner} className="card">
            Show Wallet Connect Scanner
          </button>
        </div>
        <div>
          <button onClick={showCheckout} className="card">
            Fiat to Crypto
          </button>
        </div> */}
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}>Logged in Successfully!</p>
      </div>
    </>
  );

  const unloggedInView = (
    <>
      <button onClick={login} className="card">
        Login
      </button>
      {/* <button onClick={loginWithSMS} className="card">
        SMS Login (e.g +cc-number)
      </button>
      <button onClick={loginWithEmail} className="card">
        Email Login (e.g hello@web3auth.io)
      </button> */}
      <button onClick={loginWCModal} className="card">
        Login with Wallet Connect v2
      </button>
    </>
  );

  return (
    <div className="p-4 sm:p-6 bg-[#F7F5FF] h-full flex flex-col">
      <div className="mb-6">
        <BackArrowButton stroke="#583DB4" />
        <div className="flex -mt-10  flex-row items-center justify-center text-base font-semibold">
          Wallet
        </div>

        {web3auth?.connected ? (
          <div className="px-4 py-2 w-fit bg-green-500 text-white rounded-full hover:bg-green-600 mr-2 mt-4 ">
            on
          </div>
        ) : (
          <div className="px-4 py-2 w-fit bg-red-500 text-white rounded-full hover:bg-red-600 mr-2 mt-4">
            off
          </div>
        )}
      </div>

      <div className="flex items-end justify-end">
        <button
          onClick={logout}
          className="px-4 py-2 w-fit bg-red-500 text-white rounded hover:bg-red-500 mr-2 mt-4"
        >
          Log Out Wallet
        </button>
      </div>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>

      {/* <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-no-modal-sdk/blockchain-connection-examples/evm-no-modal-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer> */}
    </div>
  );
}

export default App;
