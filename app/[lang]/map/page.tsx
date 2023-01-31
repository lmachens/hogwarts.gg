import { getNodes } from '#/lib/nodes';
import AddNode from '#/ui/AddNode';
import FixedBox from '#/ui/FixedBox';
import Nodes from '#/ui/Nodes';
import SWRFallback from '#/ui/SWRFallback';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('#/ui/ExampleMap'), { ssr: false });

export default async function Page() {
  const nodes = await getNodes();
  return (
    <div className="h-full-height w-screen fixed inset-0 top-14">
      <Map>
        <FixedBox className="right-4 top-20 flex space-x-4">
          <AddNode />
        </FixedBox>
        <SWRFallback fallback={{ nodes }}>
          <Nodes />
        </SWRFallback>
      </Map>
    </div>
  );
}
