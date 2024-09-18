import toast from "react-hot-toast";
import React, { useState } from "react";
import { useDeleteLinkage } from "@/api/linkage";
import { Edit2, Trash, Warning2 } from "iconsax-react";
import DeleteLinkageModal from "@/containers/linkages/delete-linkage-modal";

const ManageLinkage = ({ linkageId }: { linkageId: number }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate } = useDeleteLinkage();

  const handleDeleteLinkage = () => {
    mutate(linkageId, {
      onSuccess: () => {
        setShowDeleteModal(false), toast.success("Linkage deleted");
      },
    });
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
          </div>
        </div>

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
        />
      )}
    </section>
  );
};

export default ManageLinkage;
