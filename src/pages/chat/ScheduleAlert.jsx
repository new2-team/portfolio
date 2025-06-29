import { useState } from 'react';

const ScheduleAlert = () => {
  const [activeTab, setActiveTab] = useState('schedule');

  const schedules = [
    { id: 1, title: 'Taking a walk by the Han River' },
    { id: 2, title: "Soul's birthday party" },
  ];

  const images = [
    { id: 1, src: '/assets/img/chat/soul.png', alt: 'soul' },
    { id: 2, src: '/assets/img/chat/choco.png', alt: 'choco' },
    { id: 3, src: '/assets/img/chat/jude.png', alt: 'jude' },
  ];

  return (
    <div className="schedule-alert">
      <div className="profile-section">
        <img src="/assets/img/chat/soul.png" alt="Soul" className="profile-avatar" />
        <div className="profile-name">Soul</div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'schedule' ? 'active' : ''}
          onClick={() => setActiveTab('schedule')}
        >
          일정
        </button>
        <button
          className={activeTab === 'images' ? 'active' : ''}
          onClick={() => setActiveTab('images')}
        >
          이미지
        </button>
      </div>

      {activeTab === 'schedule' ? (
        <div className="schedule-list">
          {schedules.map(s => (
            <div key={s.id} className="schedule-item">
              <span>✅</span> {s.title}
            </div>
          ))}
        </div>
      ) : (
        <div className="image-gallery">
          {images.map(img => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt}
              className="gallery-img"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleAlert;
