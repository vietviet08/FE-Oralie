import Spinner from "@/components/icons/spiner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full text-ui-fg-base">
      <Spinner size={36} />
    </div>
  );
}
