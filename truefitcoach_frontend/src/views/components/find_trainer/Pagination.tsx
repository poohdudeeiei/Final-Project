import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
// import TrainerDetail from "@/pages/setup/trainer-detail/[id]";
import TrainerDetail from "./dataMock";
import { TrainerDetailType } from "@/models/pages/find_trainers";

const pageSize: number = 4;

export default function FindTrainerPagination({
  setTrainers,
}: {
  setTrainers: React.Dispatch<React.SetStateAction<TrainerDetailType[]>>;
}) {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    const x: TrainerDetailType[] = TrainerDetail.slice(
      pagination.from,
      pagination.to
    );
    // setPagination({ ...pagination, count: x.length });
    setTrainers(x);
  }, [pagination.from, pagination.to]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: "20px 0px",
      }}
    >
      <Pagination
        color="primary"
        count={Math.ceil(TrainerDetail.length / pageSize)}
        onChange={handlePageChange}
      />
    </Box>
  );
}
