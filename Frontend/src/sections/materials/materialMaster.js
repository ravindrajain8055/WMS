import { useMemo, useEffect, useRef, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast } from "react-toastify";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [materials, setMaterials] = useState({});
  const prevMRef = useRef();

  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/v3/b/657099d354105e766fda7f0c")
      .then((response) => {
        console.log("yo", response.data);
        setMaterials(response.data.record);
        //toast.error('Users loading xsuccessful')
      })
      .catch((error) => {
        // console.error('An error occurred:', error);
        console.log("error");
      });
  }, []);

  console.log("Refresh");
  console.log(validationErrors);

  const columns = useMemo(
    () => [
      {
        accessorKey: "sr_no",
        header: "No.",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "material_code",
        header: "Material Code",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.material_code,
          helperText: validationErrors?.material_code,
        },
      },
      {
        accessorKey: "material_description",
        header: "Material Description",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.material_description,
          helperText: validationErrors?.material_description,
        },
      },
      {
        accessorKey: "material_type",
        header: "Material Type",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.material_type,
          helperText: validationErrors?.material_type,
        },
      },
      {
        accessorKey: "per_piece_weight",
        header: "Weight Per Piece(KG)",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.per_piece_weight,
          helperText: validationErrors?.per_piece_weight,
        },
      },
      {
        accessorKey: "max_quantity_on_ground",
        header: "Max Qty on Ground floor",

        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.max_quantity_on_ground,
          helperText: validationErrors?.max_quantity_on_ground,
        },
      },
      {
        accessorKey: "stacked_by",
        header: "Stacked By",
        editVariant: "select",
        editSelectOptions: ["Volume", "Weight"],
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.stacked_by,
          helperText: validationErrors?.stacked_by,
        },
      },
      {
        accessorKey: "packing_mode",
        header: "Packing Mode",
        editVariant: "select",
        editSelectOptions: [
          "Other",
          "ROLL",
          "HEAVY ROLL",
          "DRUM",
          "BAG",
          "SMALL BOX",
          "BIG BOX",
          "IBC TANK",
          "LARGE BUCKET",
          "JERRY CAN",
          "SMALL SIZE BOX",
          "NONE",
          "SMALL BUCKET",
          "WOODEN CASE",
          "JUMBO BAG",
          "MEDIUM  SIZE BOX",
          "undefined",
          "Box",
          "LARGE  SIZE  BAGS",
          "Bucket",
          "MEDIUM SIZE  SIZE BAGS",
          "SMALL SIZE BAGS",
          "UCRETE BOX",
          "ADAPTER MACHINE",
          "NOZZEL",
          "LARGE SIZE BOX",
          "SMALL PAIL",
          "POUCH",
          "HARDNER",
          "JERRICANS",
        ],
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.packing_mode,
          helperText: validationErrors?.packing_mode,
        },
      },
      {
        accessorKey: "available_quantity",
        header: "Available Qty",
        enableEditing: false,
        muiEditTextFieldProps: {
          error: !!validationErrors?.available_quantity,
          helperText: validationErrors?.available_quantity,
        },
      },
      {
        accessorKey: "timestamp",
        header: "Updated",
        enableEditing: false,
        muiEditTextFieldProps: {
          error: !!validationErrors?.timestamp,
          helperText: validationErrors?.timestamp,
        },
      },
      {
        accessorKey: "sbu",
        header: "Sbu",
        muiEditTextFieldProps: {
          error: !!validationErrors?.sbu,
          helperText: validationErrors?.sbu,
        },
      },
    ],
    [validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  //call READ hook
  // const {
  // data: fetchedUsers = [],
  // isError: isLoadingUsersError,
  // isFetching: isFetchingUsers,
  // isLoading: isLoadingUsers,
  // } = useGetUsers();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    console.log("save");
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null);
    toast.success("Material Added, refreshing the page");

    // const config = {
    //     headers:{
    //         'Content-Type':'application/json'
    //     }
    // }

    // const body = JSON.stringify(values);
    // const res = await axios.post('', body, config);

    let arr = materials.push(values);
    setMaterials(arr);
    console.log(materials, "New Material added in the database");
    window.location.reload(true);
    //exit creating mode
  };

  //                                                         UPDATE action after save
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    console.log(prevMRef, values.material_code);
    if (prevMRef.current != values.material_code) {
      setValidationErrors(() => {
        return {
          material_code: "Material Code cannot be edited",
        };
      });
      return;
    }

    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
    toast.success("Editing Material Successful");
  };

  const table = useMaterialReactTable({
    columns,
    data: materials,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    initialState: { density: "compact" },
    getRowId: (row) => row.material_code,
    // muiToolbarAlertBannerProps: isLoadingUsersError
    //   ? {
    //       color: 'error',
    //       children: 'Error loading data',
    //     }
    //   : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    muiTableBodyProps: {
      sx: {
        //stripe the rows, make odd rows a darker color
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Add new Material</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Material</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              prevMRef.current = row.id;
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Add new Material
      </Button>
    ),
    state: {
      //   isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser,
      //   showAlertBanner: isLoadingUsersError,
      //   showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  console.log("createUser");
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    // onMutate: (newUserInfo) => {
    //   queryClient.setQueryData(['users'], (prevUsers) => [
    //     ...prevUsers,
    //     {
    //       ...newUserInfo,
    //       id: prevUsers.length + 1,
    //       Updated : Date.now()
    //     },
    //   ]);
    // },
    //onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    // onMutate: (newUserInfo) => {
    //   queryClient.setQueryData(['users'], (prevUsers) =>
    //     prevUsers?.map((prevUser) =>
    //       prevUser.material_code === newUserInfo.material_code ? newUserInfo : prevUser,
    //     ),
    //   );
    // },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;

const checkStrDigit = (str) => {
  if (/^\d+$/.test(str)) {
    return true;
  } else {
    return null;
  }
};

function validateUser(user) {
  return {
    material_code: !checkStrDigit(user.material_code) ? "Please Add Only Numbers" : "",
    material_description: !validateRequired(user.material_description)
      ? "material_description is Required"
      : "",
    material_type: !validateRequired(user.material_type) ? "material_type is Required" : "",
    per_piece_weight: !checkStrDigit(user.per_piece_weight) ? "Please Add Only Numbers" : "",
    max_quantity_on_ground: !checkStrDigit(user.max_quantity_on_ground)
      ? "Please Add Only Numbers"
      : "",
    stacked_by: !validateRequired(user.material_description) ? "Stacked By is Required" : "",
    packing_mode: !validateRequired(user.material_description)
      ? "Please Select a Valid Packing Mode"
      : "",
    available_quantity: "",
    timestamp: "",
  };
}
