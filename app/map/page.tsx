import AddNode from '#/ui/AddNode';
import FixedBox from '#/ui/FixedBox';
import Login from '#/ui/Login';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('#/ui/ExampleMap'), { ssr: false });

export default function Page() {
  return (
    <div className="h-screen w-screen fixed inset-0 pt-14">
      <Map>
        <FixedBox className="right-6 top-6 flex space-x-4">
          <AddNode />
          <Login />
        </FixedBox>
      </Map>
    </div>
  );
}
