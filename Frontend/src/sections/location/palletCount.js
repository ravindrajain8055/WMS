import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import Image from "next/image";

const Palletcount = () => {
  let value = "108";

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        ml: 2,
        mr: 2,
        border: 1,
        borderRadius: "16px",
      }}
    >
      <div>
        <Stack alignItems="flex-start" direction="row" spacing={5}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="h3" sx={{ pt: 1, pb: 0, mb: 0 }}>
              Realtime Pallet Count
            </Typography>
            <hr sx={{ mt: 0, pt: 0 }} />
            <Typography
              sx={{
                fontSize: "62px",
                display: "flex",
                justifyContent: "center",
                height: "10px",
                m: 0,
              }}
            >
              {value}
            </Typography>
          </Stack>
          <Image src="/assets/Pallet.jpg" width={165} height={165} alt="Picture of the author" />
        </Stack>
      </div>
    </Card>
  );
};

export default Palletcount;
