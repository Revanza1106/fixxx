import MilestoneSection from "./components/MilestoneSection";
import ImpectNumbers from "./components/ImpectNumbers";
import CTASection from "../../shared/components/CTASection";
import warehouseImg from "../../assets/ware.jpg"; 
import Leadership from "./components/Leadership";

const AboutSection: React.FC = () => {
  return (
      <section className="p-6 pt-5 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold text-[#000053] mb-2">
        PROFIL PERUSAHAAN (ABOUT US)
      </h2>

      <p className="text-[#000053] mb-6">
        We leverage decades of parcel expertise and a <strong>100+ branch network</strong> to deliver 
        reliable <strong>trucking</strong> and <strong>ocean freight</strong>. 
        A single contract, unified visibility, and accountable POD.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start mb-8">
        <div className="md:col-span-3 border-2 border-[#000053] rounded-lg p-6">
          <p className="text-sm font-semibold text-[#000053] mb-1">1999 → Today</p>
          <h3 className="font-bold text-[#000053] text-lg mb-3">
            PCP Transport Heritage, PCP Transport Momentum
          </h3>
          <p className="text-[#000053] leading-relaxed text-sm">
            <strong>PCP Transport</strong> is an expanded service offering from PCP Transport, 
            a logistics company established in Indonesia in <strong>1999</strong>. Starting with
            document and small-parcel delivery services, the company has grown into a 
            national distribution solutions provider for both <strong>B2B</strong> and <strong>B2C</strong> segments. 
            In <strong>2024–2025</strong>, PCP expanded its services into trucking, cargo, and ocean freight 
            through the <strong>PCP Transport</strong> brand to support large-scale 
            shipments for corporate customers.
          </p>
        </div>

        <div className="md:col-span-3">
          <img 
            src={warehouseImg} 
            alt="Warehouse operations" 
            className="rounded-lg shadow-lg w-[70%] h-full object-cover"
          />
        </div>
      </div>
      <Leadership />

      <MilestoneSection />
      <ImpectNumbers />
      <CTASection />
    </section>
  );
};

export default AboutSection;