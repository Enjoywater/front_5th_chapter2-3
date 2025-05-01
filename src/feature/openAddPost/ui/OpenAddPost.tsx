import { useDialogActions } from '@/shared/model/store';
import { Button } from '@/shared/ui';
import { Plus } from 'lucide-react';

export const OpenAddPost = () => {
  const { setShowAddDialog } = useDialogActions();

  return (
    <Button onClick={() => setShowAddDialog(true)}>
      <Plus className='w-4 h-4 mr-2' />
      게시물 추가
    </Button>
  );
};
