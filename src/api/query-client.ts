import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Enhanced error handling for API responses
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorText = "";
    try {
      // Try to parse as JSON first
      const errorJson = await res.json();
      errorText = JSON.stringify(errorJson);
    } catch (e) {
      // If not JSON, get as text
      try {
        errorText = await res.text();
      } catch (e2) {
        // If that also fails, use statusText
        errorText = res.statusText;
      }
    }

    console.error(`API Error (${res.status}):`, errorText);
    throw new Error(`${res.status}: ${errorText || "Unknown error"}`);
  }
}

// Make API request with enhanced error handling and retries
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
  retries: number = 2
): Promise<Response> {
  try {
    console.log(`Making ${method} request to ${url}`);

    const res = await fetch(url, {
      method,
      headers: {
        ...(data ? { "Content-Type": "application/json" } : {}),
        // Add cache control to prevent caching issues
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    // If response is ok, return it
    if (res.ok) {
      return res;
    }

    // If response is not ok but we have retries left
    if (retries > 0) {
      console.warn(
        `Request to ${url} failed with status ${res.status}, retrying... (${retries} retries left)`
      );
      // Wait for a short time before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * (3 - retries)));
      return apiRequest(method, url, data, retries - 1);
    }

    // If we're out of retries, handle the error
    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error(`API request failed: ${method} ${url}`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";

// Enhanced query function with better error handling
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const url = queryKey[0] as string;
      console.log(`Fetching data from: ${url}`);

      const res = await fetch(url, {
        credentials: "include",
        headers: {
          // Add cache control headers
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        console.warn(
          `Unauthorized access to ${url}, returning null as configured`
        );
        return null;
      }

      if (!res.ok) {
        await throwIfResNotOk(res);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Query function error:", error);
      throw error;
    }
  };

// Configure QueryClient with more resilient defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute instead of Infinity for better UX
      retry: 2, // Allow retries for queries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
    mutations: {
      retry: 1, // Also allow retry for mutations
    },
  },
});
