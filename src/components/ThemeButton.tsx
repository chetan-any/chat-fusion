import cn from "@/utils/cn";
import { Button } from "@nextui-org/button";
import { ButtonHTMLAttributes } from "react";

interface ThemeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onPress: () => void;
  className?: string;
}

export default function ThemeButton({
  children,
  onPress,
  className,
}: ThemeButtonProps) {
  return (
    <Button
      isIconOnly
      variant={`bordered`}
      radius={`sm`}
      onPress={onPress}
      className={cn(className)}
    >
      {children}
    </Button>
  );
}
