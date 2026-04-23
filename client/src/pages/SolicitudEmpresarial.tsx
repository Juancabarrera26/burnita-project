
import CustomRequestForm from "@/components/CustomRequestForm";
import Footer from "@/components/Footer";

export default function SolicitudEmpresarial() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <CustomRequestForm
          requestType="empresarial"
          title="Velas personalizadas para tu marca"
          subtitle="Creamos velas únicas con tu identidad empresarial."
        />
      </main>
      <Footer />
    </div>
  );
}
