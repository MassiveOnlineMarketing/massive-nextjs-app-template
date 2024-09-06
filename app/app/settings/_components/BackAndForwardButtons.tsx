'use client';

import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from "@heroicons/react/20/solid";

const BackAndForwardButtons = () => {
  const router = useRouter();
  
  return (
    <div className="flex gap-2">
      <button onClick={() => router.back()} className="rounded-[4px] bg-p-25 dark:bg-dark-bg-light p-2">
        <ArrowUturnLeftIcon className="w-5 h-5 text-slate-600 dark:text-dark-text-dark" />
      </button>
      <button onClick={() => router.forward()}>
        <ArrowUturnRightIcon className="w-5 h-5 text-slate-600 dark:text-dark-text-dark" />
      </button>
    </div>
  );
};

export default BackAndForwardButtons;