import React from "react";

import TableCell from "@mui/material/TableCell";
import Input from "@mui/material/Input";

export const CustomTableCell = ({ row, column, onChange }) => {
  const { isEditMode } = row;
  const value = row[column] ? row[column] : "";
  return (
    <TableCell align="left">
      {isEditMode ? <Input value={value} name={column} onChange={(e) => onChange(e, row)} autoComplete="false" /> : value}
    </TableCell>
  );
};
