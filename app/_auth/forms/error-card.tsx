import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center bg-red-100">
        <ExclamationTriangleIcon className="text-destructive text-red-500 w-6 h-6" />
      </div>
    </CardWrapper>
  );
};
