import cn from "@utils/cn";

interface MainContainerProps extends ChildrenType {}

export default function MainContainer({
  children,
  className,
}: MainContainerProps) {
  return <main className={cn(`py-4`, className)}>{children}</main>;
}
