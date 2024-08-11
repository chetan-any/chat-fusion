import cn from "@/utils/cn";
import { Button } from "@nextui-org/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  provider?: `google` | `github`;
  className?: string;
  startContent?: React.ReactNode;
}

export default function SubmitButton({
  children,
  provider,
  className,
  startContent,
}: SubmitButtonProps) {
  return (
    <Button
      type={`submit`}
      variant={`shadow`}
      size={`lg`}
      radius={`sm`}
      startContent={startContent}
      name={`action`}
      value={provider}
      className={cn(
        `bg-zinc-900 font-semibold text-white dark:bg-zinc-100 dark:text-black`,
        className,
      )}
    >
      {children}
    </Button>
  );
}
