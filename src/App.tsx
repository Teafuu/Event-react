import React, { useEffect, useState } from 'react';
import { ApiClient, CalendarEvent, Language } from './EventApiClient';
import EventItem from './EventItem';

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState<Language>(Language.All);
  const [campus, setCampus] = useState('');
  const [audience, setAudience] = useState('');
  const [count, setCount] = useState<number>();

  const api = new ApiClient('https://localhost:7060');

  const handleSearch = async (
    e?: React.FormEvent,
    forcedAudience?: string
  ) => {
    if (e) e.preventDefault();
    setError(null);

    try {
      const fetchedEvents = await api.getEvents({
        language,
        campus,
        audience: forcedAudience ?? audience,
        count,
      });
      setEvents(fetchedEvents);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleBadgeClick = (val: string) => {
    setAudience(val);
    handleSearch(undefined, val);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '1em' }}>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as Language)}
        >
          {Object.values(Language).map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <input
          type="text"
          value={campus}
          onChange={e => setCampus(e.target.value)}
          placeholder="Campus"
        />

        <input
          type="text"
          value={audience}
          onChange={e => setAudience(e.target.value)}
          placeholder="Audience"
        />

        <input
          type="number"
          value={count}
          onChange={e =>
            setCount(e.target.value === '' ? undefined : Number(e.target.value))
          }
          placeholder="Count"
        />

        <button type="submit" style={{ marginLeft: '1em' }}>Search</button>
      </form>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map(event => (
          <EventItem
            key={event.id}
            event={event}
            onBadgeClick={handleBadgeClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;