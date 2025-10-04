# 🕰️ Time Machine Playlist

A web application that lets you travel back in time musically by exploring the Billboard Hot 100 charts from any week in history. Discover what songs were popular on any given date and create nostalgic playlists from different decades.

**LIVE PROJECT**:https://musictimemachine.netlify.app/

## ✨ Features

- **Historical Billboard Data**: Access Billboard Hot 100 charts from 1958 to present
- **Time Travel Interface**: Simply select any date to see what was popular that week
- **Decade Themes**: Dynamic visual themes that change based on the selected time period
- **Song Information**: View detailed stats including peak position, weeks on chart, and chart movement
- **External Links**: Direct links to Spotify and YouTube for each song
- **Spotify Export**: Mock functionality to export playlists to Spotify (demo purposes)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🎨 Visual Themes

The app features decade-specific visual themes that automatically apply based on your selected date:

- **1950s-1960s**: Warm brown and sandy tones
- **1970s**: Vibrant orange, pink, and purple gradients
- **1980s**: Neon colors with animated grid patterns
- **1990s**: Modern teal gradient from black to light gray
- **2000s**: Silver, blue, and coral combinations
- **2010s-2020s**: Contemporary teal gradient design

## 🚀 Getting Started

### Prerequisites

- A modern web browser with JavaScript enabled
- Internet connection (for fetching Billboard data)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start exploring music history!

No build process or dependencies required - it's a pure client-side application.

## 📁 Project Structure

```
time-machine-playlist/
├── index.html          # Main HTML file
├── app.js             # React application logic
├── style.css          # Styling and theme definitions
└── README.md          # This file
```

## 🛠️ Technology Stack

- **Frontend**: React 18 (via CDN)
- **Styling**: Pure CSS with CSS custom properties
- **Build**: No build process - uses Babel Standalone for JSX compilation
- **Data Source**: Billboard Hot 100 data from GitHub API
- **Fonts**: Inter (Google Fonts) and FKGroteskNeue

## 📊 Data Source

This project uses the excellent [Billboard Hot 100 dataset](https://github.com/mhollingshead/billboard-hot-100) by mhollingshead, which provides historical Billboard chart data in JSON format.

**Data Coverage**: August 4, 1958 - Present

## 🎵 How It Works

1. **Select a Date**: Choose any date from August 4, 1958 onwards
2. **Fetch Data**: The app retrieves Billboard Hot 100 data for that week
3. **Display Results**: Songs are displayed in a responsive grid with rankings
4. **Explore**: Click on Spotify or YouTube links to listen to the songs
5. **Export**: Use the mock Spotify export feature (demo functionality)

## 🎨 Customization

### Themes

Decade themes are defined in `style.css` under the "Decade Themes" section. Each theme includes:

- Background gradients
- Song card styling
- Color schemes

### Adding New Themes

To add a new theme:

1. Define the theme class in CSS (e.g., `.app.theme-2030s`)
2. Update the `getDecade()` function in `app.js`
3. Add corresponding song card styles

## 🔧 Configuration

### Date Range

The application validates dates between:
- **Start**: August 4, 1958 (Billboard Hot 100 launch)
- **End**: Current date

### Default Date

The app loads with a default date of October 7, 2023. You can change this in the `useEffect` hook in `app.js`.

## 🌐 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📱 Mobile Support

The application is fully responsive and includes:
- Mobile-optimized layouts
- Touch-friendly interface
- Responsive typography
- Flexible grid systems

## 🚧 Known Limitations

- **Spotify Export**: Currently a mock implementation for demo purposes
- **Data Availability**: Some historical dates may not have complete data
- **External Links**: Spotify and YouTube links are search-based, not direct track links

## 🔮 Future Enhancements

- Real Spotify API integration
- Apple Music integration
- Playlist sharing functionality
- Advanced filtering options
- Chart comparison between different dates
- Artist and song statistics
- Social sharing features

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

1. **Bug Reports**: Open an issue describing the problem
2. **Feature Requests**: Suggest new features or improvements
3. **Code Contributions**: Submit pull requests with enhancements
4. **Documentation**: Help improve this README or add code comments

## 🙏 Acknowledgments

- [mhollingshead](https://github.com/mhollingshead) for the Billboard Hot 100 dataset
- Billboard for the original chart data
- React team for the excellent framework
- Google Fonts for the Inter typeface




