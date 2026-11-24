"use client";

import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { marked } from "marked";
import { Bold, CalendarClock, Eye, Heading2, Italic, Link2, List, Pencil, Quote, Save, Send } from "lucide-react";
import { savePublication } from "@/app/admin/actions";
import { CATEGORIES, PUBLICATION_TYPES, type Publication } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Field, Panel, btn, inputCls } from "./ui";

function toLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function Actions({ scheduled }: { scheduled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-2">
      <button name="intent" value="publish" disabled={pending} className={btn.primary}>
        <Send className="h-4 w-4" /> Publier maintenant
      </button>
      <button name="intent" value="draft" disabled={pending} className={btn.outline}>
        <Save className="h-4 w-4" /> Enregistrer le brouillon
      </button>
      <button name="intent" value="schedule" disabled={pending || !scheduled} className={btn.outline} title={scheduled ? "" : "Choisissez d'abord une date"}>
        <CalendarClock className="h-4 w-4" /> Programmer
      </button>
    </div>
  );
}

const TOOLS = [
  { icon: Heading2, label: "Intertitre", before: "\n## ", after: "" },
  { icon: Bold, label: "Gras", before: "**", after: "**" },
  { icon: Italic, label: "Italique", before: "*", after: "*" },
  { icon: Quote, label: "Citation", before: "\n> ", after: "" },
  { icon: List, label: "Liste", before: "\n- ", after: "" },
  { icon: Link2, label: "Lien", before: "[", after: "](https://)" },
];

