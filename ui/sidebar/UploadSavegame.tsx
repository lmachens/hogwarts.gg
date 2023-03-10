import { IconCloudUpload } from '@tabler/icons-react';
import Script from 'next/script';

export default function UploadSavegame({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) {
  return (
    <label
      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-gray-900 hover:bg-gray-700"
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
          onUpload(event.dataTransfer.files[0]);
        }
      }}
    >
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js" />
      <div className="flex flex-col gap-2 items-center justify-center pt-5 pb-6">
        <IconCloudUpload size={40} />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        accept=".sav"
        onChange={(event) => {
          if (event.target.files?.[0]) {
            onUpload(event.target.files[0]);
          }
        }}
      />
    </label>
  );
}
