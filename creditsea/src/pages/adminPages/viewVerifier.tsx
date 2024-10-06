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
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getVerifiersAPI } from '../../api'; // Import your API function

const ViewVerifiers: React.FC = () => {
  const [verifiers, setVerifiers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerifiers = async () => {
      try {
        const response = await getVerifiersAPI();
        setVerifiers(response.data);
      } catch (err) {
        setError('Failed to fetch verifiers');
        toast.error('Failed to fetch verifiers');
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiers();
  }, []);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {verifiers.map((verifier) => (
                <TableRow key={verifier.id}>
                  <TableCell>{verifier.name}</TableCell>
                  <TableCell>{verifier.email}</TableCell>
                  <TableCell>{verifier.phone}</TableCell>
                  <TableCell>{verifier.address}</TableCell>
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
