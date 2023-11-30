import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

const EventCard = ({ member }) => {
  const { name, dateOfBirth, remainingDays, img } = member;

  return (
    <div className="event-card">
      <img className="w-56" src={img} alt={name} />
      <p>Name: {name}</p>
      <p>Date of Birth: {dateOfBirth}</p>
      {remainingDays >= 0 ? (
        <p>Remaining Days: {remainingDays}</p>
      ) : (
        <p>Birthday has passed</p>
      )}
    </div>
  );
};

const TeamMemberCard = ({ member }) => {
  const { name, image, role, img, dateOfBirth } = member;

  return (
    <div>
      <div className="flex gap-2 py-2 team-member-card">
        <div>
          <img className="rounded-xl w-44" src={img} alt={name} />
        </div>
        <div>
          <p className="text-green-600">Name: {name}</p>
          <p className="text-green-600">Date of Birth: {dateOfBirth}</p>
          <p className="text-green-600">Role: {role}</p>
          <p className="text-green-600">
            Member Type: {role === "admin" ? "Admin" : "Normal Employee"}
          </p>
        </div>
      </div>
    </div>
  );
};
const Team = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("https://asset-management-system-server-xi.vercel.app/users")
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const calculateRemainingDays = (dateOfBirth) => {
    const today = new Date();
    const birthday = new Date(dateOfBirth);
    birthday.setFullYear(today.getFullYear());

    const diffTime = birthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const upcomingEvents = members
    .filter((member) => {
      const remainingDays = calculateRemainingDays(member.dateOfBirth);
      return remainingDays >= -30 && remainingDays <= 30;
    })
    .map((member) => (
      <EventCard
        key={member._id}
        member={{
          ...member,
          remainingDays: calculateRemainingDays(member.dateOfBirth),
        }}
      />
    ));

  const teamMembers = members.map((member) => (
    <TeamMemberCard key={member._id} member={member} />
  ));

  return (
    <div>
      <Helmet>
        <title>Employee || MyTeam</title>
      </Helmet>
      <div className=" mb-10">
        <div className="app px-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold py-2 text-orange-700">
                Upcoming Events
              </h2>
              <div className="event-container">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents
                ) : (
                  <p>No upcoming events</p>
                )}
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold py-2 text-orange-700">
                Team Member List
              </h2>
              <div className="team-member-container">
                {teamMembers.length > 0 ? teamMembers : <p>No team members</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
