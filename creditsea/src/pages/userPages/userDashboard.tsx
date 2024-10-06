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
  Chip,
  Tabs,
  Tab,
  Box,
  Typography,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const HomePage: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await getLoanAPI();
      console.log(response.data);
      setLoans(response.data);
    };
    fetchLoans();
  }, []);

  const handleApplyLoan = () => {
    setIsModalOpen(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="container mx-auto">
      <Box sx={{ bgcolor: '#f0f0f0', p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoneyIcon sx={{ fontSize: 40, color: 'green', mr: 1 }} />
            <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
              0.0
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleApplyLoan}>
            Get A Loan
          </Button>
        </Box>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="loan options">
          <StyledTab label="Borrow Cash" />
          <StyledTab label="Transact" />
          <StyledTab label="Deposit Cash" />
        </Tabs>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for loans"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
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
                  {loan.assignedVerifier?.name}
                </TableCell>
                <TableCell align="right">{loan.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
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
