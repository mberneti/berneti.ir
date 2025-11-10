import { Box } from "@/components/core/Box";

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="text-md relative border border-indigo-300 bg-indigo-50">
      <Box className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-indigo-300 text-white">
        ii
      </Box>
      {children}
    </blockquote>
  );
}
