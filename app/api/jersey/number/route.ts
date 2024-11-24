import { API_BASE_URL } from '@/app/config/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const defaultPlayer = {
      id: null,
      number: '',
      url: ''
    };
    interface Player {
      id: number;
      number: string;
      url: string;
    }

    // Define the structure of the API response
    interface ApiResponse {
      result: boolean;
      data: Player[];
    }

    const { data } = await request.json();

    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/jersey_number/${data.jersey_color_id || 1}`);

    if (response.data.result) {
      // Assuming `data` is an array of character names (strings)
      const matchedPlayers = data.data.map((charName: string) =>
        response.data.data.find((player: Player) => player.number === charName) || defaultPlayer
      );

      return NextResponse.json(matchedPlayers, { status: 200 });
    }

  } catch (error: any) {
    console.error('Request failed:', error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An error occurred during the request.';

    return NextResponse.json({ message }, { status });
  }
}
