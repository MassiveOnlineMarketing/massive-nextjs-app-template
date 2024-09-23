'use client';

import { useKeywordOpperations } from "@/app/_modules/google-keyword-tracker/hooks/useKeywordOpperations";

import { Button } from "@/app/_components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";

import { TrashIcon } from "@heroicons/react/20/solid";


const ResultBulkDelete = ({
  selectedRows,
  onActionFinished,
}: {
  selectedRows: any;
  onActionFinished: () => void;
}) => {
  const keywordIds = selectedRows.rows.map(
    (row: any) => row.original.keywordId,
  );

  const { deleteKeywords } = useKeywordOpperations();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className="ml-2"><TrashIcon className="w-5 h-5" /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription> This action cannot be undone. This will permanently delete the keywords that you have selected.
            All associated data will be removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteKeywords(keywordIds);
              onActionFinished();
            }}
          >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ResultBulkDelete;