import { RulesList } from "@/components/user/rules-list"
import { AcademicCalendar } from "@/components/user/academic-calendar"
import { AlertTriangle, BookOpen, Calendar } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RulesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tata Tertib & Kalender</h1>
        <p className="text-muted-foreground mt-2">Peraturan peminjaman dan kalender akademik kampus</p>
      </div>

      <Alert>
        <BookOpen className="h-4 w-4" />
        <AlertTitle>Informasi Penting</AlertTitle>
        <AlertDescription>
          Harap membaca dan memahami semua peraturan sebelum melakukan peminjaman. Pelanggaran akan dikenakan sanksi
          sesuai ketentuan yang berlaku.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="rules" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Peraturan
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="h-4 w-4" />
            Kalender
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Peraturan Peminjaman</h2>
            <RulesList />
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Sanksi Pelanggaran</AlertTitle>
            <AlertDescription>
              Pelanggaran berulang dapat mengakibatkan suspend atau blacklist permanen dari sistem peminjaman. Pastikan
              untuk mengembalikan barang tepat waktu dan dalam kondisi baik.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Kalender Akademik</h2>
            <AcademicCalendar />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
