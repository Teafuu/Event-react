export enum Language {
    All = "All",
    English = "en",
    Norwegian = "no",
  }
  
export interface CalendarEvent {
    id: string;
    title?: string;
    imageUrl?: string;
    imageText?: string;
    startTime: Date;
    endTime: Date;
    audience?: string;
    language?: string;
    location: string;
  }

  export interface GetEventsOptions {
    campus?: string;
    audience?: string;
    count?: number;
    language?: Language;
    startTime?: string;
    endTime?: string;
  }
  
  export class ApiClient {
    constructor(private baseUrl: string = "") {}
  
    async getEvents(options: GetEventsOptions = {}): Promise<CalendarEvent[]> {
      const params = new URLSearchParams();
  
      if (options.language && options.language !== Language.All) {
        params.append("language", options.language);
      }
  
      if (options.campus?.trim()) {
        params.append("campus", options.campus.trim());
      }
  
      if (options.audience?.trim()) {
        params.append("audience", options.audience.trim());
      }
  
      if (options.count !== undefined && options.count > 0) {
        params.append("count", options.count.toString());
      }
  
      const queryString = params.toString();
      const url = `${this.baseUrl}/Events${queryString ? `?${queryString}` : ""}`;
  
      const response = await fetch(url, {
        method: "GET"
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.status} ${response.statusText}`);
      }
  
      return response.json();
    }
  }