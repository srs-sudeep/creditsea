import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getVerifierLoanAPI, updateLoanAPI } from '../../api';

const ViewVerifiers: React.FC = () => {
  const [verifiers, setVerifiers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVerifiers = async () => {
    try {
      const response = await getVerifierLoanAPI();
      setVerifiers(response.data);
      console.log(response.data);
    } catch (err) {
      setError('Failed to fetch verifiers');
      toast.error('Failed to fetch verifiers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiers();
  }, []);

  // Function to handle loan status update
  const handleStatusUpdate = async (loanId: string, status: string) => {
    try {
      await updateLoanAPI(loanId, status);
      toast.success(`Loan status updated to ${status}`);
      fetchVerifiers(); // Refresh the list after status update
    } catch (error) {
      console.error('Failed to update loan status:', error);
      toast.error('Failed to update loan status');
    }
  };

  return (
    <div style={{ padding: '20px' }} className='w-full'>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} className='w-[100vw]'>
          <Table style={{ width: '100%' }}> {/* Set table width to 100% */}
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {verifiers.map((verifier) => (
                <TableRow key={verifier.id}>
                  <TableCell>{verifier.fullName}</TableCell>
                  <TableCell>{verifier.user.email}</TableCell>
                  <TableCell>{verifier.user.phone}</TableCell>
                  <TableCell>{verifier.employmentAddress1}</TableCell>
                  <TableCell><Chip
                    label={verifier.status}
                    color={
                      verifier.status === 'approved' ? 'success' :
                        verifier.status === 'pending' ? 'warning' :
                          verifier.status === 'verified' ? 'info' :
                            'error'
                    }
                  /></TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        value={verifier.status}
                        onChange={(e) => handleStatusUpdate(verifier._id, e.target.value)}
                        displayEmpty
                      >
                        {/* Dropdown options for status */}
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                        <MenuItem value="verified">Verified</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewVerifiers;
