import useLogout from "@/app/_modules/auth/hooks/use-logout";
import { useCurrentUser } from "@/app/_modules/auth/hooks/user-current-user";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export const MainSideBarUserActions = () => {
    const user = useCurrentUser();
    const logout = useLogout();
    const handleLogout = async () => {
      await logout();
    };
  
    return (
      <div className="p-1 border dark:bg-dark-bg-light dark:border-dark-stroke border-mix-blend-multiply dark:border-mix-blend-plus-lighter rounded-xl group/user bg-white ">
        <div className="h-[54px] p-[6px] flex gap-3 justify-center items-center">
          <p className="text-gray-500 dark:text-dark-text-light font-medium text-sm text-nowrap">
            {user?.name}
          </p>
          <div className="w-full h-[1px] bg-p-100 dark:bg-dark-stroke mix-blend-multiply dark:mix-blend-plus-lighter"></div>
          <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-dark-text-dark shrink-0 transition-transform duration-200 group-hover/user:-rotate-90" />
        </div>
        <div className="h-0 group-hover/user:h-[88px] transition-all duration-300 overflow-hidden text-gray-500 bg-p-25 dark:text-dark-text-dark dark:bg-p-1100 rounded-md">
          <div className="px-[6px] py-[10px]  flex items-center gap-2">
            <Cog6ToothIcon className="w-6 h-6" />
            <Link
              className="w-full"
              href="/app/settings/profile"
            >
              Account Settings
            </Link>
          </div>
          <div className="px-[6px] py-[10px] flex items-center gap-2">
            <LogOutIcon className="w-6 h-6" />
            <button
              className="w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }