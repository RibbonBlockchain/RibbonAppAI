export const TextSecondary = ({ text }: { text: string }) => {
  return (
    <p className="text-[#2B2B2B] text-sm font-normal max-w-[380px]">{text}</p>
  );
};

const TextPrimary = ({ text }: { text: string }) => {
  return <h1 className="text-3xl font-bold">{text}</h1>;
};

export default TextPrimary;
