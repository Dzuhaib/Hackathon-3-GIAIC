
const env = {
  NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
};

export default env;

export const apiVersion = '2023-01-01'; // Replace with your API version