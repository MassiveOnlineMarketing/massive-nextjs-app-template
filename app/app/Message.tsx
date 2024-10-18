
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { cn } from "../_components/utils";

type MessageFromTeamProps = {
  heading: string;
  message: string;
  className?: string;
};

const MessageFromTeam = ({
  heading,
  message,
  className,
}: MessageFromTeamProps) => {
  return (
    <div
      className={cn(
        "p-6 theme-bg-w border theme-b-p rounded-2xl shadow-base flex gap-2",
        className,
      )}
    >
      <ChatBubbleBottomCenterTextIcon className="min-w-6 h-6 text-base-500 mt-1 flex-0" />
      <div>
        <p className="mb-2 font-medium text-lg theme-t-p">{heading}</p>
        <p
          className="text-sm theme-t-s"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </div>
  );
};

export default MessageFromTeam;