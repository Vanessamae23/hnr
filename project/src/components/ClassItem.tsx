// ClassItem.tsx
import React from 'react';
import { Button, Select, MenuItem } from '@mui/material';

interface ClassItemProps {
  id: string;
  moduleName: string;
  classType: string;
  onDelete: (id: string) => void;
}

const ClassItem: React.FC<ClassItemProps> = ({ id, moduleName, classType, onDelete }) => {
  return (
    <div className="flex justify-between items-center p-2 mb-2 border-b">
      <span>{`${moduleName} ${classType}`}</span>
      <Select
        multiple
        // Add logic to populate these options
        value={[]}
        // Add onChange handler
        renderValue={(selected) => `${selected.length} Selected`}
      >
        {/* Add MenuItem components here */}
      </Select>
      <Button variant="outlined" color="secondary" onClick={() => onDelete(id)}>
        Delete
      </Button>
    </div>
  );
};

export default ClassItem;
