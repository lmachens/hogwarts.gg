import {
  useSelectedNode,
  useSetSelectedNode,
} from '#/lib/hooks/use-selected-node';
import Image from 'next/image';
import Button from '../Button';
import SidebarSection from './SidebarSection';

export default function SelectedNode() {
  const { data: node } = useSelectedNode();
  const setSelectedNode = useSetSelectedNode();

  if (!node) {
    return <></>;
  }

  return (
    <SidebarSection
      title="Selected Node"
      tooltip="This node was selected on the map"
    >
      {node.type === 'kio' && (
        <Image
          className="block mx-auto overflow-hidden"
          src="/assets/UI_T_CollectionsCard_BackBorder.png"
          width="256"
          height="256"
          style={{
            backgroundImage: `url(/assets/lore/UI_T_${node.titleId}.png)`,
            backgroundSize: '246px 246px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          alt=""
        />
      )}
      {node.title && <p className="font-bold">{node.title}</p>}
      <p className="text-brand-400">{node.nodeType.title}</p>
      {node.description && (
        <p className="whitespace-normal text-sm">{node.description}</p>
      )}
      <p className="text-xs text-gray-400 truncate">{`X: ${node.x} Y: ${node.y} Z: ${node.z}`}</p>
      {process.env.NODE_ENV === 'development' && (
        <p className="text-xs text-gray-400 truncate">{node.id}</p>
      )}
      <Button size="xs" className="my-1" onClick={() => setSelectedNode(null)}>
        Clear
      </Button>
    </SidebarSection>
  );
}
