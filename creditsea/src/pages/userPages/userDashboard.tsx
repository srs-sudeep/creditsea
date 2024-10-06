import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import LoanModal from '../../components/LoanModal';
import { getLoanAPI } from '../../api';
interface Loan {
  id: string;
  loanOfficer: string;
  amount: number;
  dateApplied: string;
  status: 'pending' | 'approved' | 'rejected' | 'verified';

  assignedVerifier?: {
    email: string;
    name: string;
    phone: string;
    _id: string;
  };

  createdAt: string;
  creditInfoDisclosure: boolean;
  employmentAddress1: string;
  employmentAddress2?: string;
  employmentStatus: 'employed' | 'unemployed';
  fullName: string;
  reason: string;
  tenure: number;
  termsAccepted: boolean;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}


const HomePage: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await getLoanAPI();
      console.log(response.data)
      setLoans(response.data);
    };
    fetchLoans();
  }, []);

  const handleApplyLoan = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">DEPOSIT</p>
          <h2 className="text-2xl font-bold">₦0.0</h2>
        </div>
        <Button variant="contained" color="primary" onClick={handleApplyLoan}>
          Get A Loan
        </Button>
      </div>

      <div className="flex mb-4">
        <Button variant="outlined" className="mr-2">Borrow Cash</Button>
        <Button variant="outlined" className="mr-2">Transact</Button>
        <Button variant="outlined">Deposit Cash</Button>
      </div>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for loans"
        className="mb-4"
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Loan Officer</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date Applied</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell component="th" scope="row">
                  {loan.assignedVerifier.name}
                </TableCell>
                <TableCell align="right">{loan.amount.toLocaleString('en-NG', { style: 'currency', currency: 'INR' })}</TableCell>
                <TableCell align="right">
                  {new Date(loan.createdAt).toLocaleDateString('en-US')}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={loan.status}
                    color={
                      loan.status === 'approved' ? 'success' :
                        loan.status === 'pending' ? 'warning' :
                          loan.status === 'verified' ? 'info' :
                            'error'
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <LoanModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HomePage;
