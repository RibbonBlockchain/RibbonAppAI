import { StarIcon } from "lucide-react";
import React, { useState } from "react";
import Button from "@/components/button";
import { NotificationsIcon } from "@/public/images";
import { useGetUserNotifications, useReadNotification } from "@/api/user";
import { formatDateAndTimeAgo } from "@/lib/values/format-dateandtime-ago";

const NotificationModal = ({
  onClose,
  notification,
}: {
  notification: any;
  onClose: () => void;
}) => {
  return (
    <div className="fixed w-[inherit] inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 p-4 sm:p-6">
      <div className="bg-white min-w-[300px] max-w-[380px] flex flex-col items-center gap-5 rounded-lg px-4 py-6 sm:px-6">
        <NotificationsIcon />

        <div>
          <p className="text-center font-semibold text-lg mb-1">
            {notification.title}
          </p>
          <p className="text-sm  ">{notification.message}</p>
        </div>

        <Button onClick={onClose} className="rounded-md h-[48px]">
          Close
        </Button>
      </div>
    </div>
  );
};

const DisplayNotification = () => {
  const { data } = useGetUserNotifications();

  const filteredData = data?.data.filter((item: any) => item.isRead === false);

  const useNotification = filteredData.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: readNotification } = useReadNotification();

  const handleNotificationClick = (notification: any) => {
    setIsModalOpen(true);
    setSelectedNotification(notification);
    readNotification({ notificationId: notification.idz });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <NotificationModal
          notification={selectedNotification}
          onClose={closeModal}
        />
      )}

      {useNotification?.map((notification: any) => (
        <div
          key={notification.id}
          className="relative flex flex-col gap-3"
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex flex-row gap-4 items-center pb-3 border-b-[2px] border-gray-200">
            <div className="w-[30px] flex items-center justify-center self-center">
              {/* {i.type === "questionnaire" ? (
                <StarIcon fill="#7C56FE" stroke="#7C56FE" />
              ) : (
                <SadEmoji />
              )} */}
              <StarIcon fill="#7C56FE" stroke="#7C56FE" />
            </div>

            <div
              onClick={() => handleNotificationClick(notification.id)}
              className="w-full h-auto flex felx-start flex-col mt-3 gap-y-1.5"
            >
              <p className="text-sm font-semibold">{notification.title}</p>
              <p className="text-sm font-normal">{notification.message}</p>
              <p className="text-[12px] font-normal text-[#626262]">
                {
                  formatDateAndTimeAgo(notification.createdAt as string)
                    .relativeTime
                }
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayNotification;
