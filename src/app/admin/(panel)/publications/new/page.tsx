import { PublicationForm } from "@/components/admin/publication-form";
import { AdminHeader } from "@/components/admin/ui";

export default function NewPublication() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Nouvelle publication" lead="Rédigez, enregistrez en brouillon, publiez ou programmez." />
      <PublicationForm />
    </div>
  );
}
