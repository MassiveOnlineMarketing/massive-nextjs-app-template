import { cn } from "@/app/_components/utils";

interface CardProps {
  heading: string;
  subHeading: string;
  Icon: React.ElementType;
  children: React.ReactNode;
  disabled?: boolean;
}

const IntegrationCard: React.FC<CardProps> = ({
  heading,
  subHeading,
  Icon,
  children,
  disabled
}) => (
  <div className={cn(
    "w-full flex items-center gap-3",
    disabled && "opacity-50 pointer-events-none"
  )}>
    <div className="w-12 h-12 flex items-center justify-center rounded-full border theme-b-p">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="font-medium theme-t-p">{heading}</h3>
      <p className="text-sm theme-t-t">{subHeading}</p>
    </div>
    {children}
  </div>
);

export default IntegrationCard;
