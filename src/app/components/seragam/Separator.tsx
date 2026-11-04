/** Separator Seragam: garis 1px. Default #D9DBDD, subdued #C9CBCF. */
export function Separator({ subdued = false, className = '' }: { subdued?: boolean; className?: string }) {
  return <hr role="separator" className={`h-px w-full border-0 ${subdued ? 'bg-sd-modal-border' : 'bg-sd-modal-footer-border'} ${className}`} />;
}
