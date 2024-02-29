const Button = ({
  text,
  style,
  image,
  bgColor,
  textColor,
}: {
  text: string;
  onclick?: any;
  style?: string;
  bgColor?: string;
  textColor?: string;
  image?: React.ReactNode;
}) => {
  return (
    <button
      className={`bg-${bgColor || "[#4285F4]"}  
        ${textColor} 
        ${style}
        border-[#4285F4] w-full max-w-[370px] py-3.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2`}
    >
      {text}
      {image}
    </button>
  );
};

export default Button;
