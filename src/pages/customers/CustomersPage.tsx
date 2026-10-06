import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { CustomersTable } from '../../components/tables/CustomersTable';
import { CustomerProfile } from '../../features/customers/CustomerProfile';
import { SearchInput } from '../../components/common/SearchInput';
import { Customer } from '../../types/customer';
import { MOCK_CUSTOMERS } from '../../lib/api/mockData';
import { Button } from '../../components/ui/Button';

export const CustomersPage: React.FC = () => {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer
      title="Customer Accounts & Intelligence"
      subtitle="Complete CRM context, revenue tiers, CSAT sentiment, and open cases"
    >
      <div className="w-full sm:w-80">
        <SearchInput value={search} onChange={setSearch} placeholder="Search customers..." />
      </div>

      <div className="space-y-6">
        {selectedCustomer && (
          <div className="relative">
            <CustomerProfile customer={selectedCustomer} />
            <div className="flex justify-end pt-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                Close Dossier
              </Button>
            </div>
          </div>
        )}

        <CustomersTable
          customers={filtered}
          onSelectCustomer={(c) => setSelectedCustomer(c)}
        />
      </div>
    </PageContainer>
  );
};
