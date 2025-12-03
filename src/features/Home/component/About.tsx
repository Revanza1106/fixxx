import img from '../../../assets/chart.png';

export default function AboutTransport() {
  const stats = [
    {
      title: "Branches",
      value: "190+",
      desc: "Nationwide",
      icon: "📍",
    },
    {
      title: "Sub-District",
      value: "6,980",
      desc: "Including remote areas",
      icon: "📦",
    },
    {
      title: "Employees",
      value: "1,120",
      desc: "Local Expertise",
      icon: "👥",
    },
    {
      title: "Corporate clients",
      value: "770+",
      desc: "Across Key Sectors",
      icon: "🏢",
    },
  ];

  return (
    <section className="w-full bg-[#F5F8FF] py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#001F54]">
            From PCP Transport to PCP Transport
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Since 1999, PCP Transport has built trust in Transport, courier, and
            parcel distribution. PCP Transport is our new growth engine
            expanding into trucking, inland freight, and ocean freight to move
            Indonesia’s industries.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {stats.map((item, i) => (
              <div
                key={i}
                className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="text-xl font-bold mt-2 text-[#001F54]">
                  {item.value}
                </h3>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <img
            src={img}
            alt="Chart"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
