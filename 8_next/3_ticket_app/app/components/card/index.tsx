import { TicketType } from "@/app/types";
import PriorityBlock from "./PriorityBlock";
import DeleteBlock from "./DeleteBlock";
import ProgressBlock from "./ProgressBlock";
import StatusBlock from "./StatusBlock";

type Props = {
  ticket: TicketType;
};

const Card = ({ ticket }: Props) => {
  return (
    <div className="bg-card hover:bg-card-hover rounded-md shadow-lg p-3 mt-2 mb-4 flex flex-col">
      <div className="flex mb-3">
        <PriorityBlock />

        <div className="ml-auto">
          <DeleteBlock />
        </div>
      </div>

      <div>
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>

        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-sm my-1">{ticket.createdAt}</p>
            <ProgressBlock progress={ticket.progress} />
          </div>
          <div className="flex items-end ml-auto">
            <StatusBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
