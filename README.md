# Weekly Calendar Template Modifier

A React application that allows users to create and customize weekly calendar flyers with a simple interface.

## Features

- **Split Panel Layout**: 60/40 left-right split panel with editor and live preview
- **Day Customization**: Edit day names, dates, and add multiple events
- **Special Features**: Add "Special Guest" callouts with customizable shapes and colors
- **Optional Days**: Mark days as optional with a visual indicator
- **Right Panel Customization**: Set background image and add hashtags/inspirational quotes
- **Progress Tracking**: Configurable progress bar with celebratory effects when goals are reached
- **Export to PNG**: Export your calendar design as a high-quality PNG image

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/weekly-calendar-template.git
cd weekly-calendar-template
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Usage

1. Use the editor panel (left side) to customize your calendar:

   - General: Set title and subtitle
   - Days: Customize days, dates, events, and special indicators
   - Right Panel: Set background image and hashtags
   - Progress: Configure the progress bar

2. View real-time changes in the preview panel (right side)

3. Click the "Export" button to download your calendar as a PNG image

## Technologies Used

- React
- TypeScript
- Vite
- shadcn/ui components
- TailwindCSS
- html-to-image (for PNG export)
- canvas-confetti (for celebration effects)

## License

MIT

## Acknowledgments

- shadcn/ui for the wonderful component library
- TailwindCSS for the utility-first CSS framework
