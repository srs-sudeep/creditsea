import React from 'react';
import {
  Grid, Paper, Typography, Box,
  useTheme, ThemeProvider, createTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import RepeatIcon from '@mui/icons-material/Repeat';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  ResponsiveContainer, CartesianGrid, Tooltip
} from 'recharts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#2196f3',
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  height: '100%',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StatCard = ({ icon, title, value }) => (
  <Grid item xs={12} sm={6} md={3}>
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

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const MetricCard = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(2),
  backgroundColor: color,
  color: theme.palette.getContrastText(color),
  marginBottom: theme.spacing(2),
}));

const mockAreaData = [
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

const AdminDashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Grid container spacing={2}>
        <StatCard
          icon={<PeopleIcon />}
          title="ACTIVE USERS"
          value="200"
        />
        <StatCard
          icon={<PersonIcon />}
          title="BORROWERS"
          value="100"
        />
        <StatCard
          icon={<MonetizationOnIcon />}
          title="CASH DISBURSED"
          value="550,000"
        />
        <StatCard
          icon={<AccountBalanceIcon />}
          title="CASH RECEIVED"
          value="1,000,000"
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
          icon={<AccountBalanceWalletIcon />}
          title="OTHER ACCOUNTS"
          value="10"
        />
        <StatCard
          icon={<MonetizationOnIcon />}
          title="LOANS"
          value="50"
        />
      </Grid>

      <ChartContainer>
        <Typography variant="h6" gutterBottom>Loans Released Monthly</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockAreaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke={theme.palette.primary.main} fill={theme.palette.primary.light} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer>
        <Typography variant="h6" gutterBottom>Total Outstanding Open Loans - Monthly</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="loans" fill={theme.palette.secondary.main} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MetricCard color={theme.palette.warning.main}>
            <Typography variant="h6">Rate of Recovery (Open, Fully Paid, Default Loans)</Typography>
            <Typography variant="body2">Percentage of the dues amount that is paid for all loans at maturity</Typography>
            <Typography variant="h4">80%</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCard color={theme.palette.success.main}>
            <Typography variant="h6">Rate of Recovery (Open Loans)</Typography>
            <Typography variant="body2">Percentage of the dues amount that is paid for open loans</Typography>
            <Typography variant="h4">35%</Typography>
          </MetricCard>
        </Grid>
      </Grid>

      <ChartContainer>
        <Typography variant="h6" gutterBottom>Number of Repayments Collected - Monthly</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockRepaymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="repayments" fill={theme.palette.error.main} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );
};

export default AdminDashboard;
