import Button from "@/components/button";
import { X } from "lucide-react";
import React from "react";

interface Item {
  id: number;
  name: string;
  currency: string;
  price: number;
  description: string;
  stock: number;
}

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Item | null;
  setFormData: React.Dispatch<React.SetStateAction<Item | null>>;
  onSave: (updatedItem: Item) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
}) => {
  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value } as Item);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      <div className="bg-[#3f3952] backdrop h-auto rounded-t-lg shadow-lg p-4 mx-1 max-w-[460px] w-full transition-transform transform translate-y-0">
        <div className="py-4 flex flex-col gap-4 bg-[#3f3952] bg-opacity-75 backdrop-blur-sm rounded-md w-full">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Edit Item</h2>
            <X onClick={onClose} />
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
                className="mt-1.5 border border-gray-300 rounded-md p-2 w-full bg-inherit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData?.description || ""}
                onChange={handleChange}
                rows={4}
                className="mt-1.5 border border-gray-300 rounded-md p-2 w-full bg-inherit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData?.price || ""}
                onChange={handleChange}
                className="mt-1.5 border border-gray-300 rounded-md p-2 w-full bg-inherit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData?.stock || ""}
                onChange={handleChange}
                className="mt-1.5 border border-gray-300 rounded-md p-2 w-full bg-inherit"
              />
            </div>

            <div className="flex flex-row gap-4">
              <Button type="submit" className="w-full rounded-md px-4 py-2.5">
                Update item
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
