import { baseSepolia } from "viem/chains";
import { Avatar, Identity, Name, Address } from "@coinbase/onchainkit/identity";

//@ts-ignore
interface DisplayBasenameProps {
  //@ts-ignore
  address: string | undefined;
}

const Basenames = ({ address }: { address: DisplayBasenameProps }) => {
  return (
    <Identity
      // @ts-ignore
      address={address}
      chain={baseSepolia}
      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
    >
      <Avatar
        className="mr-1"
        //@ts-ignore
        address={address}
        chain={baseSepolia}
      />
      <Name
        //@ts-ignore
        address={address}
        chain={baseSepolia}
      />
      <Address />
    </Identity>
  );
};

export default Basenames;
