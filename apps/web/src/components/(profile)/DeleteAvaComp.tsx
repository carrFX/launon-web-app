'use client';
import { DeleteAvatarFetchDb } from '@/lib/userLib';
import { useAppDispatch } from '@/redux/hooks';
import { getProfileState } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';

const DeleteAvaComp = () => {
  const dispatch = useAppDispatch();

  const handleDeleteAva = async () => {
      try {
        const { result, ok } = await DeleteAvatarFetchDb();
        if (!ok) throw result.message;
        toast.success(result.message as string);
        dispatch(getProfileState())
        const modal = document.getElementById("my_modal_username") as HTMLDialogElement;
        window.location.reload();
        modal?.close();
        } catch (error) {
        toast.error(`${(error as Error).message}`);
        }
  };

  return (
    <button className="text-sm font-semibold bg-black text-beigeCustom duration-300 px-3 py-2 rounded-full uppercase tracking-wide shadow-xl" onClick={() => handleDeleteAva()}>Delete Avatar</button>
  );
};

export default DeleteAvaComp;
