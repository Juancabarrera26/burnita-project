import Header from "@/components/Header";
import CustomRequestForm from "@/components/CustomRequestForm";
import Footer from "@/components/Footer";

export default function SolicitudRecordatorios() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CustomRequestForm
          requestType="recordatorios"
          title="Velas para tus momentos especiales"
          subtitle="Cuéntanos cómo quieres tus recordatorios y los creamos para ti."
        />
      </main>
      <Footer />
    </div>
  );
}
