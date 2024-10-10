import React from "react";
import toast from "react-hot-toast";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import { ArrowDownLeft, ArrowUpRight, Copy } from "lucide-react";

export interface RawContract {
  value: string;
  address: string;
  decimal: string;
}

export interface Transfer {
  blockNum: string;
  uniqueId: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  asset: string;
  category: string;
  rawContract: RawContract;
}

export interface TransactionHistory {
  in: {
    transfers: Transfer[];
    pageKey: string;
  };
  out: {
    transfers: Transfer[];
    pageKey: string;
  };
}

interface Props {
  data: TransactionHistory;
}

const TransactionHistory: React.FC<Props> = ({ data }) => {
  const { in: incoming, out: outgoing } = data;

  const renderTransfers = (
    transfers: Transfer[],
    title: string,
    isIncoming: boolean
  ) => (
    <div>
      <h2 className="mb-4">{title}</h2>
      <div className="flex flex-col gap-4">
        {transfers.map((transfer) => (
          <div
            key={transfer.uniqueId}
            className={"flex flex-row items-center justify-between"}
          >
            <div className="flex flex-row gap-2 items-center">
              <div
                className={`flex items-center px-3 py-3 rounded-full ${
                  isIncoming ? "bg-[#EAF7ED]" : "bg-[#FFE8E7]"
                }`}
              >
                {isIncoming ? (
                  <ArrowDownLeft size={20} color="#2A9E47" />
                ) : (
                  <ArrowUpRight size={20} color="#FF170A" />
                )}
              </div>

              <div className="text-sm">
                <p
                  className={
                    isIncoming
                      ? "text-[#2A9E47] font-bold"
                      : "text-red-500 font-bold"
                  }
                >
                  {isIncoming ? "Received" : "Sent"}
                </p>
                <p className="text-[#98A2B3] font-medium">
                  {isIncoming ? shorten(transfer.from) : shorten(transfer.to)}
                </p>
                <div className="flex flex-row items-center gap-1 text-[#98A2B3] font-medium">
                  Hash:
                  <div
                    className="flex flex-row items-center gap-1"
                    onClick={() =>
                      copyToClipboard(transfer.hash, () =>
                        toast.success("copied")
                      )
                    }
                  >
                    {shorten(transfer.hash)}
                    <Copy stroke="#fff" size={14} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-end text-sm font-medium">
              <p>
                {isIncoming ? `+ ${transfer.value}` : `- ${transfer.value}`}{" "}
                {transfer.asset}
              </p>
              <p className="text-[#98A2B3]">00:00</p>
            </div>

            {/* <p>
              <strong>Hash:</strong> {transfer.hash}
            </p>
            <p>
              <strong>From:</strong> {transfer.from}
            </p>
            <p>
              <strong>To:</strong> {transfer.to}
            </p>
            <p>
              <strong>Value:</strong> {transfer.value} {transfer.asset}
            </p>
            <p>
              <strong>Block Number:</strong> {transfer.blockNum}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {renderTransfers(outgoing.transfers, "Outgoing Transactions", false)}
      {renderTransfers(incoming.transfers, "Incoming Transactions", true)}
    </div>
  );
};

export default TransactionHistory;
