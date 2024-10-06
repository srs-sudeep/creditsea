import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from 'lucide-react';

interface LoanApplication {
  id: number;
  officer: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const LoanApplicationPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [appliedLoans, setAppliedLoans] = useState<LoanApplication[]>([
    { id: 1, officer: 'John Doe', amount: 50000, date: 'June 08, 2021', status: 'Pending' },
    { id: 2, officer: 'John Doe', amount: 100000, date: 'June 07, 2021', status: 'Approved' },
    { id: 3, officer: 'John Doe', amount: 100000, date: 'June 07, 2021', status: 'Rejected' },
    { id: 4, officer: 'John Doe', amount: 100000, date: 'May 27, 2021', status: 'Approved' },
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CREDIT APP</h1>
        <nav>
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Payments</Button>
          <Button variant="ghost">Budget</Button>
          <Button variant="ghost">Card</Button>
          <Button variant="ghost">User</Button>
        </nav>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Apply for a Loan</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Full name as it appears on bank account" />
              <Input placeholder="How much do you need?" type="number" />
              <Input placeholder="Loan tenure (in months)" type="number" />
              <Input placeholder="Employment status" />
              <textarea className="w-full p-2 border rounded" placeholder="Reason for loan" />
              <Input placeholder="Employment address" />
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-sm">
                  I have read the important information and accept that by completing this application I will be bound by the terms.
                </label>
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">BALANCE</p>
                <p className="text-3xl font-bold">₦ {balance.toFixed(2)}</p>
              </div>
              <Button>Get A Loan</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Button variant="outline" className="flex-1">Borrow Cash</Button>
              <Button variant="outline" className="flex-1">Transact</Button>
              <Button variant="outline" className="flex-1">Deposit Cash</Button>
            </div>
            <Input placeholder="Search for loans" className="mb-4" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan Officer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appliedLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-2" />
                        {loan.officer}
                      </div>
                    </TableCell>
                    <TableCell>{loan.amount.toLocaleString()}</TableCell>
                    <TableCell>{loan.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        loan.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        loan.status === 'Rejected' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-200 text-yellow-800'
                      }`}>
                        {loan.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanApplicationPage;
