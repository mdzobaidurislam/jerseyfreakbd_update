import { MetadataRoute } from 'next'
import { API_BASE_URL, BASE_URL } from './config/api';

// Reuse your existing getDetails function
async function getDetails() {
  try {
    const response = await fetch(`${API_BASE_URL}/business-settings`, {
      next: { revalidate: 10 }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch:', response.status, await response.text());
      return [];
    }
    
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

// Helper function to get settings (reusing your existing function)
function get_setting(settings: any[], key: string) {
  return settings.find(setting => setting.key === key);
}

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const result = await getDetails();

  // Get values from business settings
  const site_name = get_setting(result, 'site_name')?.value || "Jersey Freak";
  const theme_color = get_setting(result, 'theme_color')?.value || "#000000";
  const background_color = get_setting(result, 'background_color')?.value || "#ffffff";
  const app_short_name = get_setting(result, 'app_short_name')?.value || "JF";
  const meta_description = get_setting(result, 'meta_description')?.value || "Jersey Freak";
  const app_icon = get_setting(result, 'site_icon')?.value || "icon.png";
  
  return {
    name: site_name,
    short_name: app_short_name,
    description: meta_description,
    start_url: '/',
    display: 'standalone',
    background_color: background_color,
    theme_color: theme_color,
    icons: [
      {
        src: `${BASE_URL}/public/${app_icon}`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${BASE_URL}/public/${app_icon}`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    orientation: 'portrait',
    prefer_related_applications: false,
    related_applications: [],
    shortcuts: [
      {
        name: "Home",
        url: "/",
        icons: [
          {
            src: `${BASE_URL}/public/${app_icon}`,
            sizes: "96x96",
            type: "image/png"
          }
        ]
      },
      // Add more shortcuts based on your business settings if needed
    ],
    // Optional: Add categories if you have them in business settings
    categories: ['shopping', 'sports'],
    // Optional: Add screenshots if you have them in business settings
    screenshots: [
      {
        src: `${BASE_URL}/public/${get_setting(result, 'screenshot1')?.value || 'screenshot1.png'}`,
        type: 'image/png',
        sizes: '1080x1920'
      }
    ],
    // Optional: Add scope
    scope: '/',
  }
}