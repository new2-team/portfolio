
const ScheduleAlert = () => {
  const schedules = [
    { id: 1, title: 'Taking a walk by the Han River' },
    { id: 2, title: "Soul's birthday party" },
  ];

  return (
    <div className="schedule-alert">
      <div className="profile-section">
        <img src="/dog1.jpg" alt="Soul" className="profile-avatar" />
        <div className="profile-name">Soul</div>
      </div>
      <div className="tabs">
        <button className="active">schedule</button>
        <button>images</button>
      </div>
      <div className="schedule-list">
        {schedules.map(s => (
          <div key={s.id} className="schedule-item">
            <span>✅</span> {s.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleAlert;
