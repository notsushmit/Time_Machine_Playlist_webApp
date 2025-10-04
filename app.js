const { useState, useEffect, useCallback } = React;

// Main Time Machine Playlist App Component
function TimeMachinePlaylist() {
  const [selectedDate, setSelectedDate] = useState('');
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('');

  // Get decade from date for theming
  const getDecade = useCallback((dateString) => {
    const year = new Date(dateString).getFullYear();
    if (year >= 2020) return '2020s';
    if (year >= 2010) return '2010s';
    if (year >= 2000) return '2000s';
    if (year >= 1990) return '1990s';
    if (year >= 1980) return '1980s';
    if (year >= 1970) return '1970s';
    if (year >= 1960) return '1960s';
    return '1950s';
  }, []);

  // Fetch Billboard data from GitHub API
  const fetchBillboardData = useCallback(async (date) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/date/${date}.json`
      );

      if (!response.ok) {
        throw new Error('No Billboard data available for this date. Please try a different date.');
      }

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        throw new Error('No songs found for this date.');
      }

      setPlaylist(data);
      setCurrentTheme(`theme-${getDecade(date)}`);
    } catch (err) {
      setError(err.message);
      setPlaylist(null);
      setCurrentTheme('');
    } finally {
      setLoading(false);
    }
  }, [getDecade]);

  // Handle date input change with proper event handling
  const handleDateChange = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const value = e.target.value;
    console.log('Date changed to:', value); // Debug log
    setSelectedDate(value);
    setError(null); // Clear any previous errors when date changes
  }, []);

  // Handle form submission
  const handleDateSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Form submitted with date:', selectedDate); // Debug log

    if (!selectedDate || selectedDate.trim() === '') {
      setError('Please select a date.');
      return;
    }

    // Validate date range (Billboard started in 1958)
    const inputDate = new Date(selectedDate);
    const minDate = new Date('1958-08-04');
    const maxDate = new Date();

    if (isNaN(inputDate.getTime())) {
      setError('Please enter a valid date.');
      return;
    }

    if (inputDate < minDate) {
      setError('Please select a date after August 4, 1958 (when Billboard Hot 100 started).');
      return;
    }

    if (inputDate > maxDate) {
      setError('Please select a date that is not in the future.');
      return;
    }

    fetchBillboardData(selectedDate);
  }, [selectedDate, fetchBillboardData]);

  // Handle Spotify export (mock implementation)
  const handleSpotifyExport = useCallback(() => {
    setShowSpotifyModal(true);
  }, []);

  // Mock Spotify OAuth flow
  const handleSpotifyAuth = useCallback(() => {
    // Mock success for demo purposes
    setTimeout(() => {
      setShowSpotifyModal(false);
      alert(`Success! Playlist "Billboard Hot 100 - ${playlist.date}" would be created in your Spotify account with ${playlist.data.length} songs.`);
    }, 2000);
  }, [playlist]);

  // Generate mock Spotify URL (for demo purposes)
  const generateSpotifyUrl = useCallback((song, artist) => {
    const query = encodeURIComponent(`${song} ${artist}`);
    return `https://open.spotify.com/search/${query}`;
  }, []);

  // Generate mock YouTube URL (for demo purposes)
  const generateYouTubeUrl = useCallback((song, artist) => {
    const query = encodeURIComponent(`${song} ${artist} official`);
    return `https://www.youtube.com/results?search_query=${query}`;
  }, []);

  // Format date for display
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Set a default date on component mount for easier testing
  useEffect(() => {
    // Set to a known date with data (October 7, 2023)
    setSelectedDate('2023-10-07');
  }, []);

  return (
    <div className={`app ${currentTheme}`}>
      <div className="container">
        <header className="header">
          <h1 className="app-title">🕰️ Time Machine Playlist</h1>
          <p className="app-subtitle">
            Travel back in time musically - discover the Billboard Hot 100 from any week in history
          </p>
        </header>

        <div className="date-input-section">
          <form onSubmit={handleDateSubmit} className="date-form">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              onInput={handleDateChange}
              className="date-input"
              min="1958-08-04"
              max={new Date().toISOString().split('T')[0]}
            />
            <button
              type="submit"
              className="travel-btn"
              disabled={loading}
            >
              {loading ? 'Traveling...' : '🚀 Travel Back'}
            </button>
          </form>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching songs from the time machine...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-text">⚠️ {error}</p>
            <p>Try selecting a different date or check your internet connection.</p>
          </div>
        )}

        {playlist && !loading && (
          <div className="playlist-container">
            <div className="playlist-header">
              <h2 className="playlist-title">
                Billboard Hot 100
              </h2>
              <p className="playlist-date">
                Week of {formatDate(playlist.date)}
              </p>
              <button
                className="export-btn"
                onClick={handleSpotifyExport}
              >
                🎵 Export to Spotify
              </button>
            </div>

            <div className="songs-grid">
              {playlist.data.map((song, index) => (
                <div key={index} className="song-card">
                  <div className="song-rank">#{song.this_week}</div>

                  <h3 className="song-title">{song.song}</h3>
                  <p className="song-artist">{song.artist}</p>

                  <div className="song-stats">
                    <span>Peak: #{song.peak_position}</span>
                    <span>{song.weeks_on_chart} weeks on chart</span>
                    {song.last_week && (
                      <span>
                        {song.last_week > song.this_week ?
                          `↗️ +${song.last_week - song.this_week}` :
                          song.last_week < song.this_week ?
                            `↘️ -${song.this_week - song.last_week}` :
                            '➖ No change'
                        }
                      </span>
                    )}
                  </div>

                  <div className="song-links">
                    <a
                      href={generateSpotifyUrl(song.song, song.artist)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="song-link"
                    >
                      🎵 Spotify
                    </a>
                    <a
                      href={generateYouTubeUrl(song.song, song.artist)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="song-link"
                    >
                      📺 YouTube
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spotify OAuth Modal */}
        <div className={`modal ${showSpotifyModal ? '' : 'hidden'}`}>
          <div className="modal-content">
            <h3 className="modal-title">🎵 Export to Spotify</h3>
            <p className="modal-text">
              Connect your Spotify account to create a playlist with all {playlist?.data?.length || 0} songs
              from the Billboard Hot 100 chart for {playlist?.date ? formatDate(playlist.date) : 'this week'}.
            </p>
            <p className="modal-text">
              <small>
                This will create a new public playlist in your Spotify account titled
                "Billboard Hot 100 - {playlist?.date}".
              </small>
            </p>

            <div className="modal-buttons">
              <button
                className="modal-btn modal-btn--primary"
                onClick={handleSpotifyAuth}
              >
                🔐 Connect Spotify
              </button>
              <button
                className="modal-btn modal-btn--secondary"
                onClick={() => setShowSpotifyModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Initialize the React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TimeMachinePlaylist />);