export function PublicationForm({ pub }: { pub?: Publication }) {
  const [state, action] = useFormState(savePublication, {});
  const [content, setContent] = useState(pub?.content ?? "");
  const [preview, setPreview] = useState(false);
  const [cover, setCover] = useState(pub?.cover ?? "");
  const [publishAt, setPublishAt] = useState(toLocalInput(pub?.publishAt));
  const [seoTitle, setSeoTitle] = useState(pub?.seoTitle ?? "");
  const [seoDesc, setSeoDesc] = useState(pub?.seoDescription ?? "");
  const ta = useRef<HTMLTextAreaElement>(null);

  const wrap = (before: string, after: string) => {
    const el = ta.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const next = content.slice(0, s) + before + content.slice(s, e) + after + content.slice(e);
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, e + before.length);
    });
  };

  return (
    <form
      action={action}
      // Enter in a single-line field must not publish by accident.
      onKeyDown={(e) => {
        if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") e.preventDefault();
      }}
      className="grid gap-6 xl:grid-cols-[1fr_320px]"
    >
      <input type="hidden" name="id" value={pub?.id ?? ""} />
      <input type="hidden" name="content" value={content} />

      <div className="min-w-0 space-y-6">
        {state.error && (
          <p role="alert" className="rounded-sm border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {state.error}
          </p>
        )}
        <Panel>
          <div className="space-y-5">
            <Field label="Titre *">
              <input name="title" required defaultValue={pub?.title} className={cn(inputCls, "h-14 font-display text-2xl")} />
            </Field>
            <Field label="Résumé" hint="Deux ou trois phrases. Affiché dans les listes et sous le titre.">
              <textarea name="summary" rows={3} defaultValue={pub?.summary} className={cn(inputCls, "py-2")} />
            </Field>
          </div>
        </Panel>

        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <div className="flex flex-wrap gap-1" role="toolbar" aria-label="Mise en forme">
              {TOOLS.map(({ icon: Icon, label, before, after }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  title={label}
                  disabled={preview}
                  onClick={() => wrap(before, after)}
                  className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-sm hover:bg-muted disabled:opacity-40"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setPreview((v) => !v)} className="focus-ring inline-flex h-9 items-center gap-2 rounded-sm px-3 text-sm hover:bg-muted">
              {preview ? <Pencil className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {preview ? "Écrire" : "Aperçu"}
            </button>
          </div>
          {preview ? (
            <div className="prose-h min-h-[420px] py-6" dangerouslySetInnerHTML={{ __html: marked.parse(content || "*Rien à afficher.*") as string }} />
          ) : (
            <textarea
              ref={ta}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              aria-label="Contenu"
              placeholder={"Rédigez votre analyse ici.\n\n## Un intertitre\n\nUn paragraphe, **du gras**, *de l'italique*.\n\n> Une citation mise en valeur."}
              className="mt-3 block min-h-[420px] w-full resize-y bg-transparent font-mono text-sm leading-7 focus:outline-none"
            />
          )}
          <p className="border-t border-border pt-3 text-xs text-muted-foreground">
            {content.split(/\s+/).filter(Boolean).length} mots · Format Markdown : ## intertitre, **gras**, *italique*, &gt; citation, - liste.
          </p>
        </Panel>

        <Panel title="Référencement (SEO)">
          <div className="space-y-5">
            <Field label="Titre SEO" hint={`${seoTitle.length}/60 caractères recommandés. Laisser vide pour reprendre le titre.`}>
              <input name="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={cn(inputCls, "h-11")} />
            </Field>
            <Field label="Description SEO" hint={`${seoDesc.length}/160 caractères recommandés.`}>
              <textarea name="seoDescription" rows={2} value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} className={cn(inputCls, "py-2")} />
            </Field>
            <Field label="Adresse (slug)" hint="Généré automatiquement à partir du titre si vide.">
              <input name="slug" defaultValue={pub?.slug} className={cn(inputCls, "h-11 font-mono text-sm")} />
            </Field>
          </div>
        </Panel>
      </div>

      <div className="space-y-6 xl:sticky xl:top-8 xl:self-start">
        <Panel title="Publication">
          <Field label="Date de parution programmée" hint="Requis uniquement pour « Programmer ».">
            <input type="datetime-local" name="publishAt" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} className={cn(inputCls, "h-11")} />
          </Field>
          <div className="mt-5">
            <Actions scheduled={!!publishAt} />
          </div>
        </Panel>

        <Panel title="Classement">
          <div className="space-y-5">
            <Field label="Format">
              <select name="type" defaultValue={pub?.type ?? "analyse"} className={cn(inputCls, "h-11")}>
                {PUBLICATION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Catégorie">
              <select name="category" defaultValue={pub?.category ?? CATEGORIES[0]} className={cn(inputCls, "h-11")}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Mots-clés" hint="Séparés par des virgules.">
              <input name="tags" defaultValue={pub?.tags.join(", ")} className={cn(inputCls, "h-11")} />
            </Field>
          </div>
        </Panel>

        <Panel title="Image de couverture">
          {cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="mb-4 aspect-[3/2] w-full rounded-sm object-cover" />
          )}
          <Field label="Téléverser une image">
            <input
              type="file"
              name="coverFile"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setCover(URL.createObjectURL(f));
              }}
              className="mt-2 block w-full text-sm file:mr-3 file:h-9 file:rounded-sm file:border-0 file:bg-secondary file:px-3 file:text-sm"
            />
          </Field>
          <Field label="ou adresse de l'image" className="mt-4">
            <input name="cover" defaultValue={pub?.cover} onChange={(e) => setCover(e.target.value)} className={cn(inputCls, "h-11 text-sm")} placeholder="https://" />
          </Field>
        </Panel>

        <Panel title="Document PDF (optionnel)">
          {pub?.pdf && (
            <a href={pub.pdf} target="_blank" rel="noopener" className="mb-3 block truncate text-sm text-accent underline">
              PDF actuel
            </a>
          )}
          <input type="hidden" name="pdf" defaultValue={pub?.pdf} />
          <input type="file" name="pdfFile" accept="application/pdf" className="block w-full text-sm file:mr-3 file:h-9 file:rounded-sm file:border-0 file:bg-secondary file:px-3 file:text-sm" aria-label="Téléverser un PDF" />
        </Panel>

        <Panel title="Publié ailleurs (optionnel)">
          <Field label="Lien de l'article original">
            <input name="sourceUrl" type="url" defaultValue={pub?.sourceUrl} className={cn(inputCls, "h-11 text-sm")} placeholder="https://" />
          </Field>
          <Field label="Nom du site" className="mt-4">
            <input name="sourceName" defaultValue={pub?.sourceName} className={cn(inputCls, "h-11 text-sm")} placeholder="Infoguerre (École de Guerre Économique)" />
          </Field>
        </Panel>
      </div>
    </form>
  );
}
