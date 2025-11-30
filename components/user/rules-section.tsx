import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { mockRules } from "@/lib/mock-data"
import { AlertCircle } from "lucide-react"

export function RulesSection() {
  return (
    <section className="rounded-xl border bg-card p-6 md:p-8">
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Tata Tertib Peminjaman</h2>
          <p className="text-muted-foreground mt-1">Peraturan yang harus dipatuhi saat melakukan peminjaman</p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {mockRules.map((rule) => (
          <AccordionItem key={rule.id} value={`rule-${rule.id}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {rule.id}
                </span>
                <span className="font-semibold">{rule.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-11 pr-4 text-muted-foreground leading-relaxed">
              {rule.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
