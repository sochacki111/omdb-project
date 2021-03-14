import React, { useState, useEffect } from 'react';
import axios from '../axios-base';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

const columns: GridColDef[] = [
  { field: 'ownerName', headerName: 'Owner Name', flex: 0.2 },
  { field: 'text', headerName: 'text', flex: 1 }
];

export default function Comments() {
  const [comments, setComments] = useState<any[]>([]);

  const fetchComments = async () => {
    const { data } = await axios.get(`/comments`);
    setComments(
      data.map((comment: any) => {
        return { id: comment._id, ...comment };
      })
    );
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const isCommentsEmpty = comments.length ? true : false;

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isCommentsEmpty && (
        <DataGrid
          rows={comments}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      )}
    </div>
  );
}
