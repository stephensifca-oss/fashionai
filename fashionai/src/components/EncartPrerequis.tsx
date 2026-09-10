export default function EncartPrerequis({ requiredTool, isPaid, costNote }: { requiredTool: string, isPaid: boolean, costNote: string }) {
  return (
    <div className="bg-surface border border-ink p-stack-md reveal-up" style={{ animationDelay: "200ms" }}>
      <div className="font-utility-label text-utility-label uppercase text-ink mb-stack-sm border-b border-rule pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-[14px]">info</span>
        PRÉREQUIS
      </div>
      <p className="font-body-sm text-body-sm text-ink-soft uppercase tracking-wide">
        CE DONT VOUS AVEZ BESOIN :<br/><br/>
        — {requiredTool} {isPaid && `(${costNote})`}<br/>
        — Images sources HD<br/>
        — Connaissances basiques en montage
      </p>
    </div>
  );
}
