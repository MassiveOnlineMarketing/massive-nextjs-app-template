'use client'

import { useState } from 'react'
import { cn } from '@/app/_components/utils'

export default function Switch() {
    const [enabled, setEnabled] = useState(false)

    return (// h-6 w-11
        <button type="button" className={cn(
            "relative inline-flex h-11 w-[88px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent  bg-base-100",
            'transition-colors duration-200 ease-in-out',
            // enabled ? "bg-indigo-500" : "bg-base-200"
        )} role="switch" aria-checked="false" onClick={() => setEnabled(!enabled)}>
            <span className="sr-only">Use setting</span>
            <span className={cn(
                "pointer-events-none relative inline-block h-9 w-9 translate-y-[2px]  transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                enabled ? "translate-x-[42px]" : "translate-x-0"
            )}>
                <span
                    className={cn(
                        "absolute inset-0 flex h-full w-full items-center justify-center opacity-100 transition-opacity",
                        enabled ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in"
                    )}
                    aria-hidden="true"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9999 2.24994C12.1988 2.24994 12.3896 2.32896 12.5302 2.46961C12.6709 2.61026 12.7499 2.80103 12.7499 2.99994V5.24994C12.7499 5.44885 12.6709 5.63962 12.5302 5.78027C12.3896 5.92092 12.1988 5.99994 11.9999 5.99994C11.801 5.99994 11.6102 5.92092 11.4696 5.78027C11.3289 5.63962 11.2499 5.44885 11.2499 5.24994V2.99994C11.2499 2.80103 11.3289 2.61026 11.4696 2.46961C11.6102 2.32896 11.801 2.24994 11.9999 2.24994ZM7.4999 11.9999C7.4999 10.8065 7.97401 9.66187 8.81792 8.81796C9.66183 7.97405 10.8064 7.49994 11.9999 7.49994C13.1934 7.49994 14.338 7.97405 15.1819 8.81796C16.0258 9.66187 16.4999 10.8065 16.4999 11.9999C16.4999 13.1934 16.0258 14.338 15.1819 15.1819C14.338 16.0258 13.1934 16.4999 11.9999 16.4999C10.8064 16.4999 9.66183 16.0258 8.81792 15.1819C7.97401 14.338 7.4999 13.1934 7.4999 11.9999ZM18.8939 6.16594C19.0264 6.02376 19.0985 5.83572 19.0951 5.64142C19.0916 5.44712 19.0129 5.26173 18.8755 5.12432C18.7381 4.9869 18.5527 4.90819 18.3584 4.90476C18.1641 4.90134 17.9761 4.97346 17.8339 5.10594L16.2429 6.69594C16.1712 6.76509 16.1141 6.84782 16.0747 6.93931C16.0354 7.03079 16.0146 7.1292 16.0137 7.22878C16.0128 7.32836 16.0317 7.42713 16.0694 7.51932C16.1071 7.61151 16.1627 7.69528 16.2331 7.76573C16.3035 7.83618 16.3872 7.89191 16.4794 7.92966C16.5715 7.96742 16.6703 7.98644 16.7698 7.98562C16.8694 7.9848 16.9679 7.96416 17.0594 7.9249C17.1509 7.88564 17.2337 7.82854 17.3029 7.75694L18.8939 6.16594ZM21.7499 11.9999C21.7499 12.1989 21.6709 12.3896 21.5302 12.5303C21.3896 12.6709 21.1988 12.7499 20.9999 12.7499H18.7499C18.551 12.7499 18.3602 12.6709 18.2196 12.5303C18.0789 12.3896 17.9999 12.1989 17.9999 11.9999C17.9999 11.801 18.0789 11.6103 18.2196 11.4696C18.3602 11.329 18.551 11.2499 18.7499 11.2499H20.9999C21.1988 11.2499 21.3896 11.329 21.5302 11.4696C21.6709 11.6103 21.7499 11.801 21.7499 11.9999ZM17.8339 18.8939C17.9761 19.0264 18.1641 19.0985 18.3584 19.0951C18.5527 19.0917 18.7381 19.013 18.8755 18.8756C19.0129 18.7381 19.0916 18.5528 19.0951 18.3585C19.0985 18.1642 19.0264 17.9761 18.8939 17.8339L17.3039 16.2429C17.2347 16.1713 17.152 16.1141 17.0605 16.0748C16.969 16.0354 16.8706 16.0147 16.7711 16.0138C16.6715 16.0128 16.5727 16.0318 16.4805 16.0694C16.3883 16.1071 16.3046 16.1628 16.2341 16.2331C16.1637 16.3035 16.1079 16.3872 16.0702 16.4794C16.0324 16.5715 16.0134 16.6703 16.0142 16.7699C16.015 16.8695 16.0357 16.9679 16.0749 17.0594C16.1142 17.1509 16.1713 17.2337 16.2429 17.3029L17.8339 18.8939ZM11.9999 17.9999C12.1988 17.9999 12.3896 18.079 12.5302 18.2196C12.6709 18.3603 12.7499 18.551 12.7499 18.7499V20.9999C12.7499 21.1989 12.6709 21.3896 12.5302 21.5303C12.3896 21.6709 12.1988 21.7499 11.9999 21.7499C11.801 21.7499 11.6102 21.6709 11.4696 21.5303C11.3289 21.3896 11.2499 21.1989 11.2499 20.9999V18.7499C11.2499 18.551 11.3289 18.3603 11.4696 18.2196C11.6102 18.079 11.801 17.9999 11.9999 17.9999ZM7.7579 17.3029C7.89445 17.1614 7.96996 16.9719 7.96816 16.7753C7.96636 16.5786 7.88739 16.3906 7.74827 16.2516C7.60915 16.1126 7.421 16.0338 7.22435 16.0322C7.0277 16.0306 6.83829 16.1063 6.6969 16.2429L5.1059 17.8329C4.96921 17.9743 4.89353 18.1637 4.89514 18.3604C4.89676 18.557 4.97555 18.7452 5.11454 18.8843C5.25353 19.0234 5.4416 19.1024 5.63825 19.1042C5.8349 19.106 6.02438 19.0305 6.1659 18.8939L7.7569 17.3039L7.7579 17.3029ZM5.9999 11.9999C5.9999 12.1989 5.92088 12.3896 5.78023 12.5303C5.63958 12.6709 5.44881 12.7499 5.2499 12.7499H2.9999C2.80099 12.7499 2.61022 12.6709 2.46957 12.5303C2.32892 12.3896 2.2499 12.1989 2.2499 11.9999C2.2499 11.801 2.32892 11.6103 2.46957 11.4696C2.61022 11.329 2.80099 11.2499 2.9999 11.2499H5.2499C5.44881 11.2499 5.63958 11.329 5.78023 11.4696C5.92088 11.6103 5.9999 11.801 5.9999 11.9999ZM6.6969 7.75694C6.83908 7.88942 7.02712 7.96154 7.22142 7.95811C7.41572 7.95469 7.60111 7.87597 7.73852 7.73856C7.87594 7.60115 7.95465 7.41576 7.95808 7.22146C7.9615 7.02716 7.88938 6.83911 7.7569 6.69694L6.1669 5.10594C6.02551 4.96925 5.8361 4.89357 5.63945 4.89518C5.4428 4.8968 5.25465 4.97558 5.11553 5.11458C4.97641 5.25357 4.89744 5.44164 4.89564 5.63829C4.89384 5.83494 4.96935 6.02442 5.1059 6.16594L6.6969 7.75694Z" fill="#2C3462" />
                    </svg>
                </span>
                <span className={cn(
                    "absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out",
                    enabled ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out"
                )} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.4549 2.00418C7.56764 2.09397 7.65213 2.21435 7.69824 2.35091C7.74435 2.48747 7.75013 2.63442 7.7149 2.77418C7.38266 4.07815 7.4333 5.45024 7.86077 6.72617C8.28823 8.00209 9.07439 9.12777 10.1251 9.96842C11.1758 10.8091 12.4466 11.329 13.7852 11.4661C15.1239 11.6031 16.4736 11.3515 17.6729 10.7412C17.8013 10.6758 17.9459 10.6489 18.0893 10.6636C18.2326 10.6782 18.3687 10.7339 18.4813 10.8238C18.5938 10.9138 18.6781 11.0343 18.724 11.171C18.7698 11.3076 18.7754 11.4545 18.7399 11.5942C18.3891 12.9715 17.6986 14.2388 16.7314 15.2803C15.7643 16.3217 14.5514 17.1041 13.2038 17.5557C11.8562 18.0073 10.4169 18.1138 9.01749 17.8654C7.6181 17.6171 6.30332 17.0218 5.19343 16.134C4.08355 15.2462 3.21399 14.0943 2.66431 12.7836C2.11463 11.473 1.90238 10.0454 2.04697 8.6315C2.19156 7.21761 2.68838 5.86254 3.49198 4.69027C4.29557 3.51799 5.38029 2.56593 6.6469 1.92118C6.77533 1.85597 6.91982 1.82911 7.06311 1.84383C7.20639 1.85855 7.34241 1.91422 7.4549 2.00418Z" fill="#94A3B8" />
                    </svg>
                </span>
            </span>


            <span className={cn(
                "pointer-events-none relative inline-block h-9 w-9 translate-y-[2px]  transform rounded-full  transition duration-200 ease-in-out",
                enabled ? "-translate-x-[42px]" : "translate-x-0"
            )}>
                <span
                    className={cn(
                        "absolute inset-0 flex h-full w-full items-center justify-center opacity-100 transition-opacity",
                        enabled ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out"
                    )}
                    aria-hidden="true"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9999 2.24994C12.1988 2.24994 12.3896 2.32896 12.5302 2.46961C12.6709 2.61026 12.7499 2.80103 12.7499 2.99994V5.24994C12.7499 5.44885 12.6709 5.63962 12.5302 5.78027C12.3896 5.92092 12.1988 5.99994 11.9999 5.99994C11.801 5.99994 11.6102 5.92092 11.4696 5.78027C11.3289 5.63962 11.2499 5.44885 11.2499 5.24994V2.99994C11.2499 2.80103 11.3289 2.61026 11.4696 2.46961C11.6102 2.32896 11.801 2.24994 11.9999 2.24994ZM7.4999 11.9999C7.4999 10.8065 7.97401 9.66187 8.81792 8.81796C9.66183 7.97405 10.8064 7.49994 11.9999 7.49994C13.1934 7.49994 14.338 7.97405 15.1819 8.81796C16.0258 9.66187 16.4999 10.8065 16.4999 11.9999C16.4999 13.1934 16.0258 14.338 15.1819 15.1819C14.338 16.0258 13.1934 16.4999 11.9999 16.4999C10.8064 16.4999 9.66183 16.0258 8.81792 15.1819C7.97401 14.338 7.4999 13.1934 7.4999 11.9999ZM18.8939 6.16594C19.0264 6.02376 19.0985 5.83572 19.0951 5.64142C19.0916 5.44712 19.0129 5.26173 18.8755 5.12432C18.7381 4.9869 18.5527 4.90819 18.3584 4.90476C18.1641 4.90134 17.9761 4.97346 17.8339 5.10594L16.2429 6.69594C16.1712 6.76509 16.1141 6.84782 16.0747 6.93931C16.0354 7.03079 16.0146 7.1292 16.0137 7.22878C16.0128 7.32836 16.0317 7.42713 16.0694 7.51932C16.1071 7.61151 16.1627 7.69528 16.2331 7.76573C16.3035 7.83618 16.3872 7.89191 16.4794 7.92966C16.5715 7.96742 16.6703 7.98644 16.7698 7.98562C16.8694 7.9848 16.9679 7.96416 17.0594 7.9249C17.1509 7.88564 17.2337 7.82854 17.3029 7.75694L18.8939 6.16594ZM21.7499 11.9999C21.7499 12.1989 21.6709 12.3896 21.5302 12.5303C21.3896 12.6709 21.1988 12.7499 20.9999 12.7499H18.7499C18.551 12.7499 18.3602 12.6709 18.2196 12.5303C18.0789 12.3896 17.9999 12.1989 17.9999 11.9999C17.9999 11.801 18.0789 11.6103 18.2196 11.4696C18.3602 11.329 18.551 11.2499 18.7499 11.2499H20.9999C21.1988 11.2499 21.3896 11.329 21.5302 11.4696C21.6709 11.6103 21.7499 11.801 21.7499 11.9999ZM17.8339 18.8939C17.9761 19.0264 18.1641 19.0985 18.3584 19.0951C18.5527 19.0917 18.7381 19.013 18.8755 18.8756C19.0129 18.7381 19.0916 18.5528 19.0951 18.3585C19.0985 18.1642 19.0264 17.9761 18.8939 17.8339L17.3039 16.2429C17.2347 16.1713 17.152 16.1141 17.0605 16.0748C16.969 16.0354 16.8706 16.0147 16.7711 16.0138C16.6715 16.0128 16.5727 16.0318 16.4805 16.0694C16.3883 16.1071 16.3046 16.1628 16.2341 16.2331C16.1637 16.3035 16.1079 16.3872 16.0702 16.4794C16.0324 16.5715 16.0134 16.6703 16.0142 16.7699C16.015 16.8695 16.0357 16.9679 16.0749 17.0594C16.1142 17.1509 16.1713 17.2337 16.2429 17.3029L17.8339 18.8939ZM11.9999 17.9999C12.1988 17.9999 12.3896 18.079 12.5302 18.2196C12.6709 18.3603 12.7499 18.551 12.7499 18.7499V20.9999C12.7499 21.1989 12.6709 21.3896 12.5302 21.5303C12.3896 21.6709 12.1988 21.7499 11.9999 21.7499C11.801 21.7499 11.6102 21.6709 11.4696 21.5303C11.3289 21.3896 11.2499 21.1989 11.2499 20.9999V18.7499C11.2499 18.551 11.3289 18.3603 11.4696 18.2196C11.6102 18.079 11.801 17.9999 11.9999 17.9999ZM7.7579 17.3029C7.89445 17.1614 7.96996 16.9719 7.96816 16.7753C7.96636 16.5786 7.88739 16.3906 7.74827 16.2516C7.60915 16.1126 7.421 16.0338 7.22435 16.0322C7.0277 16.0306 6.83829 16.1063 6.6969 16.2429L5.1059 17.8329C4.96921 17.9743 4.89353 18.1637 4.89514 18.3604C4.89676 18.557 4.97555 18.7452 5.11454 18.8843C5.25353 19.0234 5.4416 19.1024 5.63825 19.1042C5.8349 19.106 6.02438 19.0305 6.1659 18.8939L7.7569 17.3039L7.7579 17.3029ZM5.9999 11.9999C5.9999 12.1989 5.92088 12.3896 5.78023 12.5303C5.63958 12.6709 5.44881 12.7499 5.2499 12.7499H2.9999C2.80099 12.7499 2.61022 12.6709 2.46957 12.5303C2.32892 12.3896 2.2499 12.1989 2.2499 11.9999C2.2499 11.801 2.32892 11.6103 2.46957 11.4696C2.61022 11.329 2.80099 11.2499 2.9999 11.2499H5.2499C5.44881 11.2499 5.63958 11.329 5.78023 11.4696C5.92088 11.6103 5.9999 11.801 5.9999 11.9999ZM6.6969 7.75694C6.83908 7.88942 7.02712 7.96154 7.22142 7.95811C7.41572 7.95469 7.60111 7.87597 7.73852 7.73856C7.87594 7.60115 7.95465 7.41576 7.95808 7.22146C7.9615 7.02716 7.88938 6.83911 7.7569 6.69694L6.1669 5.10594C6.02551 4.96925 5.8361 4.89357 5.63945 4.89518C5.4428 4.8968 5.25465 4.97558 5.11553 5.11458C4.97641 5.25357 4.89744 5.44164 4.89564 5.63829C4.89384 5.83494 4.96935 6.02442 5.1059 6.16594L6.6969 7.75694Z" fill="#2C3462" />
                    </svg>
                </span>
                <span className={cn(
                    "absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out",
                    enabled ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in"
                )} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.4549 2.00418C7.56764 2.09397 7.65213 2.21435 7.69824 2.35091C7.74435 2.48747 7.75013 2.63442 7.7149 2.77418C7.38266 4.07815 7.4333 5.45024 7.86077 6.72617C8.28823 8.00209 9.07439 9.12777 10.1251 9.96842C11.1758 10.8091 12.4466 11.329 13.7852 11.4661C15.1239 11.6031 16.4736 11.3515 17.6729 10.7412C17.8013 10.6758 17.9459 10.6489 18.0893 10.6636C18.2326 10.6782 18.3687 10.7339 18.4813 10.8238C18.5938 10.9138 18.6781 11.0343 18.724 11.171C18.7698 11.3076 18.7754 11.4545 18.7399 11.5942C18.3891 12.9715 17.6986 14.2388 16.7314 15.2803C15.7643 16.3217 14.5514 17.1041 13.2038 17.5557C11.8562 18.0073 10.4169 18.1138 9.01749 17.8654C7.6181 17.6171 6.30332 17.0218 5.19343 16.134C4.08355 15.2462 3.21399 14.0943 2.66431 12.7836C2.11463 11.473 1.90238 10.0454 2.04697 8.6315C2.19156 7.21761 2.68838 5.86254 3.49198 4.69027C4.29557 3.51799 5.38029 2.56593 6.6469 1.92118C6.77533 1.85597 6.91982 1.82911 7.06311 1.84383C7.20639 1.85855 7.34241 1.91422 7.4549 2.00418Z" fill="#94A3B8" />
                    </svg>
                </span>
            </span>
        </button>

    )
}
