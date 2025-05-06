import React from "react";
import ContentCard from "./content-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/values/constants";
import { useSocialMedia } from "@/context/socialmediacontext";

const TimelineSkeleton: React.FC = () => {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm mb-4 overflow-hidden border-l-4 border-gray-300 dark:border-gray-700"
        >
          <div className="p-3 sm:p-4">
            <div className="flex items-center">
              <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0" />
              <div className="ml-2 sm:ml-3 space-y-1 sm:space-y-2 flex-grow">
                <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                <Skeleton className="h-2 sm:h-3 w-24 sm:w-32" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-4/5" />
            </div>
            <div className="mt-3 sm:mt-4">
              <Skeleton className="h-40 sm:h-48 md:h-56 w-full rounded-md" />
            </div>
          </div>
          <div className="p-2 sm:p-4 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex justify-between">
              <div className="flex space-x-1 sm:space-x-2">
                <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 rounded-md" />
                <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 rounded-md" />
                <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 rounded-md" />
              </div>
              <Skeleton className="h-6 sm:h-8 w-6 sm:w-8 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const EmptyTimeline: React.FC = () => {
  const queryClient = useQueryClient();
  const { refreshContent } = useSocialMedia();

  const fetchContentMutation = useMutation({
    mutationFn: async () => {
      return refreshContent();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CONTENTS] });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center px-4">
      <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📭</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        Your timeline is empty
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 max-w-xs sm:max-w-md text-sm sm:text-base">
        Connect platforms or refresh to see content from your social media
        accounts
      </p>
      <button
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white rounded-full flex items-center text-sm sm:text-base"
        onClick={() => fetchContentMutation.mutate()}
        disabled={fetchContentMutation.isPending}
      >
        {fetchContentMutation.isPending ? (
          <>
            Loading content{" "}
            <i className="ri-loader-4-line ml-2 animate-spin"></i>
          </>
        ) : (
          <>
            Refresh timeline <i className="ri-refresh-line ml-2"></i>
          </>
        )}
      </button>
    </div>
  );
};

const TimelineComponent: React.FC = () => {
  const { contents, isLoading } = useSocialMedia();

  if (isLoading) {
    return (
      <main className="flex-grow">
        <div className="container max-w-3xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <TimelineSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow">
      <div className="container max-w-3xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        {contents.length === 0 ? (
          <EmptyTimeline />
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {contents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default TimelineComponent;
