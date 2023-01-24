import { getNodeType } from '#/lib/node-types';
import createClient from '#/lib/supabase-server';
import AddNode from '#/ui/AddNode';
import FixedBox from '#/ui/FixedBox';
import Marker from '#/ui/Marker';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('#/ui/ExampleMap'), { ssr: false });

export default async function Page() {
  const supabase = createClient();

  const result = await supabase.from('nodes').select();
  const nodes = result.data ?? [];

  return (
    <div className="h-full-height w-screen fixed inset-0 top-14">
      <Map>
        <FixedBox className="right-4 top-20 flex space-x-4">
          <AddNode />
        </FixedBox>
        {nodes.map((node) => (
          <Marker
            key={node.id}
            src={getNodeType(node.type)!.icon}
            latLng={node.coordinates as [number, number]}
          />
        ))}
      </Map>
    </div>
  );
}
