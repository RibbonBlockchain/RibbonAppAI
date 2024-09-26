import toast from "react-hot-toast";
import React, { useState } from "react";
import { Edit2, InfoCircle, Trash, Warning2 } from "iconsax-react";
import { useDeleteFeaturedLinkage, useDeleteLinkage } from "@/api/linkage";
import DeleteLinkageModal from "@/containers/linkages/delete-linkage-modal";
import UnfeatureLinkageModal from "@/containers/linkages/unfeature-linkage-modal";

const ManageLinkage = ({
  linkageId,
  featured,
  featuredId,
  linkageBalance,
}: {
  linkageId: number;
  featuredId: number;
  featured: boolean;
  linkageBalance: number;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate, isPending: deleteIsPending } = useDeleteLinkage();

  const handleDeleteLinkage = () => {
    if (linkageBalance === 0) {
      mutate(linkageId, {
        onSuccess: () => {
          setShowDeleteModal(false);
          toast.success("Linkage deleted");
        },
      });
    } else {
      toast.error(
        "Cannot delete linkage. Please withdraw the balance in your wallet and try again."
      );
    }
  };

  const [showUnfeatureModal, setShowUnfeatureModal] = useState(false);
  const { mutate: unfeatureLinkage, isPending: unfeatureIsPending } =
    useDeleteFeaturedLinkage();

  const handleUnfeatureLinkage = () => {
    unfeatureLinkage(
      { linkageId, featuredId },
      {
        onSuccess: () => {
          setShowUnfeatureModal(false);
          toast.success("Linkage unfeatured");
        },
        onError: () => {
          toast.error("Failed to unfeature linkage");
        },
      }
    );
  };

  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2 py-3 border-b border-[#C3B1FF4D]">
        <p className="text-lg font-bold">Manage your Linkage</p>
        <p className="text-sm font-normal">
          Modify your Linkage functionality{" "}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 py-3 items-start border-b border-[#C3B1FF4D]">
          <div className="mt-1">
            <Edit2 size={20} />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-base font-semibold">Edit Linkage</p>
            <p className="text-xs font-normal">
              Adjust the Linkage’s settings to improve interactions or adapt to
              new needs
            </p>
          </div>
        </div>

        <div
          onClick={() => setShowDeleteModal(true)}
          className="flex flex-row gap-2 py-3 items-start border-b border-[#C3B1FF4D]"
        >
          <div className="mt-1">
            <Trash size={20} />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-base font-semibold">Delete Linkage</p>
            <p className="text-xs font-normal">
              Permanently remove the bot and all associated data. This action is
              irreversible.
            </p>
            <div className="flex flex-row gap-2 text-xs font-normal">
              <InfoCircle size={20} /> If you have funds in your linkage wallet,
              you wont be able to delete the linkage until you have withdrawn
              the balance.
            </div>
          </div>
        </div>

        {featured && (
          <div
            onClick={() => setShowUnfeatureModal(true)}
            className="flex flex-row gap-2 py-3 items-start border-b border-[#C3B1FF4D]"
          >
            <div className="mt-1">
              <Warning2 size={20} />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-base font-semibold">Unfeature Linkage</p>
              <p className="text-xs font-normal">
                Enable or disable the bot&apos;`s functionality
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-row gap-2 py-3 items-start border-b border-[#C3B1FF4D]">
          <div className="mt-1">
            <Warning2 size={20} />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-base font-semibold">Deactivate Linkage</p>
            <p className="text-xs font-normal">
              Enable or disable the bot&apos;`s functionality
            </p>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteLinkageModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDeleteLinkage={handleDeleteLinkage}
          deleteIsPending={deleteIsPending}
        />
      )}

      {showUnfeatureModal && (
        <UnfeatureLinkageModal
          isOpen={showUnfeatureModal}
          onClose={() => setShowUnfeatureModal(false)}
          onUnfeatureLinkage={handleUnfeatureLinkage}
          unfeatureIsPending={unfeatureIsPending}
        />
      )}
    </section>
  );
};

export default ManageLinkage;
