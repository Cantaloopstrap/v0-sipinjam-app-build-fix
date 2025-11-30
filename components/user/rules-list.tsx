import { AlertCircle, Clock, UserCheck, Shield, XCircle, AlertTriangle } from "lucide-react"
import { mockRules } from "@/lib/mock-data"

const ruleIcons = [Clock, UserCheck, AlertCircle, Shield, XCircle, AlertTriangle]

export function RulesList() {
  return (
    <div className="space-y-4">
      {mockRules.map((rule, index) => {
        const Icon = ruleIcons[index] || AlertCircle
        return (
          <div key={rule.id} className="rounded-lg border bg-card p-6 transition-all hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 shrink-0">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {rule.id}
                  </span>
                  <h3 className="text-lg font-semibold">{rule.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{rule.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
