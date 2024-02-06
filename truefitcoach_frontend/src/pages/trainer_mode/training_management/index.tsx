// import FormAddSchedule from "@/views/components/trainer_mode/appointment/formAddSchedule";
import Grid from "@mui/material/Grid";
import { Scheduler } from "@aldabil/react-scheduler";
import {
  FieldProps,
  ProcessedEvent,
  SchedulerRef,
  RemoteQuery,
  // ViewEvent,
} from "@aldabil/react-scheduler/types";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import AppointmentListCustomersDetail from "@/views/components/trainer_mode/appointment/appointmentListCustomersDetail";
import ComponentListCustomer from "@/views/components/user-setting/Render-component/ComponentListCustomer.tsx";
import useSWR from "swr";
import { fetchData, fetchDelete } from "@/services/api/fetcher";
import {
  AssignedCustomerType,
  CustomerProps,
} from "@/models/pages/trainer-mode/appointment";
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";
import { useAuth } from "@/้hooks/useAuth";
import FallbackSpinner from "@/@core/component/loading/spinner";
import { useRouter } from "next/router";
import { APPOINTMENT_DELETE_EVENT } from "@/services/endpoint/trainer";
export default function Appointment() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [assignedData, setAssignedData] = useState<AssignedCustomerType[]>([]);
  const [pageAppoint, setPageAppoint] = useState<number>(1);
  const [pageAssigned, setPageAssigned] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [filterAssignedSelected, setFilterAssignedSelected] =
    useState<string>("");
  const [filterSelected, setFilterSelected] = useState<string>("");
  const [deleteEvent, setDeleteEvent] = useState("");
  const pageSize = 4;
  const [stateLoading, setStateLoading] = useState(false);

  const schedulerRef = useRef<SchedulerRef>(null);

  const {
    data,
    error,
    isLoading,
    mutate: mutateAssigned,
  } = useSWR(
    process.env.NEXT_PUBLIC_ENDPOINT +
      `/trainer/get-Assigned?start=${startDate}&end=${endDate}&course_name=${filterAssignedSelected}`,
    fetchData
  );

  const {
    data: customerData,
    error: errorCustomer,
    isLoading: isLoadingCustomer,
    mutate: mutateAssign,
  } = useSWR(
    process.env.NEXT_PUBLIC_ENDPOINT +
      `/trainer/get-assign?course_name=${filterSelected}`,
    fetchData
  );

  const { data: filterList } = useSWR(
    process.env.NEXT_PUBLIC_ENDPOINT + `/trainer/get-assignFilter?`,
    fetchData
  );

  useEffect(() => {
    if (customerData) {
      setCustomers(customerData.customerList);
    }
  }, [customerData]);

  useEffect(() => {
    if (data) {
      const dataRender = data?.assignedList.map(
        (data: AssignedCustomerType) => ({
          ...data,
          start: new Date(data.start),
          end: new Date(data.end),
        })
      );
      setAssignedData(dataRender);
    }
  }, [data]);

  useEffect(() => {
    setStateLoading(isLoading);
  }, [isLoading]);

  const [assignList, setAssignList] = useState<any>([]);

  useEffect(() => {
    const startIndex = (pageAppoint - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const data: any = customers.slice(startIndex, endIndex);
    setAssignList(data);
  }, [customers, pageAppoint]);

  const [assignedList, setAssignedList] = useState<AssignedCustomerType[]>([]);

  useEffect(() => {
    const startIndex = (pageAssigned - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (assignedData) {
      const data = assignedData.slice(startIndex, endIndex);
      setAssignedList(data);
    }
  }, [pageAssigned, assignedData]);

  useEffect(() => {
    if (
      assignedList &&
      assignedList.length === 0 &&
      assignedData &&
      assignedData.length > 0 &&
      pageAssigned > 1
    ) {
      setPageAssigned((prev) => Math.max(prev - 1, 0));
    }
  }, [assignedList, assignedData]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for delete event by id
  useEffect(() => {
    const cancelAssignedEvent = async () => {
      // Call the function to cancel the assigned event
      try {
        const deleteAssigned = await fetchDelete(
          deleteEvent,
          APPOINTMENT_DELETE_EVENT
        );
        if (deleteAssigned && deleteAssigned?.status === 200) {
          mutateAssigned();
          enqueueSnackbar("Cancel assigned successful", { variant: "success" });
        } else {
          enqueueSnackbar("Cancel assigned failed", { variant: "error" });
        }
      } catch (error) {
        console.error("Error while canceling assigned:", error);
        enqueueSnackbar("Cancel assigned failed", { variant: "error" });
      }
    };
    if (deleteEvent) {
      cancelAssignedEvent();
    }
  }, [deleteEvent]);

  const handleDelete = async (deletedId: string) => {
    // handle delete event
    setDeleteEvent(deletedId);
  };

  const getRemoteEvents = async (params: RemoteQuery) => {
    const { start, end, view } = params;
    // console.log(start, end);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        padding: "2% 5%",
        bgcolor: "",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={7}>
          {" "}
          <Scheduler
            height={1000}
            getRemoteEvents={getRemoteEvents}
            view="week"
            loading={stateLoading}
            ref={schedulerRef}
            events={assignedData}
            onDelete={handleDelete}
            fields={[
              {
                name: "description",
                type: "input",
                default: "",
                config: {
                  label: "Details",
                  required: true,
                  multiline: true,
                  rows: 4,
                },
              },
            ]}
            dialogMaxWidth="md"
            week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 0,
              startHour: 0,
              endHour: 24,
              step: 60,
            }}
            // optional
            // customViewer={(event: ProcessedEvent,close: () => void) => {
            //   console.log(event)
            //   return (
            //     <div>{event.title}</div>
            //   )
            // }}
            // eventRenderer={({ event, ...props }) => {
            //   console.log(props);
            //   return (
            //     <div
            //       style={{
            //         backgroundColor: event.color,
            //         height:"100%"
            //       }}
            //       {...props}
            //     >

            //       eieieieieieieieieieieiei
            //     </div>
            //   );
            // }}
            day={{
              startHour: 0,
              endHour: 24,
              step: 120,
              navigation: true,
            }}
            draggable={false}
            editable={false}
            // Edit popup schedule details
            viewerExtraComponent={(
              fields: FieldProps[],
              event: ProcessedEvent
            ) => {
              // console.log(event)
              return (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography>Description : {event.description}</Typography>
                  <Typography>Assigned to : {event.assign}</Typography>
                </Box>
              );
            }}
            // Edit popup schedule title
            viewerTitleComponent={(event: ProcessedEvent) => {
              // console.log(event);
              return (
                <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                  {event.title} <br /> eiei
                </Typography>
              );
            }}

            // Edit view cell event
            // eventRenderer={({ event, ...props }) => {}}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <ComponentListCustomer
            pageAppoint={pageAppoint}
            setPageAppoint={setPageAppoint}
            pageAssigned={pageAssigned}
            setPageAssigned={setPageAssigned}
            listCustomer={assignList}
            courseFilters={filterList && filterList.filters}
            setFilterSelected={setFilterSelected}
            filterSelected={filterSelected}
            allAppointmentPage={
              customerData ? Math.ceil(customerData.totalPage / pageSize) : 0
            }
            assignedList={assignedList}
            filterAssignedSelected={filterAssignedSelected}
            setFilterAssignedSelected={setFilterAssignedSelected}
            allAssignedPage={data ? Math.ceil(data.totalPage / pageSize) : 0}
            mutateAssign={mutateAssign}
            mutateAssigned={mutateAssigned}
            assignedLength={assignedData && assignedData.length}
            isLoading={stateLoading}
          >
            <AppointmentListCustomersDetail />
          </ComponentListCustomer>
        </Grid>
      </Grid>
    </Box>
  );
}

Appointment.trainerGuard = true;
