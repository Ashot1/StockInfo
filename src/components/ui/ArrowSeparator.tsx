import { ChevronUpIcon } from "@radix-ui/react-icons";

export default function ArrowSeparator() {
  return (
    <div className="w-full grid place-items-center my-10 animate-bounce">
      <ChevronUpIcon className="rotate-180 size-7" />
    </div>
  );
}
