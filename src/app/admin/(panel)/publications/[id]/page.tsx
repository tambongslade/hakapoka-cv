import { notFound } from "next/navigation";
import { readDb } from "@/lib/store";
import { PublicationForm } from "@/components/admin/publication-form";
import { AdminHeader } from "@/components/admin/ui";

export default async function EditPublication({ params }: { params: { id: string } }) {
  const pub = (await readDb()).publications.find((p) => p.id === params.id);
  if (!pub) notFound();
  return (
    <div className="space-y-6">
      <AdminHeader title="Modifier la publication" lead={pub.title} />
      <PublicationForm pub={pub} />
    </div>
  );
}
