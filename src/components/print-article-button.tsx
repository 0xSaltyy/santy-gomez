"use client";

import { Printer } from "lucide-react";

export function PrintArticleButton() {
  return (
    <button type="button" className="button-secondary print:hidden" onClick={() => window.print()}>
      <Printer className="h-4 w-4" aria-hidden="true" />
      Print / Download PDF
    </button>
  );
}
