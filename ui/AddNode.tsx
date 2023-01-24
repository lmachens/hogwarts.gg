'use client';

import { getNodeType, nodeTypes } from '#/lib/node-types';
import supabase from '#/lib/supabase-browser';
import { nodeSchema } from '#/lib/validations/node';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconMapPin } from '@tabler/icons';
import type { LatLngExpression } from 'leaflet';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type z from 'zod';
import Button from './Button';
import Drawer from './Drawer';
import Input from './Input';
import { useMap } from './Map';
import Marker from './Marker';
import Select from './Select';
import Stack from './Stack';
import Textarea from './Textarea';

type FormData = z.infer<typeof nodeSchema>;

const AddNode = () => {
  return (
    <Drawer
      title="Add Node"
      tooltip="Add Node"
      trigger={
        <button>
          <IconMapPin />
        </button>
      }
    >
      <NodeForm />
    </Drawer>
  );
};

export default AddNode;

const NodeForm = () => {
  const map = useMap();
  const { register, reset, control, handleSubmit, watch, setError } =
    useForm<FormData>({
      resolver: zodResolver(nodeSchema),
      defaultValues: {
        title: '',
        description: '',
        type: '',
        coordinates: [map.getCenter().lat, map.getCenter().lng],
      },
    });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const { error } = await supabase.from('nodes').insert(data);
    setIsLoading(false);
    if (error) {
      setError('title', { message: error.message });
    } else {
      reset();
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Input
          autoFocus
          label="Title"
          placeholder="A node needs a title"
          required
          {...register('title')}
        />

        <Controller
          name="coordinates"
          control={control}
          render={({ field }) => (
            <>
              <Input
                label="Coordinates"
                description="Move the marker to change the coordinates"
                value={field.value.toString()}
                required
                disabled
              />
              <Marker
                src={
                  getNodeType(watch('type'))?.icon ??
                  'https://aeternum-map.gg/unknown.webp'
                }
                latLng={field.value as LatLngExpression}
                draggable
                title={watch('title')}
                onLatLngChange={field.onChange}
              />
            </>
          )}
        />

        <Select
          label="Type"
          options={nodeTypes}
          required
          {...register('type')}
        />
        <Textarea
          label="Description"
          description="Additional information about this node"
          {...register('description')}
        />
        <Button type="submit" kind="brand" disabled={isLoading}>
          Save
        </Button>
      </Stack>
    </form>
  );
};
