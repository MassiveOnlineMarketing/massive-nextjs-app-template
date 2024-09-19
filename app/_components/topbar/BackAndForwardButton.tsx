'use client';

import { useRouter } from "next/navigation";
import { ArrowLeftIcon , ArrowRightIcon} from "@heroicons/react/24/outline";

const BackAndForwardButtons = () => {
  const router = useRouter();

  return (
    <div className="flex molecule hover:after:border-[5px] hover:after:-top-[5px] hover:after:-left-[5px] hover:theme-bg-p rounded-[39px] before:rounded-[39px] after:rounded-[39px]">
      <button onClick={() => router.back()} className="pl-1 py-1 pr-1.5 rounded-lg hover:bg-white">
        <ArrowLeftIcon className="theme-t-p w-8 h-8 p-1.5" />
      </button>
      <button onClick={() => router.forward()} className="theme-bg-p hover:bg-white pr-1 py-1 pl-1.5">
        <ArrowRightIcon className="theme-t-n w-8 h-8 p-1.5 hover:theme-t-p"/>
      </button>
    </div>
  );
};

const ArrowLeftSvg: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0001 7.00005C14.0001 7.19897 13.9211 7.38973 13.7805 7.53038C13.6398 7.67104 13.449 7.75005 13.2501 7.75005L2.61212 7.75005L6.77012 11.7101C6.84447 11.7775 6.90452 11.8592 6.94672 11.9502C6.98892 12.0413 7.01241 12.1399 7.0158 12.2402C7.01919 12.3406 7.00241 12.4405 6.96645 12.5342C6.93049 12.628 6.87609 12.7135 6.80647 12.7858C6.73685 12.8581 6.65342 12.9157 6.56113 12.9552C6.46884 12.9946 6.36957 13.0152 6.2692 13.0156C6.16882 13.016 6.06939 12.9962 5.9768 12.9575C5.8842 12.9187 5.80032 12.8618 5.73012 12.7901L0.230124 7.54005C0.157537 7.47009 0.0998016 7.38621 0.0603662 7.29343C0.0209308 7.20065 0.000605147 7.10087 0.000605155 7.00005C0.000605164 6.89924 0.0209308 6.79946 0.0603662 6.70668C0.0998016 6.61389 0.157537 6.53002 0.230124 6.46005L5.73012 1.21005C5.80032 1.13831 5.8842 1.08138 5.9768 1.04264C6.06939 1.00391 6.16883 0.984151 6.2692 0.984549C6.36957 0.984946 6.46884 1.00549 6.56113 1.04495C6.65342 1.08442 6.73685 1.14201 6.80647 1.21431C6.87609 1.28661 6.9305 1.37215 6.96645 1.46587C7.00241 1.55958 7.01919 1.65955 7.0158 1.75987C7.01241 1.86019 6.98892 1.9588 6.94672 2.04987C6.90452 2.14094 6.84447 2.22262 6.77012 2.29005L2.61212 6.25005L13.2501 6.25005C13.449 6.25005 13.6398 6.32907 13.7805 6.46972C13.9211 6.61038 14.0001 6.80114 14.0001 7.00005Z" fill="#000" />
  </svg>
)

const ArrowRightSvg: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00012 9.99982C3.00012 9.80091 3.07914 9.61015 3.21979 9.46949C3.36044 9.32884 3.55121 9.24982 3.75012 9.24982H14.3881L10.2301 5.28982C10.1558 5.22239 10.0957 5.14071 10.0535 5.04964C10.0113 4.95857 9.98783 4.85996 9.98444 4.75964C9.98105 4.65932 9.99783 4.55935 10.0338 4.46564C10.0697 4.37192 10.1242 4.28638 10.1938 4.21408C10.2634 4.14178 10.3468 4.08419 10.4391 4.04472C10.5314 4.00526 10.6307 3.98472 10.731 3.98432C10.8314 3.98392 10.9309 4.00368 11.0234 4.04241C11.116 4.08115 11.1999 4.13808 11.2701 4.20982L16.7701 9.45982C16.8427 9.52979 16.9004 9.61367 16.9399 9.70645C16.9793 9.79923 16.9996 9.89901 16.9996 9.99982C16.9996 10.1006 16.9793 10.2004 16.9399 10.2932C16.9004 10.386 16.8427 10.4699 16.7701 10.5398L11.2701 15.7898C11.1999 15.8616 11.116 15.9185 11.0234 15.9572C10.9309 15.996 10.8314 16.0157 10.731 16.0153C10.6307 16.0149 10.5314 15.9944 10.4391 15.9549C10.3468 15.9155 10.2634 15.8579 10.1938 15.7856C10.1242 15.7133 10.0697 15.6277 10.0338 15.534C9.99783 15.4403 9.98105 15.3403 9.98444 15.24C9.98783 15.1397 10.0113 15.0411 10.0535 14.95C10.0957 14.8589 10.1558 14.7773 10.2301 14.7098L14.3881 10.7498H3.75012C3.55121 10.7498 3.36044 10.6708 3.21979 10.5302C3.07914 10.3895 3.00012 10.1987 3.00012 9.99982Z" fill="#94A3B8" />
  </svg>
)

export default BackAndForwardButtons;