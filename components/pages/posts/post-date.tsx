import { Box } from "@/components/core/Box";
import { Flex } from "@/components/core/Flex";
import { Typography } from "@/components/core/Typography";
import { getJalaliDate } from "@/utils/client-utils";
import React, { FC } from "react";

interface Props {
  date: string;
}

export const PostDate: FC<Props> = ({ date }) => {
  const { years, months } = getJalaliDate(date);

  return (
    <Flex
      justifyContent="justify-end"
      alignItems="items-center"
      xSpacing="space-x-1"
      className="text-subText min-w-[60px] grow-0"
    >
      <Typography>{months}</Typography>
      <Box>/</Box>
      <Typography>{years}</Typography>
    </Flex>
  );
};
