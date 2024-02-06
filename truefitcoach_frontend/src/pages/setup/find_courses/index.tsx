import {
  Box,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import useSWR from "swr";
import { fetchData, fetchTypes } from "@/services/api/fetcher";
import {
  GET_COURSES,
  GET_DISTRICT,
  GET_PROVINCE,
  GET_SUBDISTRICT,
  GET_TRAINING_TYPES,
} from "@/services/endpoint/global";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import StarIcon from "@mui/icons-material/Star";
import { marks } from "@/views/components/find_course/props";
import Autocomplete from "@mui/material/Autocomplete";
import { object } from "yup";
import CoursesCard from "@/views/components/trainer_mode/course_management/content/courses_card/CoursesCard";
import { CourseList } from "@/views/components/find_course/CourseList";

interface Purpose {
  [key: string]: boolean;
}

interface FindFormInputs {
  purposes: any;
}

type AddressType = {
  id: string;
  name_en: string;
  name_th: string;
};

type AddressSubdistrictType = {
  id: string;
  name_en: string;
  name_th: string;
  zip_code: string;
};

type SearchType = {
  type: string;
  location: string;
};

export default function FindCourses() {
  const [province, setProvince] = useState<AddressType | null>(null);
  const [district, setDistrict] = useState<AddressType | null>(null);
  const [subdistrict, setSubdistrict] = useState<AddressSubdistrictType | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<SearchType>({
    type: "",
    location: "",
  });
  const [wordFilter, setWordFilter] = useState("");

  const pageSize = 16;

  const { data: trainingType, error } = useSWR(GET_TRAINING_TYPES, fetchTypes);

  const {
    data: courses,
    isLoading: courseLoading,
    error: courseError,
  } = useSWR(
    GET_COURSES +
      `?types=${search.type}&location=${search.location}&page=${page}&pageSize=${pageSize}&search=${wordFilter}`,
    fetchTypes
  );

  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<FindFormInputs>();

  const { data: provinceList, error: provinceError } = useSWR(
    GET_PROVINCE,
    fetchData
  );
  const { data: districtList, error: districtError } = useSWR(
    GET_DISTRICT + `?province_id=${province !== null ? province.id : ""}`,
    fetchData
  );
  const { data: subdistrictList, error: subdistrictError } = useSWR(
    GET_SUBDISTRICT + `?district_id=${district !== null ? district.id : ""}`,
    fetchData
  );

  useEffect(() => {
    const purposes: Purpose[] = [];
    if (trainingType?.purpose) {
      trainingType.purpose.forEach(
        (data: { _id: string; trainingTypeName: string; type: number }) => {
          const keyName = data.type;
          purposes.push({ [keyName]: false });
        }
      );
      setValue("purposes", purposes);
    }
  }, [trainingType, setValue]);

  const onSubmit = (data: any) => {
    const { purposes, rating } = data;
    const purposeFilter = purposes
      .filter((data: Purpose) =>
        Object.values(data).every((value) => value === true)
      )
      .map((data: Purpose) => Object.keys(data)[0]);

    const searching = {
      type: purposeFilter.toString(),
      location: [province?.id, district?.id, subdistrict?.id].toString(),
    };
    setPage(1);
    setSearch(searching);
  };

  const theme = useTheme();
  const BreakPointBetween_xs_sm = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );
  const BreakPointBetween_sm_md = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  const BreakPointBetween_md_lg = useMediaQuery(
    theme.breakpoints.between("md", "lg")
  );
  const BreakPointBetween_lg_xl = useMediaQuery(
    theme.breakpoints.between("lg", "xl")
  );
  const BreakPointUp_sm = useMediaQuery(theme.breakpoints.up("sm"));
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BreakPointDown_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));
  const BreakPointUp_md = useMediaQuery(theme.breakpoints.up("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box sx={{ minHeight: "85vh", bgcolor: "white" }}>
      <Typography
        sx={{
          transition: "1s",
          padding: BreakPointUp_xl ? "1rem 9.5rem" : "1rem 4rem",
          width: "100%",
          bgcolor: "red",
          textAlign: BreakPointDown_md ? "center" : "start",
          fontSize: "30px",
          fontWeight: "700",
          maxWidth: "2440px",
        }}
      >
        All Courses
      </Typography>
      <Box sx={{ bgcolor: "gray" }}>Breadcrump</Box>
      <Box
        sx={{
          width: "100%",
          transition: "1s",
          padding: BreakPointDown_sm
            ? "1rem"
            : BreakPointBetween_sm_md
            ? "1rem 2rem"
            : BreakPointBetween_md_lg
            ? "1rem 3rem"
            : BreakPointUp_xl
            ? "1rem 8.5rem"
            : "1rem 3rem",
          maxWidth: "2440px",
          display: "flex",
          flexDirection: BreakPointDown_md ? "column" : "row",
        }}
      >
        <Box
          sx={{
            paddingRight: "1rem",
            width: BreakPointDown_md
              ? "100%"
              : BreakPointBetween_md_lg
              ? "30%"
              : "30%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Purposes
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    overflow: "auto",
                    height: "220px",
                  }}
                >
                  {trainingType?.purpose.map(
                    (
                      data: {
                        _id: string;
                        trainingTypeName: string;
                        type: number;
                      },
                      index: number
                    ) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            bgcolor: "white",
                            alignItems: "start",
                          }}
                        >
                          <Controller
                            control={control}
                            name={`purposes.${index}.${data.type}`}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <>
                                <Checkbox
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  checked={value || false}
                                  sx={{ m: 0, p: 0 }}
                                />
                                {data.trainingTypeName}
                              </>
                            )}
                          />
                        </Box>
                      );
                    }
                  )}
                </Box>
              </Box>
              {/* <Box>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Rating
                </Typography>
                <Box>
                  <Controller
                    control={control}
                    name={`rating`}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Slider
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || [0, 5]}
                        max={5}
                        min={0}
                        step={1}
                        marks={marks}
                        valueLabelDisplay="auto"
                      />
                    )}
                  />
                </Box>
              </Box> */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Place
                </Typography>
                <Box sx={{ marginBottom: "1rem" }}>
                  <Typography sx={{ fontWeight: "500", color: "gray" }}>
                    Province
                  </Typography>
                  <Autocomplete
                    fullWidth
                    value={province}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) => {
                      setProvince(newValue);
                      if (district !== null) {
                        setDistrict(null);
                        setSubdistrict(null);
                      }
                    }}
                    options={(provinceList && provinceList.Province) || []}
                    getOptionLabel={(option: AddressType) => option.name_en}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                      "& .MuiInputLabel-root": {
                        marginLeft: "30px",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select province" />
                    )}
                  />
                </Box>
                <Box sx={{ marginBottom: "1rem" }}>
                  <Typography sx={{ fontWeight: "500", color: "gray" }}>
                    District
                  </Typography>
                  <Autocomplete
                    fullWidth
                    disabled={province === null}
                    value={district}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) => {
                      setDistrict(newValue);
                      if (subdistrict !== null) {
                        setSubdistrict(null);
                      }
                    }}
                    options={(districtList && districtList.District) || []}
                    getOptionLabel={(option: AddressType) => option.name_en}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                      "& .MuiInputLabel-root": {
                        marginLeft: "30px",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select district" />
                    )}
                  />
                </Box>
                <Box sx={{ marginBottom: "1rem" }}>
                  <Typography sx={{ fontWeight: "500", color: "gray" }}>
                    Subdistrict
                  </Typography>
                  <Autocomplete
                    fullWidth
                    disabled={district === null}
                    value={subdistrict}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(event, newValue) => {
                      setSubdistrict(newValue);
                    }}
                    options={
                      (subdistrictList && subdistrictList.Subdistrict) || []
                    }
                    getOptionLabel={(option: AddressSubdistrictType) =>
                      option.name_en + " " + option.zip_code
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                      "& .MuiInputLabel-root": {
                        marginLeft: "30px",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select subdistrict" />
                    )}
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                type="submit"
                sx={{ display: "flex", margin: "auto" }}
              >
                Filter
              </Button>
            </Box>
          </form>
        </Box>
        <Box
          sx={{
            width: BreakPointDown_md
              ? "100%"
              : BreakPointBetween_md_lg
              ? "70%"
              : "70%",
          }}
        >
          {" "}
          {courseLoading ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <CourseList
              wordFilter={wordFilter}
              setWordFilter={setWordFilter}
              courseList={courses && courses.courses}
              total={courses && courses.total}
              page={page}
              setPage={setPage}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

FindCourses.guestGuard = true;
