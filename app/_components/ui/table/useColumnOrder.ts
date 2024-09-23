'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

/**
 * Custom hook for managing the order of columns in a table.
 *
 * @param columns - An array of column definitions.
 * @param localStorageKey - The key used to store the column order in local storage.
 * @returns An object containing the column order, functions to update the column order, and event handlers for drag and drop functionality.
 */
function useColumnOrder(columns: ColumnDef<any, any>[], localStorageKey: string) {
  const initialColumnOrder = useMemo(() => loadColumnOrder(columns, localStorageKey), [columns]);
  const [columnOrder, setColumnOrder] = useState(initialColumnOrder);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.dataTransfer.setData("text/plain", columnId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    // Get the ID of the column being dragged
    const sourceColumnId = e.dataTransfer.getData("text/plain");

    // Prevent 'select' and 'actions' columns from being moved
    if (['select', 'actions'].includes(sourceColumnId) || ['select', 'actions'].includes(targetColumnId)) {
      return;
    }

    // Find the index of the source and target columns in the current column order
    const sourceIndex = columnOrder.indexOf(sourceColumnId);
    const targetIndex = columnOrder.indexOf(targetColumnId);

    // Create a new column order array by copying the current order
    const newColumnOrder = [...columnOrder];
    // Remove the source column from its original position
    newColumnOrder.splice(sourceIndex, 1);
    // Insert the source column at the target position
    newColumnOrder.splice(targetIndex, 0, sourceColumnId);

    saveColumnOrder(newColumnOrder, localStorageKey);
    setColumnOrder(newColumnOrder);
  };

  return {
    columnOrder,
    setColumnOrder,
    handleDragStart,
    handleDrop,
  };
}


/**
 * Saves the column order to the local storage.
 * @param columnOrder - An array of strings representing the column order.
 */
function saveColumnOrder(columnOrder: string[], localStorageKey: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(localStorageKey, JSON.stringify(columnOrder));
  }
}

/**
 * Loads the column order from the local storage.
 * @returns An array of strings representing the column order.
 */
function loadColumnOrder<TData, TValue>(columns: ColumnDef<TData, TValue>[], localStorageKey: string): string[] {
  if (typeof window !== 'undefined') {
    const columnOrder = localStorage.getItem(localStorageKey);
    // If the column order is not found in local storage, use the default order
    const columnOrderArray = columnOrder ? JSON.parse(columnOrder) : columns.map((c) => c.id).filter((id): id is string => id !== undefined);
    return columnOrderArray;
  }
  // Return default order if window is undefined (SSR)
  return columns.map((c) => c.id).filter((id): id is string => id !== undefined);
}

export default useColumnOrder;