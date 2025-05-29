// EventItem.tsx
import React from 'react';
import { CalendarEvent } from './EventApiClient';

type EventItemProps = {
  event: CalendarEvent;
  onBadgeClick: (badge: string) => void;
};

const EventItem: React.FC<EventItemProps> = ({ event, onBadgeClick }) => (
  <li>
    <h3>{event.title}</h3>

    {event.imageUrl && (
      <img
        src={event.imageUrl}
        alt={event.imageText || event.title || 'Event image'}
        style={{ maxWidth: '300px', display: 'block', marginBottom: '0.5em' }}
      />
    )}

    <div><b>Location:</b> {event.location || 'N/A'}</div>
    <div><b>Start:</b> {event.startTime.toLocaleString()}</div>
    <div><b>End:</b> {event.endTime.toLocaleString()}</div>

    <div>
      <b>Audience:</b>{' '}
      {event.audience ? (
        event.audience.split(',').map(aud => {
          const badge = aud.trim();
          return (
            <span
              key={badge}
              style={{
                display: 'inline-block',
                background: 'lightgray',
                borderRadius: '12px',
                padding: '0.2em 0.8em',
                marginRight: '0.5em',
                fontSize: '0.95em',
                cursor: 'pointer',
              }}
              onClick={() => onBadgeClick(badge)}
            >
              {badge}
            </span>
          );
        })
      ) : (
        <span style={{ color: '#777' }}>N/A</span>
      )}
    </div>

    <div><b>Language:</b> {event.language || 'N/A'}</div>
  </li>
);

export default EventItem;