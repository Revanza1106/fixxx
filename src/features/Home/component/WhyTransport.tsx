import { FaCheckCircle } from "react-icons/fa";
import truckImg from "../../../assets/trueck.jpg"; 

const WhyTransport: React.FC = () => {
  const items = [
    "Middle-mile strength with nationwide integration",
    "Scalable for bulk and project cargo",
    "API-first operations and real-time visibility",
    "Proven reliability from PCP Transport heritage",
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        
        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Why PCP Transport
          </h2>

          <ul className="space-y-3 mb-6">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 text-lg mt-0.5" />
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>

          <button className="bg-blue-900 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-800 transition">
            Talk to Sales
          </button>
        </div>

        <div className="flex-1">
          <img
            src={truckImg}
            alt="transport"
            className="w-full rounded-lg shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyTransport;
