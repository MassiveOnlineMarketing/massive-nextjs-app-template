import { cn } from "@/app/_components/utils";

const BUTTON_VARIANTS = {
  connect: {
    className:
      "bg-gradient-to-b from-white to-[#f8f8ff] border-primary-500 text-base-500",
    text: "Connect",
  },
  connected: {
    className: "bg-gradient-to-b from-[#F0FDF4]/0 to-[#F0FDF4] text-green-500",
    text: "Connected",
  },
  unavailable: {
    className: "bg-gray-100 text-gray-400 border-gray-300",
    text: "Unavailable",
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "connect" | "connected" | "unavailable";
}

const Button: React.FC<ButtonProps> = ({ variant, ...props }) => {
  const { className, text } = BUTTON_VARIANTS[variant];

  return (
    <button
      {...props}
      className={cn(
        "w-[120px]  py-2 border ml-auto rounded-lg  text-sm leading-5 font-semibold mt-auto ",
        className,
      )}
    >
      {text}
    </button>
  );
};

export default Button;
