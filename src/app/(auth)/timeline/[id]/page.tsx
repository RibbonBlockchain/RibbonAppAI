"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Repeat } from "lucide-react";
import { ArrowLeft2, Message, Send } from "iconsax-react";
import Topbar from "@/containers/dashboard/top-bar";
import { useRouter, useParams } from "next/navigation";
import ReplyCards from "@/components/timeline/reply-cards";
import {
  useGetNotificationById,
  useGetNotificationComments,
  useLikeNotification,
  usePostComment,
} from "@/api/user";
import { formatCustomDate, formatTime } from "@/lib/utils/format-date";
import toast from "react-hot-toast";
import { formatDateAndTimeAgo } from "@/lib/values/format-dateandtime-ago";
import { useGetAuth } from "@/api/auth";
import { SpinnerIcon } from "@/components/icons/spinner";
import ShareTimeline from "@/components/share-modal";

const TimelineDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [openShareModal, setOpenShareModal] = useState(false);

  const { data: userData } = useGetAuth();
  const { data, refetch, isLoading } = useGetNotificationById(id as string);

  const { mutate: likeNotification } = useLikeNotification();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (data?.data?.likes && userData?.id) {
      const isUserLiked = data.data.likes.some(
        (like: any) => like.userId === userData.id
      );
      setIsLiked(isUserLiked);
    }
  }, [data?.data?.likes, userData?.id]);

  const handleLikeNotification = () => {
    likeNotification(id as string, {
      onSuccess: () => {
        setIsLiked(!isLiked);
        refetch();
      },
    });
  };

  const { data: getComments, refetch: refetchComments } =
    useGetNotificationComments(id as string);

  const { mutate: postComment } = usePostComment();
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim()) {
      postComment(
        { id: id as string, body: { comment } },
        {
          onSuccess: () => {
            setComment("");
            refetchComments();
            toast.success("New comment submitted");
          },
        }
      );
    }
  };

  function generateCommentId(
    postId: string | number,
    userId: string | number
  ): string {
    const postStr = postId.toString();
    const userStr = userId.toString();

    const uniqueString = postStr + "-" + "xxx" + "-" + userStr + "-" + "xxx";

    return uniqueString;
  }

  return (
    <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6 pb-20">
      <div className="flex flex-row items-center">
        <ArrowLeft2 onClick={() => router.back()} className="mt-3" />
        <Topbar>
          <p className="text-xl font-bold">Timeline</p>
        </Topbar>
      </div>

      {isLoading && (
        <div className="mt-10 flex items-center justify-center">
          <SpinnerIcon />
        </div>
      )}

      {!data?.data && !isLoading && <div>Timeline not found</div>}

      {!isLoading && (
        <section className="mb-10">
          <div className="flex flex-col gap-3 py-5 border-b border-[#FFFFFF14]">
            <div className="flex flex-row gap-2 items-center">
              <Image
                alt="coin"
                width={32}
                height={32}
                src="/assets/ribbon.svg"
                className="w-[32px] h-[32px] rounded-full bg-white p-[2px]"
              />
              <p className="text-[15px] font-extrabold">{data?.data.title}</p>
            </div>

            <div className="flex flex-col text-[15px] gap-2">
              <h3 className="font-normal">{data?.data?.message}</h3>

              <h4 className="flex flex-row gap-2">
                <p className="font-medium text-[#FFFFFF80]">
                  {formatTime(data?.data.createdAt)}
                </p>
                .
                <p className="font-medium text-[#FFFFFF80]">
                  {formatCustomDate(data?.data.createdAt)}
                </p>
              </h4>

              <div className="flex flex-row items-center justify-between text-[#FFFFFF80] text-[10px] font-semibold">
                <div className="flex flex-row gap-1.5 items-center">
                  <Message size={18} width={18} height={18} fill="#FFFFFF80" />{" "}
                  {data?.data.comments.length}
                </div>
                <div
                  onClick={handleLikeNotification}
                  className="flex flex-row gap-1.5 items-center"
                >
                  <Heart
                    size={18}
                    width={18}
                    height={18}
                    fill={isLiked ? "red" : "#0B0228"}
                  />
                  {data?.data.likes.length}
                </div>
                <div
                  onClick={() => setOpenShareModal(true)}
                  className="flex flex-row gap-1.5 items-center"
                >
                  <Repeat size={18} width={18} height={18} />{" "}
                </div>
              </div>
            </div>
          </div>

          {openShareModal && (
            <ShareTimeline
              isOpen={openShareModal}
              closeModal={() => setOpenShareModal(false)}
              inviteLink={""}
              title={""}
              note={""}
            />
          )}

          <div className="space-y-4">
            {getComments?.data.length === 0 ? (
              <div className="mt-10 text-center">
                <p>No comments under this post</p>
                <p>Be the first to add a comment</p>
              </div>
            ) : (
              <>
                {getComments?.data.map((index: any) => (
                  <ReplyCards
                    key={index}
                    comments={""}
                    title={generateCommentId(index.id, index.userId)}
                    time={formatDateAndTimeAgo(index.createdAt).relativeTime}
                    description={index.comment}
                    likes={""}
                    shares={""}
                    id={""}
                  />
                ))}
              </>
            )}
          </div>
        </section>
      )}

      <div className="fixed max-w-[500px] left-0 right-0 bottom-0 mx-auto px-4 py-2 bg-[#1E1C2D] border-t border-[#FFFFFF14]">
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-row gap-2 mx-auto w-full"
        >
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-3 rounded-md bg-[#1E1C2D] text-white placeholder-[#ffffff80] border border-[#FFFFFF14] focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 bg-[#290064] text-white rounded-full hover:bg-[#380085] flex items-center justify-center"
          >
            <Send size={24} />
          </button>
        </form>
      </div>
    </main>
  );
};

export default TimelineDetail;
