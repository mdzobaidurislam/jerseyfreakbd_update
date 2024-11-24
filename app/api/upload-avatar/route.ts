// app/api/upload-avatar/route.ts
import { API_BASE_URL } from '@/app/config/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('images');
    const userId = formData.get('id');

    // Validation
    if (!file || !userId) {
      return NextResponse.json(
        { error: 'File and user ID are required' },
        { status: 400 }
      );
    }

    // Create a new FormData instance for the external API
    const apiFormData = new FormData();
    apiFormData.append('images', file);

    const response = await axios.post(
      `${API_BASE_URL}/file/image-upload/${userId}`,
      apiFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error('Upload error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: error.response?.status || 500 }
    );
  }
}