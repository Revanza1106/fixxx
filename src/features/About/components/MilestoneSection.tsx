import TimelineItem from "./TimeLineItmes";
import img from "../../../assets/ware.jpg"

const MilestoneSection: React.FC = () => {
  const milestones = [
    {
      year: "1999",
      text: "PCP Transport founded – Domestic Transport & Parcel."
    },
    {
      year: "2010",
      text: "Digital Innovation – API, TRACK-ID, ePOD."
    },
    {
      year: "2020",
      text: "Network expansion to remote sub districts."
    },
    {
      year: "2026",
      text: "Launch of PCP Transport for trucking & Ocean Freight."
    }
  ];

  return (
    <section className="p-6 ">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Milestone</h2>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <TimelineItem 
            key={milestone.year} 
            year={milestone.year}
            text={milestone.text}
            isLast={index === milestones.length - 1}
          />
        ))}
      </div>

      <img 
        src={img}
        alt="Loading goods"
        className="mt-6"
      />
    </section>
  );
};

export default MilestoneSection;
