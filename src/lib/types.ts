export interface DayEvent {
  title: string;
  time: string;
}

export interface DayBlock {
  day: string;
  date: string;
  events: DayEvent[];
  isOptional: boolean;
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
    hashtags: string[];
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
}

export const defaultFlierConfig: FlierConfig = {
  title: "WEEKLY SCHEDULE!",
  subtitle: "UNITED VISIONARY",
  days: [
    {
      day: "MONDAY",
      date: "2/24",
      events: [
        {
          title: "POWER HOUR",
          time: "8:00PM"
        }
      ],
      isOptional: true,
      specialGuest: {
        enabled: false,
        text: "SPECIAL GUESTS",
        shape: "circle",
        color: "#8cb3ff"
      }
    },
    {
      day: "TUESDAY",
      date: "2/25",
      events: [
        {
          title: "JESSICA TEAM VISIT NORCAL",
          time: ""
        },
        {
          title: "MAIKA BOARD PLAN",
          time: "6:30PM"
        }
      ],
      isOptional: false,
      specialGuest: {
        enabled: true,
        text: "SPECIAL GUESTS",
        shape: "circle",
        color: "#8cb3ff"
      }
    },
    {
      day: "WEDNESDAY",
      date: "2/26",
      events: [
        {
          title: "MISA DO VISIT NORCAL",
          time: "8:00PM"
        }
      ],
      isOptional: false,
      specialGuest: {
        enabled: true,
        text: "SPECIAL GUESTS",
        shape: "circle",
        color: "#8cb3ff"
      }
    },
    {
      day: "THURSDAY",
      date: "2/27",
      events: [
        {
          title: "FUNCTION PREPARATION",
          time: "6PM-10PM"
        },
        {
          title: "Please Come Help When you can!",
          time: ""
        }
      ],
      isOptional: false,
      specialGuest: {
        enabled: false,
        text: "",
        shape: "circle",
        color: "#8cb3ff"
      }
    },
    {
      day: "FRIDAY",
      date: "2/28",
      events: [
        {
          title: "FUNCTION",
          time: "ALL DAY"
        }
      ],
      isOptional: false,
      specialGuest: {
        enabled: false,
        text: "",
        shape: "circle",
        color: "#8cb3ff"
      }
    },
    {
      day: "SATURDAY",
      date: "2/29",
      events: [
        {
          title: "FUNCTION",
          time: "ALL DAY"
        }
      ],
      isOptional: false,
      specialGuest: {
        enabled: false,
        text: "",
        shape: "circle",
        color: "#8cb3ff"
      }
    },
    {
      day: "SUNDAY",
      date: "2/30",
      events: [
        {
          title: "FUNCTION",
          time: "ALL DAY"
        }
      ],
      isOptional: false,
      specialGuest: {
        enabled: false,
        text: "",
        shape: "circle",
        color: "#8cb3ff"
      }
    }
  ],
  rightPanel: {
    backgroundImage: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=2342&auto=format&fit=crop",
    hashtags: [
      "#MARCH 3",
      "LAUNCH",
      "#BELIEVE",
      "#RETAIL!",
      "#LOVE",
      "YOU",
      "7500"
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