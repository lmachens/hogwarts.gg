import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ReactNode } from 'react';
import Tooltip from './Tooltip';

type PopoverProps = {
  trigger: ReactNode;
  tooltip?: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function Popover({
  trigger,
  tooltip,
  children,
  open,
  onOpenChange,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {tooltip ? (
        <Tooltip label={tooltip}>
          <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
        </Tooltip>
      ) : (
        <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      )}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="rounded bg-gray-1100 border border-gray-800  data-open:animate-fadeIn data-closed:animate-fadeOut"
          sideOffset={5}
          collisionPadding={8}
        >
          {children}
          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
