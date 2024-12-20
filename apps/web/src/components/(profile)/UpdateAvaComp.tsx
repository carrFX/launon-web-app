'use client';
import { UpdateAvatarFetchDb } from '@/lib/userLib';
import { useAppDispatch } from '@/redux/hooks';
import { getProfileState } from '@/redux/slices/authSlice';
import { updateAvaSchema } from '@/yup/authSchema';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const UpdateAvaComp = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch()

  // trigger button click
  const handleClickEditAva = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle pemilihan file
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
            await updateAvaSchema.validate({ file });
            const formData = new FormData();
            formData.append('avatar', event.target.files[0]);
            const { result, ok } = await UpdateAvatarFetchDb(formData);
            if (!ok) throw new Error(result.message);
            dispatch(getProfileState())
            toast.success(result.message as string);
            window.location.reload();
          } catch (error) {
            if(error instanceof Yup.ValidationError){
              toast.error(error.message)
            } else {
              toast.error(`${(error as Error).message}`);
            }
          }
    }
  };

  return (
    <button onClick={() => handleClickEditAva()} className="text-sm font-semibold bg-beigeCustom hover:bg-black hover:text-beigeCustom duration-300 px-3 py-2 rounded-full uppercase tracking-wide shadow-xl">
      Edit Avatar
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </button>
  );
};

export default UpdateAvaComp;
