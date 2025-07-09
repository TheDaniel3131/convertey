// app/page.tsx or app/some-page/page.tsx
import dynamic from "next/dynamic";

// Dynamically import client-only component
const DropboxUploader = dynamic(
  () => import("@/components/test/TestDropBoxUploader")
);

export default function Page() {
  return (
    <main className="p-8">
      <h1>Upload Page</h1>
      <DropboxUploader />
    </main>
  );
}
