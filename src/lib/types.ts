export interface DayEvent {
  title: string;
  time: string;
  isOptional?: boolean;
}

export interface DayBlock {
  day: string;
  date: string;
  events: DayEvent[];
  color?: string;
  specialGuest: {
    enabled: boolean;
    text: string;
    shape: 'circle' | 'square' | 'triangle';
    color: string;
  };
}

export interface FlierConfig {
  title: string;
  subtitle: string;
  days: DayBlock[];
  rightPanel: {
    backgroundImage: string;
    hashtags: { text: string; color: string }[];
    inspirationalQuotes: string[];
  };
  progress: {
    current: number;
    goal: number;
    label: string;
    color: string;
  };
  dimensions: {
    width: string;
    height: string;
  };
  headerColor: string;
}

export const defaultFlierConfig: FlierConfig = {
  title: "WEEKLY SCHEDULE!",
  subtitle: "UNITED VISIONARY",
  headerColor: "#1e293b",
  days: [
    {
      day: "MONDAY",
      date: "2/24",
      events: [
        {
          title: "POWER HOUR",
          time: "8:00PM",
          isOptional: true
        }
      ],
      specialGuest: {
        enabled: false,
        text: '',
        shape: 'circle',
        color: '#3b82f6'
      }
    },
    {
      day: "TUESDAY",
      date: "2/25",
      events: [
        {
          title: "BRAINSTORM SESH",
          time: "7:00PM",
          isOptional: false
        },
        {
          title: "GAME NIGHT",
          time: "9:00PM",
          isOptional: false
        }
      ],
      specialGuest: {
        enabled: true,
        text: "FEATURING @JOHN DOE",
        shape: "square",
        color: "#f97316"
      }
    },
    {
      day: "WEDNESDAY",
      date: "2/26",
      events: [
        {
          title: "WISDOM WEDNESDAY",
          time: "8:00PM",
          isOptional: false
        }
      ],
      specialGuest: {
        enabled: true,
        text: "WITH @JANE SMITH",
        shape: "triangle",
        color: "#a855f7"
      }
    },
    {
      day: "THURSDAY",
      date: "2/27",
      events: [
        {
          title: "DEEP DIVE",
          time: "7:30PM",
          isOptional: false
        }
      ],
      specialGuest: {
        enabled: false,
        text: "",
        shape: "circle",
        color: "#ec4899"
      }
    },
    {
      day: "FRIDAY",
      date: "2/28",
      events: [
        {
          title: "CELEBRATE WINS",
          time: "8:30PM",
          isOptional: false
        }
      ],
      specialGuest: {
        enabled: false,
        text: "",
        shape: "circle",
        color: "#14b8a6"
      }
    },
    {
      day: "SATURDAY",
      date: "2/29",
      events: [
        {
          title: "WEEKEND VIBES",
          time: "ALL DAY",
          isOptional: false
        }
      ],
      specialGuest: {
        enabled: false,
        text: "",
        shape: "circle",
        color: "#f59e0b"
      }
    },
    {
      day: "SUNDAY",
      date: "3/1",
      events: [
        {
          title: "REST & RESET",
          time: "ALL DAY",
          isOptional: false
        }
      ],
      specialGuest: {
        enabled: false,
        text: "",
        shape: "circle",
        color: "#3b82f6"
      }
    }
  ],
  rightPanel: {
    backgroundImage: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=2610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hashtags: [
      { text: "#MARCH 3", color: "#FFFFFF" },
      { text: "LAUNCH", color: "#FFC107" },
      { text: "#BELIEVE", color: "#FFFFFF" },
      { text: "#RETAIL!", color: "#FFC107" },
      { text: "#LOVE", color: "#FFFFFF" },
      { text: "YOU", color: "#FFC107" },
      { text: "7500", color: "#FFFFFF" }
    ],
    inspirationalQuotes: []
  },
  progress: {
    current: 500,
    goal: 2500,
    label: "500/2500",
    color: "#3b82f6"
  },
  dimensions: {
    width: "8in",
    height: "10in"
  }
}; 