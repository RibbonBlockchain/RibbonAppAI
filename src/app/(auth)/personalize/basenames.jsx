import { baseSepolia } from "viem/chains";
import { Avatar, Identity, Name, Address } from "@coinbase/onchainkit/identity";

// interface DisplayBasenameProps {
//   address: 0x${string} | undefined;
// }

const Basenames = ({ address }) => {
  return (
    <Identity
      address={address}
      chain={baseSepolia}
      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
    >
      <Avatar className="mr-1" address={address} chain={baseSepolia} />
      <Name address={address} chain={baseSepolia} />
      <Address />
    </Identity>
  );
};

export default Basenames;
