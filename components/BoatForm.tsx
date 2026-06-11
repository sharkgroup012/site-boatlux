"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase";
import type { Boat } from "@/lib/supabase";

type Props = {
  initialData?: Partial<Boat>;
  boatId?: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function BoatForm({ initialData, boatId }: Props) {
  const router = useRouter();
  const isEditing = !!boatId;

  const [form, setForm] = useState<Partial<Boat>>({
    name: "",
    slug: "",
    type: "lancha",
    brand: "",
    model: "",
    year: undefined,
    length: "",
    capacity: "",
    engine: "",
    power: "",
    max_speed: "",
    fuel: "gasolina",
    quota_price: undefined,
    quota_available: 0,
    location: "",
    description: "",
    images: [],
    available: true,
    featured: false,
    display_order: 0,
    active: true,
    ...initialData,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof Boat, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: isEditing ? prev.slug : slugify(name),
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const supabase = createSupabaseBrowser();
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${form.slug || "boat"}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("boats")
        .upload(path, file);

      if (!uploadError) {
        const { data } = supabase.storage.from("boats").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }
    }

    setForm((prev) => ({
      ...prev,
      images: [...(prev.images ?? []), ...newUrls],
    }));
    setUploading(false);
  }

  function removeImage(url: string) {
    setForm((prev) => ({
      ...prev,
      images: prev.images?.filter((i) => i !== url),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createSupabaseBrowser();
    const payload = { ...form, updated_at: new Date().toISOString() };

    let err;
    if (isEditing) {
      ({ error: err } = await supabase.from("boats").update(payload).eq("id", boatId));
    } else {
      ({ error: err } = await supabase.from("boats").insert(payload));
    }

    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }

    router.push("/admin/embarcacoes");
    router.refresh();
  }

  async function handleDelete() {
    if (!boatId) return;
    if (!confirm("Tem certeza que quer excluir esta embarcação?")) return;

    setDeleting(true);
    const supabase = createSupabaseBrowser();
    const { error: err } = await supabase.from("boats").delete().eq("id", boatId);

    if (err) {
      setError(err.message);
      setDeleting(false);
      return;
    }

    router.push("/admin/embarcacoes");
    router.refresh();
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-gray-600";
  const labelClass = "block text-xs text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Identificação */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Identificação</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Nome da embarcação *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className={inputClass}
              placeholder="Ex: Focker 330 Sport"
            />
          </div>
          <div>
            <label className={labelClass}>Slug (URL) *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              required
              className={inputClass}
              placeholder="focker-330-sport"
            />
          </div>
          <div>
            <label className={labelClass}>Tipo *</label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className={inputClass}
            >
              <option value="lancha">Lancha</option>
              <option value="jet">Jet Ski</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Marca</label>
            <input type="text" value={form.brand ?? ""} onChange={(e) => set("brand", e.target.value)} className={inputClass} placeholder="Ex: Focker" />
          </div>
          <div>
            <label className={labelClass}>Modelo</label>
            <input type="text" value={form.model ?? ""} onChange={(e) => set("model", e.target.value)} className={inputClass} placeholder="Ex: 330 Sport" />
          </div>
          <div>
            <label className={labelClass}>Ano</label>
            <input type="number" value={form.year ?? ""} onChange={(e) => set("year", Number(e.target.value))} className={inputClass} placeholder="2023" />
          </div>
          <div>
            <label className={labelClass}>Localização</label>
            <input type="text" value={form.location ?? ""} onChange={(e) => set("location", e.target.value)} className={inputClass} placeholder="Ex: Ubatuba, SP" />
          </div>
        </div>
      </section>

      {/* Especificações */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Especificações técnicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Comprimento</label>
            <input type="text" value={form.length ?? ""} onChange={(e) => set("length", e.target.value)} className={inputClass} placeholder="8,5m" />
          </div>
          <div>
            <label className={labelClass}>Capacidade</label>
            <input type="text" value={form.capacity ?? ""} onChange={(e) => set("capacity", e.target.value)} className={inputClass} placeholder="12 pessoas" />
          </div>
          <div>
            <label className={labelClass}>Motor</label>
            <input type="text" value={form.engine ?? ""} onChange={(e) => set("engine", e.target.value)} className={inputClass} placeholder="2x Mercury 300HP" />
          </div>
          <div>
            <label className={labelClass}>Potência</label>
            <input type="text" value={form.power ?? ""} onChange={(e) => set("power", e.target.value)} className={inputClass} placeholder="600HP" />
          </div>
          <div>
            <label className={labelClass}>Velocidade máxima</label>
            <input type="text" value={form.max_speed ?? ""} onChange={(e) => set("max_speed", e.target.value)} className={inputClass} placeholder="55 nós" />
          </div>
          <div>
            <label className={labelClass}>Combustível</label>
            <select value={form.fuel ?? "gasolina"} onChange={(e) => set("fuel", e.target.value)} className={inputClass}>
              <option value="gasolina">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="flex">Flex</option>
            </select>
          </div>
        </div>
      </section>

      {/* Comercial */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Comercial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Valor da cota (R$)</label>
            <input type="number" value={form.quota_price ?? ""} onChange={(e) => set("quota_price", Number(e.target.value))} className={inputClass} placeholder="85000" />
          </div>
          <div>
            <label className={labelClass}>Cotas disponíveis</label>
            <input type="number" value={form.quota_available ?? 0} onChange={(e) => set("quota_available", Number(e.target.value))} className={inputClass} placeholder="4" />
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.available ?? true} onChange={(e) => set("available", e.target.checked)} className="accent-yellow-500 w-4 h-4" />
              <span className="text-sm text-gray-300">Disponível para venda</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured ?? false} onChange={(e) => set("featured", e.target.checked)} className="accent-yellow-500 w-4 h-4" />
              <span className="text-sm text-gray-300">Destaque na home</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.active ?? true} onChange={(e) => set("active", e.target.checked)} className="accent-yellow-500 w-4 h-4" />
              <span className="text-sm text-gray-300">Ativo no site</span>
            </label>
          </div>
          <div>
            <label className={labelClass}>Ordem de exibição</label>
            <input type="number" value={form.display_order ?? 0} onChange={(e) => set("display_order", Number(e.target.value))} className={inputClass} placeholder="0" />
          </div>
        </div>
      </section>

      {/* Descrição */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Descrição</h2>
        <textarea
          value={form.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="Descreva a embarcação..."
        />
      </section>

      {/* Fotos */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Fotos</h2>

        {form.images && form.images.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
            {form.images.map((url, i) => (
              <div key={url} className="relative group aspect-video">
                <img src={url} alt={`foto ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                {i === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-yellow-500 text-gray-950 text-xs font-bold px-1.5 py-0.5 rounded">
                    Capa
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-400 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-gray-600 rounded-xl p-8 cursor-pointer transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
          <span className="text-gray-400 text-sm">
            {uploading ? "Enviando..." : "Clique para adicionar fotos"}
          </span>
          <span className="text-gray-600 text-xs mt-1">JPG, PNG, WebP — múltiplas permitidas</span>
        </label>
      </section>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 w-full sm:w-auto"
          >
            {deleting ? "Excluindo..." : "Excluir embarcação"}
          </button>
        )}
        <div className={`flex gap-3 ${!isEditing ? "sm:ml-auto" : ""}`}>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 sm:flex-none border border-gray-700 text-gray-400 hover:text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="flex-1 sm:flex-none bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-gray-950 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            {saving ? "Salvando..." : isEditing ? "Salvar alterações" : "Criar embarcação"}
          </button>
        </div>
      </div>
    </form>
  );
}
