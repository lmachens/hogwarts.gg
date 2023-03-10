import { IconHelp } from '@tabler/icons-react';
import Tooltip from '../Tooltip';

export default function SidebarSection({
  title,
  tooltip,
  children,
}: {
  title: string;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-800 rounded p-2">
      <Tooltip label={<p className="text-sm">{tooltip}</p>}>
        <h4 className="text-md flex gap-1 items-center">
          {title} <IconHelp size={16} />
        </h4>
      </Tooltip>
      {children}
    </section>
  );
}
