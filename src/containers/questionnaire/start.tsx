import Image from "next/image";
import LinkButton from "@/components/button/link";
import BackArrowButton from "@/components/button/back-arrow";

const BeginQuestionnaire = ({
  reward,
  imageUrl,
  description,
  rewardPoints,
  completionTime,
  rewardPointText,
}: {
  reward: string;
  imageUrl: string;
  description: string;
  rewardPoints: string;
  completionTime: string;
  rewardPointText: string;
}) => {
  return (
    <div className="relative flex flex-col h-[inherit] items-start justify-between p-4 sm:p-6">
      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute top-0 left-10"
      />

      <div className="w-full flex flex-col items-start gap-4 justify-center">
        <BackArrowButton />
        <Image
          width={234}
          height={241}
          src={imageUrl}
          alt="question"
          className="mx-auto flex items-center self-center justify-center"
        />
      </div>

      <div className="grid gap-y-14 -mt-16">
        <h1 className="font-bold text-[26px] text-center text-[#714EE7]">
          {description}
        </h1>

        <div className="flex items-center gap-x-2">
          <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE] relative">
            <Image
              src="/images/questionnaire/coins.png"
              alt="coins"
              width={25}
              height={20}
              className=""
            />
          </div>
          <div>
            <h3 className="text-primary font-bold text-xl">{reward} WLD</h3>
            <p className="text-[#434343] text-[0.75rem] mt-1">
              {description} for a token of {reward} WLD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE]">
            <Image
              width={25}
              alt="coins"
              height={20}
              className=""
              src="/images/questionnaire/cup.png"
            />
          </div>
          <div>
            <h3 className="text-primary font-bold text-xl">
              + {rewardPoints} points
            </h3>
            <p className="text-[#434343] text-[0.75rem] mt-1">
              Earn {rewardPoints} points by {rewardPointText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="border rounded-full w-10 h-10 flex justify-center items-center border-[#A78EFE]">
            <Image
              src="/images/questionnaire/time.png"
              alt="coins"
              width={25}
              height={20}
            />
          </div>
          <div>
            <h3 className="text-primary font-bold text-xl">{completionTime}</h3>{" "}
            <p className="text-[#434343] text-[0.75rem] mt-1">
              Complete this task in just {completionTime}
            </p>
          </div>
        </div>
      </div>

      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute self-end justify-center top-[37vh]"
      />

      <LinkButton
        href={"/dashboard/questionnaire/verify-phone-number"}
        className="text-white mb-6 bg-gradient-to-r from-[#714EE7] to-[#A81DA6]"
      >
        {description}
      </LinkButton>

      <Image
        src="/images/questionnaire/i1.png"
        alt="q1"
        width={178}
        height={178}
        className="absolute self-start justify-start left-5 bottom-28"
      />
    </div>
  );
};

export default BeginQuestionnaire;
