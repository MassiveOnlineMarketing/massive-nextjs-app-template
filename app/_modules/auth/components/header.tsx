import { MassiveLogoColor } from "@/assets/branding";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">

      <div className="relative w-16 h-16 rounded-2xl m-1">
        <div className="w-full h-full relative z-40 rounded-2xl shadow-base bg-white flex items-center justify-center">
          <MassiveLogoColor className='relative z-1 w-[40px]' />
        </div>
        <div className="rounded-2xl absolute top-0 left-0 w-full h-full outline outline-4 outline-primary-50 bg-primary-50"></div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text-light">{label}</h2>
      <p className="text-muted-foreground text-sm"></p>
    </div>
  );
};
