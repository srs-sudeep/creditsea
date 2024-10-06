import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import RepeatIcon from '@mui/icons-material/Repeat';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  height: '100%',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StatCard = ({ icon, title, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <StyledPaper elevation={1}>
      <IconWrapper>
        {icon}
      </IconWrapper>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6" component="div">
          {value}
        </Typography>
      </Box>
    </StyledPaper>
  </Grid>
);
const mockChartData = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 600 },
  { month: 'Apr', value: 400 },
  { month: 'May', value: 500 },
  { month: 'Jun', value: 300 },
  { month: 'Jul', value: 400 },
  { month: 'Aug', value: 400 },
  { month: 'Sep', value: 600 },
  { month: 'Oct', value: 400 },
  { month: 'Nov', value: 400 },
  { month: 'Dec', value: 800 },
];

const mockBarData = [
  { month: 'Jan', loans: 50 },
  { month: 'Feb', loans: 300 },
  { month: 'Mar', loans: 400 },
  { month: 'Apr', loans: 800 },
  { month: 'May', loans: 100 },
  { month: 'Jun', loans: 300 },
  { month: 'Jul', loans: 200 },
  { month: 'Aug', loans: 800 },
  { month: 'Sep', loans: 400 },
  { month: 'Oct', loans: 300 },
  { month: 'Nov', loans: 200 },
  { month: 'Dec', loans: 200 },
];

const mockRepaymentData = [
  { month: 'Jan', repayments: 20 },
  { month: 'Feb', repayments: 60 },
  { month: 'Mar', repayments: 70 },
  { month: 'Apr', repayments: 100 },
  { month: 'May', repayments: 30 },
  { month: 'Jun', repayments: 60 },
  { month: 'Jul', repayments: 50 },
  { month: 'Aug', repayments: 100 },
  { month: 'Sep', repayments: 70 },
  { month: 'Oct', repayments: 40 },
  { month: 'Nov', repayments: 60 },
  { month: 'Dec', repayments: 50 },
];



const VerifierDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100">
      <Grid container spacing={2} className='mb-6'>
        <StatCard
          icon={<MonetizationOnIcon />}
          title="LOANS"
          value="50"
        />
        <StatCard
          icon={<PeopleIcon />}
          title="BORROWERS"
          value="100"
        />
        <StatCard
          icon={<AccountBalanceWalletIcon />}
          title="CASH DISBURSED"
          value="550,000"
        />
        <StatCard
          icon={<SavingsIcon />}
          title="SAVINGS"
          value="450,000"
        />
        <StatCard
          icon={<RepeatIcon />}
          title="REPAID LOANS"
          value="30"
        />
        <StatCard
          icon={<CurrencyExchangeIcon />}
          title="CASH RECEIVED"
          value="1,000,000"
        />
      </Grid>


      <div className="p-4 mb-6 bg-white rounded-lg shadow-sm">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={mockChartData}>
            <Area type="monotone" dataKey="value" stroke="#4CAF50" fill="#4CAF50" />
            <XAxis dataKey="month" />
            <YAxis />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 mb-6 bg-white rounded-lg shadow-sm">
        <h3 className="mb-2 text-lg font-semibold">Total Outstanding Open Loans - Monthly</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockBarData}>
            <Bar dataKey="loans" fill="#2196F3" />
            <XAxis dataKey="month" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="mb-2 text-lg font-semibold">Number of Repayments Collected - Monthly</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockRepaymentData}>
            <Bar dataKey="repayments" fill="#F44336" />
            <XAxis dataKey="month" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VerifierDashboard;
