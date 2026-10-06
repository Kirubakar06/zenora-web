import React from 'react';
import { Badge } from '../../components/ui/Badge';

interface CustomerTagsProps {
  tags: string[];
}

export const CustomerTags: React.FC<CustomerTagsProps> = ({ tags }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Account Tags & Segmentation
      </h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Badge key={t} variant="primary" size="sm">
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
};
