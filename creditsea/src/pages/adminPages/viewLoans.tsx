import React, { useEffect, useState } from 'react';
import { Chip,Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getadminLoansAPI } from '../../api';
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
const AdminLoans: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await getadminLoansAPI();
        setLoans(response.data);
        calculateMonthlyData(response.data);
      } catch (error) {
        console.error('Failed to fetch loans', error);
      }
    };

    fetchLoans();
  }, []);

  const calculateMonthlyData = (loans: Loan[]) => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const filteredLoans = loans.filter(loan => new Date(loan.createdAt).getMonth() === new Date().getMonth() && new Date(loan.createdAt).getFullYear() === new Date().getFullYear());

    const countByDay: Record<string, number> = {};
    filteredLoans.forEach(loan => {
      const day = new Date(loan.createdAt).getDate();
      countByDay[day] = (countByDay[day] || 0) + 1;
    });

    const labels = Object.keys(countByDay).map(day => `Day ${day}`);
    const data = Object.values(countByDay);

    setMonthlyData({ labels, data });
  };

  // const data = {
  //   labels: monthlyData.labels,
  //   datasets: [
  //     {
  //       label: `Loans Released in ${new Date().toLocaleString('default', { month: 'long' })}`,
  //       data: monthlyData.data,
  //       backgroundColor: 'rgba(76, 175, 80, 0.5)',
  //       borderColor: 'rgba(76, 175, 80, 1)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  return (
    <Container>

      {/* <Typography variant="h6" gutterBottom>
        Loans Released This Month
      </Typography> */}

      {/* <Bar data={data} /> */}

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Loan Officer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date Applied</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan._id}>
                <TableCell>{loan._id}</TableCell>
                <TableCell>{loan.assignedVerifier?.name}</TableCell>
                <TableCell>{loan.amount}</TableCell>
                <TableCell>{new Date(loan.createdAt).toLocaleDateString('en-US')}</TableCell>
                <TableCell><Chip
                    label={loan.status}
                    color={
                      loan.status === 'approved' ? 'success' :
                        loan.status === 'pending' ? 'warning' :
                          loan.status === 'verified' ? 'info' :
                            'error'
                    }
                  /></TableCell>
                <TableCell>{new Date(loan.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminLoans;
